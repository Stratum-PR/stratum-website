// Recomputes the Puerto Rico food recall aggregates shown on /inspecciones-fda-puerto-rico.
//
//   node scripts/data/fda-pr/compute-openfda-recalls.mjs          # uses the saved JSON
//   node scripts/data/fda-pr/compute-openfda-recalls.mjs --fetch  # pulls openFDA again first
//
// Source: openFDA food enforcement API, public, no key needed at this volume.
// One openFDA record = one recalled product (recall_number). One recall event (event_id) can
// cover several products. Year = first 4 digits of recall_initiation_date (calendar year).
// Firm names are never stored or printed: the page shows aggregates only.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const file = join(here, 'openfda-food-enforcement-pr.json');
const URL = 'https://api.fda.gov/food/enforcement.json?search=state:"PR"&limit=1000';
const KEEP = ['event_id', 'recall_number', 'classification', 'recall_initiation_date', 'center_classification_date', 'report_date', 'status', 'state', 'voluntary_mandated'];

if (process.argv.includes('--fetch')) {
  const res = await fetch(URL);
  if (!res.ok) throw new Error(`openFDA ${res.status}`);
  const d = await res.json();
  if (d.meta.results.total > 1000) throw new Error('More than 1000 records: add paging (skip=) before trusting the totals');
  const results = d.results
    .map((x) => Object.fromEntries(KEEP.map((k) => [k, x[k] ?? null])))
    .sort((a, b) => (a.recall_initiation_date + a.recall_number).localeCompare(b.recall_initiation_date + b.recall_number));
  const out = {
    source: URL,
    pulledOn: new Date().toISOString().slice(0, 10),
    openfdaLastUpdated: d.meta.last_updated,
    total: d.meta.results.total,
    note: 'Fields limited to what the aggregates need; firm names, addresses and product descriptions are intentionally not stored.',
    results,
  };
  writeFileSync(file, JSON.stringify(out, null, 1));
}

const data = JSON.parse(readFileSync(file, 'utf8'));
const byYear = {};
for (const r of data.results) {
  const y = r.recall_initiation_date.slice(0, 4);
  const row = (byYear[y] ??= { events: new Set(), classI: 0, classII: 0, classIII: 0 });
  row.events.add(r.event_id);
  const c = r.classification.replace('Class ', '');
  if (c === 'I') row.classI++;
  else if (c === 'II') row.classII++;
  else if (c === 'III') row.classIII++;
}
const rows = Object.keys(byYear)
  .sort()
  .map((y) => ({ year: Number(y), events: byYear[y].events.size, classI: byYear[y].classI, classII: byYear[y].classII, classIII: byYear[y].classIII }));

console.log(JSON.stringify({
  pulledOn: data.pulledOn,
  openfdaLastUpdated: data.openfdaLastUpdated,
  products: data.results.length,
  events: new Set(data.results.map((r) => r.event_id)).size,
  firstInitiation: data.results[0]?.recall_initiation_date,
  lastInitiation: data.results.at(-1)?.recall_initiation_date,
  byYear: rows,
}, null, 2));
