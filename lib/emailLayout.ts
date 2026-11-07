/**
 * Branded layout for Stratum PR transactional emails (navy header with the white logo, white card,
 * yellow accent, optional button, simple footer). Email-safe: table layout, inline styles, no web
 * fonts or background images (Outlook and Gmail strip them), images hosted on www.stratumpr.com.
 */

const SITE = 'https://www.stratumpr.com';
const NAVY = '#1E2B7E';
const YELLOW = '#E6E09E';
const INK = '#0B1215';
const MUTED = '#525252';
const PAGE_BG = '#F3F4F8';
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

export interface BrandedEmail {
  lang: 'es' | 'en';
  /** Hidden inbox preview line */
  preheader: string;
  /** Small yellow label above the heading */
  eyebrow?: string;
  heading: string;
  /** Inner HTML for the body; caller escapes any user input */
  bodyHtml: string;
  cta?: { label: string; href: string };
}

export function renderBrandedEmail({ lang, preheader, eyebrow, heading, bodyHtml, cta }: BrandedEmail): string {
  const isEs = lang === 'es';
  const footer = isEs
    ? 'Stratum PR LLC · Trujillo Alto, Puerto Rico'
    : 'Stratum PR LLC · Trujillo Alto, Puerto Rico';
  const ctaHtml = cta
    ? `<tr><td style="padding:8px 40px 8px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="border-radius:14px;background:${NAVY};">
            <a href="${cta.href}" style="display:inline-block;padding:14px 26px;font-family:${FONT};font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:14px;">${cta.label}</a>
          </td>
        </tr></table>
      </td></tr>`
    : '';
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light only">
<title>${heading}</title>
</head>
<body style="margin:0;padding:0;background:${PAGE_BG};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PAGE_BG};">
<tr><td align="center" style="padding:32px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;">
    <tr><td style="background:${NAVY};padding:28px 40px;">
      <a href="${SITE}" style="text-decoration:none;"><img src="${SITE}/img/stratum-logo-white.png" width="150" height="28" alt="Stratum PR" style="display:block;border:0;height:28px;width:auto;"></a>
    </td></tr>
    <tr><td style="height:6px;line-height:6px;font-size:0;background:${YELLOW};">&nbsp;</td></tr>
    <tr><td style="padding:36px 40px 8px;font-family:${FONT};">
      ${eyebrow ? `<p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:${NAVY};">${eyebrow}</p>` : ''}
      <h1 style="margin:0 0 18px;font-size:26px;line-height:1.2;font-weight:800;color:${NAVY};">${heading}</h1>
      <div style="font-size:16px;line-height:1.6;color:${INK};">${bodyHtml}</div>
    </td></tr>
    ${ctaHtml}
    <tr><td style="padding:24px 40px 32px;font-family:${FONT};">
      <p style="margin:0;font-size:15px;line-height:1.5;color:${INK};">— ${isEs ? 'El equipo de' : 'The'} Stratum PR${isEs ? '' : ' team'}</p>
    </td></tr>
    <tr><td style="padding:18px 40px;background:#FAFAF8;border-top:1px solid #ECEDF2;font-family:${FONT};font-size:12px;line-height:1.6;color:${MUTED};">
      ${footer}<br>
      <a href="${SITE}" style="color:${NAVY};text-decoration:none;font-weight:700;">stratumpr.com</a> · <a href="mailto:contact@stratumpr.com" style="color:${NAVY};text-decoration:none;">contact@stratumpr.com</a>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}
