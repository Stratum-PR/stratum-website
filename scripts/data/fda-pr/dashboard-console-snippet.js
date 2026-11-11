// FDA Data Dashboard (inspections + citations) aggregates for Puerto Rico food firms.
//
// The Data Dashboard's REST API needs registered credentials (Authorization-User/Key), so we do
// NOT use it. Instead, open the public page
//   https://datadashboard.fda.gov/oii/cd/inspections.htm
// wait until the charts load, open the browser console, paste this whole file and press Enter.
// It queries the page's own public Qlik app (the same data the page's "Export data" uses) and
// prints JSON to paste into inspections-pr-food-by-fy.csv / citations-pr-food-top.csv and
// src/content/fda-inspections-pr.ts. No firm names or FEI numbers are read.
//
// Method (keep in sync with the page text):
//  - Inspections: [Inspection State Code] = PR and [Product Type] = Food/Cosmetics. The source has
//    one row per inspected Project Area; rows for the "Colors and Cosmetics Technology" project
//    area are dropped, and inspections left with no food project area are excluded.
//  - Each inspection is counted once, under its FDA fiscal year ([Fiscal Year], Oct 1 – Sep 30),
//    with its most serious food classification (OAI > VAI > NAI).
//  - Citations: [Program Area] = Foods and state PR. A section counts once per inspection that
//    cited it (several citation codes can share one CFR section). Only citations of food
//    inspections above, in the chosen fiscal-year window, are counted.
(async () => {
  const FY_FROM = 2022;
  const FY_TO = 2026;
  const app = obj.appMain;
  async function cube(dims, measure) {
    const w = dims.length + 1;
    const h = Math.floor(10000 / w);
    const model = await app.createCube({
      qDimensions: dims.map((d) => ({ qDef: { qFieldDefs: [d] }, qNullSuppression: false })),
      qMeasures: [{ qDef: { qDef: measure } }],
      qSuppressZero: true,
      qInitialDataFetch: [{ qTop: 0, qLeft: 0, qWidth: w, qHeight: 1 }],
    });
    const layout = await model.getLayout();
    const total = layout.qHyperCube.qSize.qcy;
    const rows = [];
    for (let t = 0; t < total; t += h) {
      const p = await model.getHyperCubeData('/qHyperCubeDef', [{ qTop: t, qLeft: 0, qWidth: w, qHeight: Math.min(h, total - t) }]);
      rows.push(...p[0].qMatrix.map((r) => r.map((c) => c.qText)));
    }
    app.destroySessionObject(layout.qInfo.qId);
    return rows;
  }
  const insp = await cube(
    ['Inspection ID', 'Fiscal Year', 'Classification', 'Project Area'],
    "Count({<[Inspection State Code]={'PR'},[Product Type]={'Food/Cosmetics'}>} DISTINCT [Inspection ID])",
  );
  const cit = await cube(
    ['Citation Id', 'Inspection ID Citations', 'Act/CFR Number', 'Short Description'],
    "Count({<[Inspection State Code]={'PR'},[Program Area]={'Foods'}>} [Citation Id])",
  );
  const rank = { NAI: 0, VAI: 1, OAI: 2 };
  const names = ['NAI', 'VAI', 'OAI'];
  const byInsp = {};
  for (const [id, fy, cls, pa] of insp) {
    if (pa === 'Colors and Cosmetics Technology') continue;
    const c = (cls.match(/\((\w+)\)/) || [])[1];
    const o = (byInsp[id] ??= { fy: Number(fy), worst: -1 });
    o.worst = Math.max(o.worst, rank[c] ?? -1);
  }
  const byFy = {};
  for (const o of Object.values(byInsp)) {
    const f = (byFy[o.fy] ??= { NAI: 0, VAI: 0, OAI: 0, total: 0 });
    if (o.worst >= 0) f[names[o.worst]]++;
    f.total++;
  }
  const sets = {};
  const desc = {};
  const withCit = new Set();
  for (const [, id, cfr, d] of cit) {
    const o = byInsp[id];
    if (!o || o.fy < FY_FROM || o.fy > FY_TO) continue;
    (sets[cfr] ??= new Set()).add(id);
    (desc[cfr] ??= new Set()).add(d);
    withCit.add(id);
  }
  const top = Object.entries(sets)
    .map(([cfr, s]) => ({ cfr, inspections: s.size, fdaShortDescriptions: [...desc[cfr]] }))
    .sort((a, b) => b.inspections - a.inspections)
    .slice(0, 15);
  const foodInspections = Object.values(byInsp).filter((o) => o.fy >= FY_FROM && o.fy <= FY_TO).length;
  console.log(JSON.stringify({ pulledOn: new Date().toISOString().slice(0, 10), byFy, window: { FY_FROM, FY_TO, foodInspections, inspectionsWithCitations: withCit.size, top } }, null, 2));
})();
