/**
 * Downloadable versions of the free record templates (src/content/templates.ts): one PDF and one
 * Excel file per template and language, written to dist/descargas (es) and dist/downloads (en) at
 * the paths templateDownloadPath() gives. Generated at build time so they never drift from the
 * page copy; nothing here adds text that is not already in templates.ts or on the template page.
 *
 * PDF (pdfkit): US Letter in the template's orientation. Page 1 is the form (logo, title, fill-in
 * fields, ruled table, sign-off lines, footer with the legal basis); if the rows do not fit, the
 * table continues on the next page with the header repeated. The last page holds the how-to,
 * the rule notes and the sources.
 * XLSX (exceljs): the form sheet (frozen header row, print setup: fit to one page wide, header row
 * repeated) and an "Instrucciones" / "Instructions" sheet.
 *
 * Run with: npx tsx scripts/generate-template-files.ts (part of `npm run build`, after prerender).
 */
import * as fs from 'fs';
import * as path from 'path';
import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';
import {
  TEMPLATES,
  TEMPLATES_INDEX_PATH,
  TEMPLATES_VERIFIED_ON,
  templateDownloadPath,
  templatePath,
  type Template,
  type TemplateLang,
} from '../src/content/templates';

const DIST = path.join(process.cwd(), 'dist');
const SITE = 'https://www.stratumpr.com';
const LOGO_SVG = path.join(process.cwd(), 'public', 'img', 'stratum-logo-color.svg');

/** Same labels as the on-page form (src/pages/Plantilla.tsx) */
const COPY = {
  es: {
    company: 'Empresa / planta',
    location: 'Ubicación (dirección)',
    product: 'Producto / área / línea',
    period: 'Período (desde / hasta)',
    sheet: 'Hoja ____ de ____',
    howTo: 'Cómo usar esta plantilla',
    legal: 'Qué dice la regla',
    sources: 'Fuentes oficiales',
    verifiedOn: 'Fuentes verificadas el',
    source: 'Fuente',
    verified: 'Verificado',
    page: (n: number, total: number) => `Página ${n} de ${total}`,
    continued: '(continuación)',
    disclaimer: 'Plantilla gratis de stratumpr.com. Ajústala a tu plan de inocuidad; no lo sustituye.',
    instructionsSheet: 'Instrucciones',
    online: 'Versión en línea',
  },
  en: {
    company: 'Company / facility',
    location: 'Location (address)',
    product: 'Product / area / line',
    period: 'Period (from / to)',
    sheet: 'Sheet ____ of ____',
    howTo: 'How to use this template',
    legal: 'What the rule says',
    sources: 'Official sources',
    verifiedOn: 'Sources verified on',
    source: 'Source',
    verified: 'Verified',
    page: (n: number, total: number) => `Page ${n} of ${total}`,
    continued: '(continued)',
    disclaimer: 'Free template from stratumpr.com. Adapt it to your food safety plan; it does not replace it.',
    instructionsSheet: 'Instructions',
    online: 'Online version',
  },
} as const;

const NAVY = '#1e2b7e';
const INK = '#0b1215';
const MUTED = '#5b6273';
const GRID = '#a9aec0';
const TINT = '#e8eaf5';
const ZEBRA = '#f7f8fc';

/** "21 CFR 117.135, 117.145, ..." from the template's CFR sources */
function legalBasis(t: Template): string {
  const cfr = t.sources.map((s) => s.label.split(' (')[0]).filter((l) => l.startsWith('21 CFR '));
  return cfr.length ? `21 CFR ${cfr.map((l) => l.slice('21 CFR '.length)).join(', ')}` : t.sources[0].label;
}

function footerText(t: Template, lang: TemplateLang): string {
  const c = COPY[lang];
  return `${c.source}: ${legalBasis(t)} · ${c.verified} ${TEMPLATES_VERIFIED_ON[lang]} · stratumpr.com${TEMPLATES_INDEX_PATH[lang]}`;
}

// ---------------------------------------------------------------------------------------------
// Logo: the vector paths of public/img/stratum-logo-color.svg, drawn with pdfkit
// ---------------------------------------------------------------------------------------------

