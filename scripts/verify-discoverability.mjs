#!/usr/bin/env node
/**
 * Verify discoverability artifacts in dist/ after build.
 * Run after: npm run build
 * Usage: node scripts/verify-discoverability.mjs [expectedBaseUrl]
 */

import fs from 'fs';
import path from 'path';

const DIST = path.join(process.cwd(), 'dist');
const expectedBaseUrl = process.argv[2] || 'https://www.stratumpr.com';

const requiredFiles = [
  'sitemap.xml',
  'robots.txt',
  'llms.txt',
  'ai-routes.json',
  'content.json',
];

let failed = false;

console.log('Verifying discoverability artifacts in dist/');
console.log('Expected base URL:', expectedBaseUrl);
console.log('');

for (const file of requiredFiles) {
  const filePath = path.join(DIST, file);
  if (!fs.existsSync(filePath)) {
    console.error('FAIL: Missing', file);
    failed = true;
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  if (expectedBaseUrl && !content.includes(expectedBaseUrl)) {
    console.error('FAIL:', file, '- does not reference expected base URL');
    failed = true;
  } else {
    console.log('OK:', file);
  }
}

if (failed) {
  process.exit(1);
}
console.log('');
console.log('All discoverability artifacts present and reference expected base URL.');