type LogoPath = { d: string; cls: string };
const LOGO_VIEWBOX = { w: 958.32, h: 179.93 };

function readLogo(): LogoPath[] {
  const svg = fs.readFileSync(LOGO_SVG, 'utf8');
  const paths = [...svg.matchAll(/<path(?: class="([^"]*)")? d="([^"]+)"\s*\/>/g)].map((m) => ({ cls: m[1] ?? '', d: m[2] }));
  if (paths.length < 8) throw new Error(`generate-template-files: unexpected logo SVG (${paths.length} paths)`);
  return paths;
}

function drawLogo(doc: PDFKit.PDFDocument, logo: LogoPath[], x: number, y: number, height: number): number {
  const s = height / LOGO_VIEWBOX.h;
  doc.save();
  doc.translate(x, y).scale(s);
  for (const p of logo) {
    doc.save();
    if (p.cls === 'cls-1') doc.fillColor(NAVY);
    else if (p.cls === 'cls-3' || p.cls === 'cls-4') {
      // .cls-2 group: opacity 0.8; gradients #linear-gradient / -2 (same stops, near-identical axis)
      const g = p.cls === 'cls-3' ? doc.linearGradient(59.69, 96.86, 254.31, 82.9) : doc.linearGradient(59.56, 94.98, 254.18, 81.02);
      g.stop(0, '#49b8c7').stop(1, '#266ab2');
      doc.fillColor(g as unknown as string).fillOpacity(0.8);
    } else if (p.cls === 'cls-5') {
      const g = doc.linearGradient(0, 89.97, 101.05, 89.97);
      g.stop(0, '#f0feb3').stop(1, '#e6e09e');
      doc.fillColor(g as unknown as string);
    } else doc.fillColor('#000000');
    doc.path(p.d).fill();
    doc.restore();
  }
  doc.restore();
  return (LOGO_VIEWBOX.w * height) / LOGO_VIEWBOX.h;
}

// ---------------------------------------------------------------------------------------------
// PDF
// ---------------------------------------------------------------------------------------------

const M = 36; // page margin (0.5 in)
const F = 'Helvetica';
const FB = 'Helvetica-Bold';

function columnWidths(t: Template, lang: TemplateLang, tableW: number, numW: number): number[] {
  const cols = t[lang].columns;
  const hasPrefilled = (t[lang].prefilledRows ?? []).length > 0;
  const weights = cols.map((c, i) => (i === 0 && hasPrefilled ? 80 : Math.min(42, Math.max(15, c.length))));
  const total = weights.reduce((a, b) => a + b, 0);
  return weights.map((w) => ((tableW - numW) * w) / total);
}

function buildPdf(t: Template, lang: TemplateLang, logo: LogoPath[], outFile: string): Promise<void> {
  const c = COPY[lang];
  const copy = t[lang];
  const pageUrl = SITE + templatePath(t, lang);
  const landscape = t.orientation === 'landscape';
  const W = landscape ? 792 : 612;
  const H = landscape ? 612 : 792;
  const tableW = W - 2 * M;

  const doc = new PDFDocument({
    size: 'LETTER',
    layout: t.orientation,
    margin: 0,
    autoFirstPage: false,
    bufferPages: true,
    lang: lang === 'es' ? 'es-PR' : 'en-US',
    displayTitle: true,
    info: {
      Title: copy.title,
      Author: 'Stratum PR',
      Subject: copy.description,
      Creator: 'stratumpr.com',
      CreationDate: new Date('2026-11-11T12:00:00Z'),
    },
  });
  const done = new Promise<void>((resolve, reject) => {
    const out = fs.createWriteStream(outFile);
    out.on('finish', resolve);
    out.on('error', reject);
    doc.pipe(out);
  });

  /** Brand stripe, logo, title, sheet counter. Returns the y below the header. */
  const pageHeader = (continued: boolean, form = true): number => {
    doc.rect(0, 0, W, 6).fill(NAVY);
    drawLogo(doc, logo, M, 22, 20);
    if (form) doc.font(F).fontSize(8.5).fillColor(MUTED).text(c.sheet, M, 29, { width: tableW, align: 'right', lineBreak: false });
    const title = continued ? `${copy.title} ${c.continued}` : copy.title;
    doc.font(FB).fontSize(15).fillColor(NAVY);
    doc.text(title, M, 54, { width: tableW, lineBreak: false, ellipsis: true });
    doc.moveTo(M, 76).lineTo(W - M, 76).lineWidth(1).strokeColor(NAVY).stroke();
    return 76;
  };

  const footerY = H - 26;
  const footer = (n: number, total: number) => {
    doc.moveTo(M, footerY - 6).lineTo(W - M, footerY - 6).lineWidth(0.5).strokeColor(GRID).stroke();
    doc.font(F).fontSize(7).fillColor(MUTED);
    doc.text(footerText(t, lang), M, footerY, { width: tableW - 70, lineBreak: false, link: pageUrl });
    doc.text(c.page(n, total), W - M - 70, footerY, { width: 70, align: 'right', lineBreak: false });
  };

  // ---- form page(s)
  doc.addPage();
  let y = pageHeader(false);

  // Fill-in fields: small caps label over a writing line, four across
  const fields = [c.company, c.location, c.product, c.period];
  const gap = 16;
  const fw = (tableW - gap * (fields.length - 1)) / fields.length;
  fields.forEach((label, i) => {
    const fx = M + i * (fw + gap);
    doc.font(FB).fontSize(6.5).fillColor(MUTED).text(label.toUpperCase(), fx, y + 10, { width: fw, characterSpacing: 0.3, lineBreak: false });
    doc.moveTo(fx, y + 36).lineTo(fx + fw, y + 36).lineWidth(0.6).strokeColor('#6b7186').stroke();
  });
  y += 48;

  // Table geometry
  const numW = 20;
  const widths = columnWidths(t, lang, tableW, numW);
  const xs: number[] = [M + numW];
  widths.forEach((w, i) => xs.push(xs[i] + w));
  const padX = 4;

  doc.font(FB).fontSize(7.5);
  const headerTextH = Math.max(...copy.columns.map((col, i) => doc.heightOfString(col, { width: widths[i] - 2 * padX, lineGap: 1 })));
  const headerH = headerTextH + 10;

  const prefilled = copy.prefilledRows ?? [];
  const rowCount = Math.max(t.rowsToPrint, prefilled.length);
  doc.font(F).fontSize(7.5);
  const prefilledH = prefilled.map((txt) => doc.heightOfString(txt, { width: widths[0] - 2 * padX, lineGap: 1 }) + 10);

  doc.font(F).fontSize(8.5);
  const signoffH = 50;
  const tableBottom = footerY - 10 - signoffH; // sign-off block sits under the table on the last form page
  const blankRows = rowCount - prefilled.length;
  const fixedH = prefilledH.reduce((a, b) => a + Math.max(b, 26), 0);
  // Generous rows for handwriting: 0.36 in or more when space allows, never under 22 pt
  const avail = tableBottom - y - headerH - fixedH;
  const baseH = Math.max(22, Math.min(38, blankRows > 0 ? avail / blankRows : 38));
  const rowHeights = Array.from({ length: rowCount }, (_, i) => (i < prefilled.length ? Math.max(prefilledH[i], baseH) : baseH));

  const drawHeaderRow = (top: number) => {
    doc.rect(M, top, tableW, headerH).fill(TINT);
    doc.font(FB).fontSize(7.5).fillColor(NAVY);
    doc.text('#', M, top + headerH / 2 - 4, { width: numW, align: 'center', lineBreak: false });
    copy.columns.forEach((col, i) => {
      const h = doc.heightOfString(col, { width: widths[i] - 2 * padX, lineGap: 1 });
      doc.text(col, xs[i] + padX, top + (headerH - h) / 2 + 0.5, { width: widths[i] - 2 * padX, lineGap: 1 });
    });
  };

  const drawGrid = (top: number, bottom: number, rowLines: number[]) => {
    doc.lineWidth(0.5).strokeColor(GRID);
    for (const ry of rowLines) doc.moveTo(M, ry).lineTo(M + tableW, ry).stroke();
    for (const vx of xs.slice(0, -1)) doc.moveTo(vx, top).lineTo(vx, bottom).stroke();
    doc.moveTo(M, top + headerH).lineTo(M + tableW, top + headerH).lineWidth(1).strokeColor(NAVY).stroke();
    doc.rect(M, top, tableW, bottom - top).lineWidth(0.8).strokeColor(NAVY).stroke();
  };

  let r = 0;
  while (r < rowCount) {
    const top = y;
    drawHeaderRow(top);
    let ry = top + headerH;
    const lines: number[] = [];
    let k = 0;
    while (r < rowCount && ry + rowHeights[r] <= tableBottom + 0.01) {
      const h = rowHeights[r];
      if (k % 2 === 1) doc.rect(M, ry, tableW, h).fill(ZEBRA);
      doc.font(F).fontSize(7).fillColor(MUTED).text(String(r + 1), M, ry + h / 2 - 3.5, { width: numW, align: 'center', lineBreak: false });
      if (r < prefilled.length) {
        const th = prefilledH[r] - 10;
        doc.font(F).fontSize(7.5).fillColor(INK).text(prefilled[r], xs[0] + padX, ry + (h - th) / 2 + 0.5, { width: widths[0] - 2 * padX, lineGap: 1 });
      }
      ry += h;
      if (r < rowCount - 1) lines.push(ry);
      r++;
      k++;
    }
    drawGrid(top, ry, lines.filter((l) => l < ry - 0.01));
    y = ry;
    if (r < rowCount) {
      doc.addPage();
      y = pageHeader(true) + 12;
    }
  }

  // Sign-off lines under the table: a writing line with its label underneath
  const sy = y + 10;
  const sgap = 36;
  const sw = (tableW - sgap * (copy.signoff.length - 1)) / copy.signoff.length;
  copy.signoff.forEach((label, i) => {
    const sx = M + i * (sw + sgap);
    doc.moveTo(sx, sy + 24).lineTo(sx + sw, sy + 24).lineWidth(0.6).strokeColor('#6b7186').stroke();
    doc.font(FB).fontSize(7.5).fillColor(INK).text(label, sx, sy + 28, { width: sw, lineBreak: false, ellipsis: true });
  });

  // ---- instructions page
  doc.addPage();
  y = pageHeader(false, false) + 16;
  const colGap = 28;
  const leftW = landscape ? 270 : tableW;
  const rightW = landscape ? tableW - leftW - colGap : tableW;
  const rightX = landscape ? M + leftW + colGap : M;
  const bottomLimit = footerY - 14;

  const heading = (text: string, x: number, yy: number, w: number): number => {
    doc.font(FB).fontSize(10.5).fillColor(NAVY).text(text, x, yy, { width: w });
    return doc.y + 5;
  };

  /** Lays out a list; returns height used. measureOnly to size without drawing. */
  const list = (items: string[], x: number, yy: number, w: number, size: number, numbered: boolean, draw: boolean): number => {
    const indent = numbered ? 14 : 10;
    let cy = yy;
    doc.font(F).fontSize(size).fillColor(INK);
    items.forEach((item, i) => {
      const h = doc.heightOfString(item, { width: w - indent, lineGap: 1.5 });
      if (draw) {
        doc.font(numbered ? FB : F).fillColor(numbered ? NAVY : MUTED).text(numbered ? `${i + 1}.` : '•', x, cy, { width: indent, lineBreak: false });
        doc.font(F).fillColor(INK).text(item, x + indent, cy, { width: w - indent, lineGap: 1.5 });
      }
      cy += h + size * 0.55;
    });
    return cy - yy;
  };

  // Fit both columns on one page: shrink the type a little if the notes are long
  let size = 9;
  const leftExtra = 120; // sources + verified + disclaimer under the how-to (landscape)
  while (size > 7) {
    const leftH = list(copy.howTo, M, 0, leftW, size, true, false) + leftExtra + 20;
    const rightH = list(copy.notes, rightX, 0, rightW, size, false, false) + 20;
    const need = landscape ? Math.max(leftH, rightH) : leftH + rightH + 40;
    if (y + need <= bottomLimit) break;
    size -= 0.25;
  }

  let ly = heading(c.howTo, M, y, leftW);
  ly += list(copy.howTo, M, ly, leftW, size, true, true) + 8;
  let ry2 = landscape ? y : ly + 6;
  ry2 = heading(c.legal, rightX, ry2, rightW);
  ry2 += list(copy.notes, rightX, ry2, rightW, size, false, true);

  let sy2 = landscape ? ly : ry2 + 8;
  sy2 = heading(c.sources, M, sy2, leftW);
  for (const s of t.sources) {
    doc.font(F).fontSize(Math.min(size, 8)).fillColor('#266ab2').text(s.label, M, sy2, { width: leftW, link: s.url, underline: false });
    sy2 = doc.y + 2;
  }
  doc.font(F).fontSize(7.5).fillColor(MUTED);
  doc.text(`${c.verifiedOn} ${TEMPLATES_VERIFIED_ON[lang]}.`, M, sy2 + 6, { width: leftW });
  doc.text(`${c.online}: ${pageUrl.replace('https://www.', '')}`, M, doc.y + 3, { width: leftW, link: pageUrl });
  doc.text(c.disclaimer, M, doc.y + 3, { width: leftW });

  // Footers, now that the page count is known
  const range = doc.bufferedPageRange();
  const total = range.count;
  for (let i = 0; i < total; i++) {
    doc.switchToPage(range.start + i);
    footer(i + 1, total);
  }
  doc.end();
  return done;
}

// ---------------------------------------------------------------------------------------------
// XLSX
// ---------------------------------------------------------------------------------------------

// Excel paper size code 1 = US Letter (the typings declare PaperSize as an ambient enum)
const LETTER = 1 as unknown as ExcelJS.PaperSize;
const X_NAVY = 'FF1E2B7E';
const X_GRID = 'FFA9AEC0';
const X_MUTED = 'FF5B6273';

function colLetter(n: number): string {
  let s = '';
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

function estLines(text: string, widthChars: number): number {
  return text.split('\n').reduce((a, line) => a + Math.max(1, Math.ceil(line.length / Math.max(1, widthChars - 1))), 0);
}

async function buildXlsx(t: Template, lang: TemplateLang, outFile: string): Promise<void> {
  const c = COPY[lang];
  const copy = t[lang];
  const pageUrl = SITE + templatePath(t, lang);
  if (copy.sheetName.length > 31 || /[:\\/?*[\]]/.test(copy.sheetName)) throw new Error(`bad sheet name: ${copy.sheetName}`);

  const wb = new ExcelJS.Workbook();
  wb.creator = 'Stratum PR';
  wb.title = copy.title;
  wb.subject = copy.description;
  wb.created = new Date('2026-11-11T12:00:00Z');
  wb.modified = wb.created;

  const nCols = copy.columns.length + 1; // + "#"
  const last = colLetter(nCols);
  const HEADER_ROW = 8;
  const thin = { style: 'thin' as const, color: { argb: X_GRID } };
  const box = { top: thin, left: thin, bottom: thin, right: thin };

  const ws = wb.addWorksheet(copy.sheetName, {
    views: [{ state: 'frozen', ySplit: HEADER_ROW, xSplit: 0, topLeftCell: `A${HEADER_ROW + 1}`, showGridLines: false }],
    pageSetup: {
      paperSize: LETTER,
      orientation: t.orientation,
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      horizontalCentered: true,
      margins: { left: 0.4, right: 0.4, top: 0.5, bottom: 0.6, header: 0.2, footer: 0.25 },
      printTitlesRow: `${HEADER_ROW}:${HEADER_ROW}`,
    },
    headerFooter: {
      oddFooter: `&L&8${footerText(t, lang)}&R&8${lang === 'es' ? 'Página &P de &N' : 'Page &P of &N'}`,
    },
  });

  // Column widths (characters), sized by header length like the PDF
  const hasPrefilled = (copy.prefilledRows ?? []).length > 0;
  const widths = [5, ...copy.columns.map((col, i) => (i === 0 && hasPrefilled ? 44 : Math.min(30, Math.max(11, Math.round(col.length * 0.62 + 6)))))];
  widths.forEach((w, i) => (ws.getColumn(i + 1).width = w));

  // Title
  ws.mergeCells(`A1:${last}1`);
  const title = ws.getCell('A1');
  title.value = copy.title;
  title.font = { name: 'Calibri', size: 16, bold: true, color: { argb: X_NAVY } };
  title.alignment = { vertical: 'middle' };
  ws.getRow(1).height = 28;
  ws.mergeCells(`A2:${last}2`);
  const sub = ws.getCell('A2');
  sub.value = { text: `stratumpr.com${templatePath(t, lang)}`, hyperlink: pageUrl };
  sub.font = { size: 9, color: { argb: X_MUTED } };
  ws.getRow(2).height = 16;

  // Fill-in fields: label in A:C, writing area D:last with a bottom line
  const labelEnd = colLetter(Math.min(3, nCols - 1));
  const valueStart = colLetter(Math.min(4, nCols));
  [c.company, c.location, c.product, c.period].forEach((label, i) => {
    const r = 3 + i;
    ws.mergeCells(`A${r}:${labelEnd}${r}`);
    ws.mergeCells(`${valueStart}${r}:${last}${r}`);
    const lc = ws.getCell(`A${r}`);
    lc.value = `${label}:`;
    lc.font = { bold: true, size: 10 };
    lc.alignment = { vertical: 'bottom' };
    const vc = ws.getCell(`${valueStart}${r}`);
    vc.border = { bottom: { style: 'thin', color: { argb: 'FF6B7186' } } };
    vc.alignment = { vertical: 'bottom' };
    ws.getRow(r).height = 22;
  });
  ws.getRow(7).height = 8;

  // Header row: navy fill, white bold text, wrapped
  const header = ws.getRow(HEADER_ROW);
  header.values = ['#', ...copy.columns];
  const headerLines = Math.max(...header.values.slice(1).map((v, i) => estLines(String(v ?? ''), widths[i] * 1.1)));
  header.height = Math.max(30, headerLines * 13 + 8);
  header.eachCell((cell) => {
    cell.font = { bold: true, size: 10, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: X_NAVY } };
    cell.alignment = { wrapText: true, vertical: 'middle', horizontal: 'left' };
    cell.border = { top: { style: 'thin', color: { argb: X_NAVY } }, bottom: { style: 'thin', color: { argb: X_NAVY } }, left: { style: 'thin', color: { argb: 'FF4A5598' } }, right: { style: 'thin', color: { argb: 'FF4A5598' } } };
  });
  header.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };

  // Rows: prefilled first column where given, then blank rows
  const prefilled = copy.prefilledRows ?? [];
  const rowCount = Math.max(t.rowsToPrint, prefilled.length);
  for (let i = 0; i < rowCount; i++) {
    const r = ws.getRow(HEADER_ROW + 1 + i);
    const first = prefilled[i] ?? '';
    r.values = [i + 1, first];
    r.height = first ? Math.max(26, estLines(first, widths[1] * 1.1) * 13 + 8) : 26;
    for (let col = 1; col <= nCols; col++) {
      const cell = r.getCell(col);
      cell.border = box;
      cell.alignment = { wrapText: true, vertical: col === 1 ? 'middle' : 'top', horizontal: col === 1 ? 'center' : 'left' };
      cell.font = col === 1 ? { size: 9, color: { argb: X_MUTED } } : { size: 10 };
    }
  }
  let row = HEADER_ROW + rowCount + 2;

  // Sign-off rows
  for (const label of copy.signoff) {
    ws.mergeCells(`A${row}:${labelEnd}${row}`);
    ws.mergeCells(`${valueStart}${row}:${last}${row}`);
    const lc = ws.getCell(`A${row}`);
    lc.value = `${label}:`;
    lc.font = { bold: true, size: 10 };
    lc.alignment = { vertical: 'bottom', wrapText: true };
    ws.getCell(`${valueStart}${row}`).border = { bottom: { style: 'thin', color: { argb: 'FF6B7186' } } };
    const labelW = widths.slice(0, 3).reduce((a, b) => a + b, 0);
    ws.getRow(row).height = Math.max(24, estLines(`${label}:`, labelW) * 14 + 6);
    row++;
  }
  row++;
  // The legal basis prints in the page footer; the disclaimer sits under the form
  ws.mergeCells(`A${row}:${last}${row}`);
  const disclaimer = ws.getCell(`A${row}`);
  disclaimer.value = c.disclaimer;
  disclaimer.font = { size: 8, italic: true, color: { argb: X_MUTED } };
  row++;
  ws.pageSetup.printArea = `A1:${last}${row - 1}`;

  // Instructions sheet
  const wi = wb.addWorksheet(c.instructionsSheet, {
    views: [{ showGridLines: false }],
    pageSetup: { paperSize: LETTER, orientation: 'portrait', fitToPage: true, fitToWidth: 1, fitToHeight: 0, margins: { left: 0.6, right: 0.6, top: 0.6, bottom: 0.6, header: 0.3, footer: 0.3 } },
  });
  wi.getColumn(1).width = 4;
  wi.getColumn(2).width = 86;
  let ir = 1;
  const put = (text: string | ExcelJS.CellValue, opts: { bullet?: string; font?: Partial<ExcelJS.Font>; height?: number } = {}) => {
    const r = wi.getRow(ir++);
    if (opts.bullet) {
      r.getCell(1).value = opts.bullet;
      r.getCell(1).alignment = { vertical: 'top', horizontal: 'right' };
      r.getCell(1).font = { bold: true, color: { argb: X_NAVY } };
    }
    const cell = r.getCell(2);
    cell.value = text as ExcelJS.CellValue;
    cell.alignment = { wrapText: true, vertical: 'top' };
    if (opts.font) cell.font = opts.font;
    const plain = typeof text === 'string' ? text : '';
    r.height = opts.height ?? Math.max(16, estLines(plain, 96) * 13.5 + 4);
  };
  put(copy.title, { font: { size: 14, bold: true, color: { argb: X_NAVY } }, height: 24 });
  put(copy.lead, { font: { size: 10 } });
  ir++;
  put(c.howTo, { font: { size: 12, bold: true, color: { argb: X_NAVY } }, height: 20 });
  copy.howTo.forEach((s, i) => put(s, { bullet: `${i + 1}.`, font: { size: 10 } }));
  ir++;
  put(c.legal, { font: { size: 12, bold: true, color: { argb: X_NAVY } }, height: 20 });
  copy.notes.forEach((n) => put(n, { bullet: '•', font: { size: 10 } }));
  ir++;
  put(c.sources, { font: { size: 12, bold: true, color: { argb: X_NAVY } }, height: 20 });
  t.sources.forEach((s) => put({ text: s.label, hyperlink: s.url }, { font: { size: 10, underline: true, color: { argb: 'FF266AB2' } }, height: 16 }));
  ir++;
  put(`${c.verifiedOn} ${TEMPLATES_VERIFIED_ON[lang]}.`, { font: { size: 9, color: { argb: X_MUTED } } });
  put({ text: `${c.online}: stratumpr.com${templatePath(t, lang)}`, hyperlink: pageUrl }, { font: { size: 9, underline: true, color: { argb: 'FF266AB2' } } });
  put(c.disclaimer, { font: { size: 9, italic: true, color: { argb: X_MUTED } } });

  await wb.xlsx.writeFile(outFile);
}

// ---------------------------------------------------------------------------------------------

async function main(): Promise<void> {
  if (!fs.existsSync(DIST)) throw new Error('generate-template-files: dist/ not found; run vite build first');
  const logo = readLogo();
  const written: string[] = [];
  for (const t of TEMPLATES) {
    for (const lang of ['es', 'en'] as const) {
      for (const type of ['pdf', 'xlsx'] as const) {
        const rel = templateDownloadPath(t, lang, type);
        const file = path.join(DIST, rel.replace(/^\//, ''));
        fs.mkdirSync(path.dirname(file), { recursive: true });
        if (type === 'pdf') await buildPdf(t, lang, logo, file);
        else await buildXlsx(t, lang, file);
        const size = fs.statSync(file).size;
        if (size < 2000) throw new Error(`generate-template-files: ${rel} is suspiciously small (${size} bytes)`);
        written.push(`${rel} (${Math.round(size / 1024)} KB)`);
      }
    }
  }
  console.log(`Generated ${written.length} template files:\n  ${written.join('\n  ')}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
