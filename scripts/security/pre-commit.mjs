#!/usr/bin/env node
// ============================================================
//  PRE-COMMIT SECURITY HOOK
//  Runs on git commit via .husky/pre-commit.
//
//  Location: scripts/security/pre-commit.mjs
//  Hook: .husky/pre-commit runs "npm run precommit"
// ============================================================

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const R   = "\x1b[31m";
const Y   = "\x1b[33m";
const G   = "\x1b[32m";
const B   = "\x1b[34m";
const BL  = "\x1b[1m";
const DIM = "\x1b[2m";
const X   = "\x1b[0m";

const criticals = [];
const warnings  = [];
const passed    = [];

function crit(label, detail) { criticals.push({ label, detail }); }
function warn(label, detail) { warnings.push({ label, detail }); }
function pass(label)        { passed.push(label); }

function exec(cmd) {
  try { return execSync(cmd, { encoding: "utf8" }).trim(); }
  catch { return ""; }
}

function stagedFiles() {
  return exec("git diff --cached --name-only --diff-filter=ACMR")
    .split("\n")
    .filter(Boolean);
}

function stagedContent(file) {
  try { return execSync(`git show :${file}`, { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 }); }
  catch { return ""; }
}

function fileExists(p) { return fs.existsSync(path.resolve(process.cwd(), p)); }

function scannedFiles() {
  return exec("git ls-files")
    .split("\n")
    .filter(Boolean)
    .filter((f) => !f.includes("node_modules"));
}

// Report filename and body: date and time in 12-hour format, no seconds (e.g. 2026-02-15_07-30-PM)
function reportTimestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const h24 = d.getHours();
  const h12 = h24 % 12 || 12;
  const ampm = h24 < 12 ? "AM" : "PM";
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(h12)}-${pad(d.getMinutes())}-${ampm}`;
}
function reportTimestampLong() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const h24 = d.getHours();
  const h12 = h24 % 12 || 12;
  const ampm = h24 < 12 ? "AM" : "PM";
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(h12)}:${pad(d.getMinutes())} ${ampm}`;
}

const isScanMode = process.argv.includes("--scan");
const files = isScanMode ? scannedFiles() : stagedFiles();

function getContent(file) {
  if (isScanMode) {
    try { return fs.readFileSync(path.resolve(process.cwd(), file), "utf8"); }
    catch { return ""; }
  }
  return stagedContent(file);
}

// ─── Banner ─────────────────────────────────────────────────
console.log(`\n${BL}${B}╔══════════════════════════════════════════════════╗${X}`);
console.log(`${BL}${B}║   🔒  ${isScanMode ? "SECURITY SCAN" : "PRE-COMMIT"}  (security check)              ║${X}`);
console.log(`${BL}${B}╚══════════════════════════════════════════════════╝${X}\n`);

if (!isScanMode && !files.length) {
  crit("Nothing staged to commit", "Every commit must include staged files.\n     Stage changes with: git add <files>\n     Then run: git commit -m \"...\"");
  const reportLines = ["PRE-COMMIT REPORT", reportTimestampLong(), "", "--- BLOCKED ---", "  [BLOCKED] 1. Nothing staged to commit", "", "RESULT: COMMIT BLOCKED"];
  const reportsDir = path.resolve(process.cwd(), "reports");
  const reportPath = path.join(reportsDir, `security-report-${reportTimestamp()}.txt`);
  try {
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
    fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");
  } catch (_) {}
  console.log(`\n${R}${BL}🚨 BLOCKED${X}`);
  console.log(`\n  ${R}Nothing staged to commit.${X}`);
  console.log(`  ${R}Stage your changes with \`git add\` before committing.${X}\n`);
  console.log(`${DIM}Report saved: ${reportPath}${X}\n`);
  process.exit(1);
}

if (isScanMode && !files.length) {
  console.log(`${Y}No tracked files to scan.${X}\n`);
  process.exit(0);
}

console.log(`${DIM}Scanning ${files.length} ${isScanMode ? "tracked" : "staged"} file(s)…${X}\n`);

// ════════════════════════════════════════════════════════════
// CHECK 1 · SECRETS / CREDENTIALS (generic only)
// ════════════════════════════════════════════════════════════
const SECRET_PATTERNS = [
  { re: /(?:password|passwd|pwd)\s*[:=]\s*['"]?[^\s'"]{6,}/gi,              label: "Hardcoded password" },
  { re: /(?:secret|api[_-]?key)\s*[:=]\s*['"]?[A-Za-z0-9+/=_-]{16,}/gi,    label: "Hardcoded API key or secret" },
  { re: /AKIA[0-9A-Z]{16}/g,                                               label: "AWS Access Key ID" },
  { re: /AIza[0-9A-Za-z_-]{35}/g,                                         label: "Google API key" },
  { re: /github_pat_[A-Za-z0-9_]{82}/g,                                   label: "GitHub Personal Access Token" },
  { re: /ghp_[A-Za-z0-9]{36}/g,                                           label: "GitHub PAT (classic)" },
  { re: /sk_live_[A-Za-z0-9]{24,}/g,                                      label: "Stripe LIVE secret key" },
  { re: /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[A-Za-z0-9+/=_-]+\.[A-Za-z0-9+/=_-]+/g, label: "JWT token" },
];

const SAFE_EXTENSIONS = new Set([".png",".jpg",".jpeg",".gif",".webp",".ico",".woff",".woff2",".eot",".ttf",".otf",".mp4",".mp3",".pdf",".zip",".svg"]);
const ENV_FILES = new Set([".env",".env.local",".env.development",".env.production",".env.staging",".env.test",".env.bak",".env.backup"]);
const ENV_LIKE_PATTERN = /\.env(\.[a-z0-9]+)?$/i;

let secretFound = false;
files.forEach(file => {
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file);
  if (SAFE_EXTENSIONS.has(ext)) return;
  // Allow .env.example as a committed template; block real env / backup files
  if (base === ".env.example") return;
  if (ENV_FILES.has(base) || file.endsWith(".env") || file.includes(".env.") || ENV_LIKE_PATTERN.test(base)) {
    crit("🚨 .env or env-backup file staged for commit", `File: ${file}\n     Env files must never be committed. Add to .gitignore.`);
    secretFound = true;
    return;
  }
  const content = getContent(file);
  if (!content || file.includes("node_modules/")) return;

  SECRET_PATTERNS.forEach(({ re, label }) => {
    re.lastIndex = 0;
    const matches = content.match(re);
    if (matches) {
      const sanitized = matches[0].slice(0, 50);
      crit(`🔑 ${label}`, `File: ${file}\n     Match: ${sanitized}…\n     → Use env vars or remove.`);
      secretFound = true;
    }
  });
});
if (!secretFound) pass("No secrets / credentials in staged files");

// ════════════════════════════════════════════════════════════
// CHECK 2 · .GITIGNORE
// ════════════════════════════════════════════════════════════
const REQUIRED_GITIGNORE = [
  ".env", ".env.local", ".env.*", "node_modules", "dist", "dist-ssr",
  "*.log", ".DS_Store", "Thumbs.db", ".idea", ".vscode",
];

if (!fileExists(".gitignore")) {
  warn("⚠️  No .gitignore", "Add a .gitignore with at least: .env, .env.*, node_modules, dist");
} else {
  const gi = fs.readFileSync(path.resolve(process.cwd(), ".gitignore"), "utf8");
  const missing = REQUIRED_GITIGNORE.filter(e => !gi.includes(e));
  if (missing.length) {
    warn("⚠️  .gitignore missing entries", `Consider adding: ${missing.join(", ")}`);
  } else {
    pass(".gitignore covers essential patterns");
  }
}

// ════════════════════════════════════════════════════════════
// CHECK 3 · CONSOLE.LOG IN SOURCE (optional warn)
// ════════════════════════════════════════════════════════════
const CODE_EXTS = new Set([".ts", ".tsx", ".js", ".jsx"]);
let consoleCount = 0;
files.forEach(file => {
  if (!CODE_EXTS.has(path.extname(file).toLowerCase())) return;
  if (file.includes("__tests__") || file.includes(".test.") || file.includes(".spec.")) return;
  if (file.includes("lib/logger") || file.endsWith("logger.ts")) return; // logger module is allowed to use console
  const content = getContent(file);
  const matches = [...(content.matchAll(/console\.(log|error|warn|debug|info)\(/g))];
  if (matches.length) {
    const lineNums = [];
    matches.forEach(m => {
      lineNums.push(content.slice(0, m.index).split("\n").length);
    });
    warn(`⚠️  console.${[...new Set(matches.map(m => m[1]))].join("/")} in source`,
      `File: ${file} (lines: ${lineNums.join(", ")})\n     Remove before production or use a logger.`);
    consoleCount += matches.length;
  }
});
if (!consoleCount) pass("No console.log in staged source");

// ════════════════════════════════════════════════════════════
// CHECK 4 · XSS (innerHTML / eval)
// ════════════════════════════════════════════════════════════
const XSS_PATTERNS = [
  { re: /dangerouslySetInnerHTML\s*=\s*\{\s*\{\s*__html\s*:/g, label: "dangerouslySetInnerHTML (sanitize with DOMPurify if user content)" },
  { re: /\.innerHTML\s*=\s*(?!["']<)/g,                       label: "innerHTML assignment" },
  { re: /document\.write\s*\(/g,                              label: "document.write()" },
  { re: /eval\s*\(/g,                                        label: "eval()" },
];

let xssFound = false;
files.forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (!CODE_EXTS.has(ext) && ext !== ".html") return;
  if (file.includes(".sanity/runtime")) return; // generated
  const content = getContent(file);
  const usesSanitizer = content.includes("sanitizeHtml(") || content.includes("DOMPurify.sanitize(");
  XSS_PATTERNS.forEach(({ re, label }) => {
    re.lastIndex = 0;
    if (re.test(content)) {
      if (usesSanitizer) return; // __html is already sanitized
      warn(`⚠️  XSS risk: ${label}`, `File: ${file}\n     Prefer textContent or DOMPurify.sanitize() for user content.`);
      xssFound = true;
    }
  });
});
if (!xssFound) pass("No obvious XSS patterns");

// ════════════════════════════════════════════════════════════
// CHECK 4b · SANITIZE CONFIG (safe href: only http/https/mailto)
// ════════════════════════════════════════════════════════════
const sanitizePath = path.join(process.cwd(), "src", "lib", "sanitize.ts");
if (fileExists("src/lib/sanitize.ts")) {
  const sanitizeContent = fs.readFileSync(sanitizePath, "utf8");
  if (sanitizeContent.includes("sanitizeHtml") && sanitizeContent.includes("href")) {
    if (!sanitizeContent.includes("ALLOWED_URI_REGEXP") && !sanitizeContent.includes("ADD_ATTR")) {
      warn("⚠️  sanitize.ts allows href but has no ALLOWED_URI_REGEXP", "Add ALLOWED_URI_REGEXP to restrict links to https/mailto only (prevents javascript:).");
    } else if (sanitizeContent.includes("ALLOWED_URI_REGEXP")) {
      pass("sanitize.ts uses ALLOWED_URI_REGEXP for safe href");
    }
  }
}

// ════════════════════════════════════════════════════════════
// CHECK 4c · .env.example documents UNSUBSCRIBE_SECRET
// ════════════════════════════════════════════════════════════
if (fileExists(".env.example")) {
  const envExample = fs.readFileSync(path.join(process.cwd(), ".env.example"), "utf8");
  if (!envExample.includes("UNSUBSCRIBE_SECRET")) {
    warn("⚠️  .env.example missing UNSUBSCRIBE_SECRET", "Required for secure unsubscribe links. Add UNSUBSCRIBE_SECRET=...");
  } else {
    pass(".env.example documents UNSUBSCRIBE_SECRET");
  }
}

// ════════════════════════════════════════════════════════════
// CHECK 5 · OPEN REDIRECT
// ════════════════════════════════════════════════════════════
const REDIRECT_PATTERNS = [
  /window\.location\s*=\s*(?:searchParams|params|query|location\.search)/gi,
  /window\.location\.href\s*=\s*(?:searchParams|params|query)/gi,
  /navigate\s*\(\s*(?:searchParams|params|query)\.get\s*\(/gi,
  /router\.push\s*\(\s*(?:searchParams|params|query)\.get\s*\(/gi,
];

let redirectFound = false;
files.forEach(file => {
  if (!CODE_EXTS.has(path.extname(file).toLowerCase())) return;
  const content = getContent(file);
  REDIRECT_PATTERNS.forEach(re => {
    re.lastIndex = 0;
    if (re.test(content)) {
      crit("🔀 Open redirect risk", `File: ${file}\n     Validate redirect URLs against an allowlist.`);
      redirectFound = true;
    }
  });
});
if (!redirectFound) pass("No open redirect patterns");

// ════════════════════════════════════════════════════════════
// CHECK 6 · PACKAGE SAFETY (typosquat)
// ════════════════════════════════════════════════════════════
const pkgFiles = files.filter(f => path.basename(f) === "package.json" && !f.includes("node_modules"));
const SUSPICIOUS = ["crossenv", "cross.env", "lodahs", "loadsh", "mocha.js", "webpack.js", "vite.js", "react.js", "tailwind.js"];
if (pkgFiles.length) {
  pkgFiles.forEach(file => {
    try {
      const pkg = JSON.parse(getContent(file));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      const found = Object.keys(deps).filter(d => SUSPICIOUS.includes(d));
      if (found.length) {
        crit("📦 Suspicious package name", `File: ${file}\n     Verify on npm: ${found.join(", ")}`);
      } else {
        pass("No typosquat packages detected");
      }
    } catch (_) {}
  });
} else {
  pass("No package.json changes");
}

// ════════════════════════════════════════════════════════════
// CHECK 7 · CONTACT / FORM REMINDER
// ════════════════════════════════════════════════════════════
const hasForm = files.some(f => {
  const c = getContent(f);
  return (c.includes("<form") || c.includes("type=\"submit\"") || c.includes("fetch(")) && (c.includes("mailto:") || c.includes("action=") || c.includes("email"));
});
const repoHasApiRoutes = files.some(f => f.startsWith("api/")) || exec("git ls-files").split("\n").filter(Boolean).some(f => f.startsWith("api/"));
const usesServerlessApi = repoHasApiRoutes || files.some(f => /['\"]\/api\//.test(getContent(f)));
if (hasForm && !usesServerlessApi) {
  warn("📧 Form/contact code detected",
    "If submitting to a backend or 3rd party:\n" +
    "     - Do not put API keys or webhook URLs in client code.\n" +
    "     - Use a serverless function or backend proxy; keep secrets server-side.");
} else if (hasForm && usesServerlessApi) {
  pass("Form/contact uses serverless API; secrets kept server-side");
}

// ════════════════════════════════════════════════════════════
// OUTSTANDING ITEMS TO FIX (non-blocking; shown until you solve them)
// Remove an item from OUTSTANDING_TO_FIX when you've addressed it.
// ════════════════════════════════════════════════════════════
const OUTSTANDING_TO_FIX = [
  {
    condition: () => {
      if (!fileExists("lib/rateLimit.ts")) return false;
      const v = fs.readFileSync(path.resolve(process.cwd(), "lib/rateLimit.ts"), "utf8");
      return !/dedicated|separate.*Redis|separate.*database/i.test(v);
    },
    msg: "Use a separate Upstash Redis database per app (company site vs SaaS) so rate limits and data are isolated.",
  },
  {
    condition: () => {
      if (!fileExists("api/send-email.ts")) return false;
      const v = fs.readFileSync(path.resolve(process.cwd(), "api/send-email.ts"), "utf8");
      return !/ALLOWED_UNAUTH_TYPES|INTERNAL_EMAIL_SECRET/i.test(v);
    },
    msg: "Restrict /api/send-email: allow unauthenticated only for type=welcome; require internal secret for other sends (checklist, admin, notifications).",
  },
  {
    condition: () => {
      if (!fileExists("api/email-preferences.ts")) return false;
      const v = fs.readFileSync(path.resolve(process.cwd(), "api/email-preferences.ts"), "utf8");
      return !/signed.*link|verification.*email.*owner/i.test(v);
    },
    msg: "When implementing /api/email-preferences for real updates, require signed link or verification so only the email owner can change preferences.",
  },
  {
    condition: () => {
      if (!fileExists("vercel.json")) return false;
      const v = fs.readFileSync(path.resolve(process.cwd(), "vercel.json"), "utf8");
      return !/Content-Security-Policy/i.test(v);
    },
    msg: "Consider adding Content-Security-Policy header in vercel.json for extra XSS hardening (test to avoid breaking scripts).",
  },
];
const toFix = OUTSTANDING_TO_FIX.filter(({ condition }) => condition()).map(({ msg }) => msg);

// ════════════════════════════════════════════════════════════
// REPORT (console + file)
// ════════════════════════════════════════════════════════════
const reportLines = [];
const ts = reportTimestampLong();
reportLines.push(isScanMode ? "SECURITY SCAN REPORT" : "PRE-COMMIT REPORT");
reportLines.push(ts);
reportLines.push("");
reportLines.push("--- PASSED ---");
passed.forEach(p => reportLines.push("  [PASS] " + p));
reportLines.push("");
reportLines.push("--- WARNINGS ---");
warnings.forEach(({ label }, i) => reportLines.push("  [WARN] " + (i + 1) + ". " + label));
reportLines.push("");
reportLines.push("--- ITEMS TO FIX (non-blocking) ---");
if (toFix.length) {
  toFix.forEach((msg, i) => reportLines.push("  [TO FIX] " + (i + 1) + ". " + msg));
} else {
  reportLines.push("  (none)");
}
reportLines.push("");
reportLines.push("--- BLOCKED ---");
criticals.forEach(({ label }, i) => reportLines.push("  [BLOCKED] " + (i + 1) + ". " + label));
reportLines.push("");

const allowed = criticals.length === 0;
reportLines.push("RESULT: " + (isScanMode ? (allowed ? "SCAN OK" : "SCAN BLOCKED") : (allowed ? "COMMIT ALLOWED" : "COMMIT BLOCKED")));
const reportText = reportLines.join("\n");

const reportsDir = path.resolve(process.cwd(), "reports");
// One report type for both pre-commit and --scan: security-report-{date-time-12hr}.txt in reports/
const reportFileName = `security-report-${reportTimestamp()}.txt`;
let reportPath = path.join(reportsDir, reportFileName);
try {
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
  fs.writeFileSync(reportPath, reportText, "utf8");
} catch (_) {
  try {
    reportPath = path.resolve(process.cwd(), ".last-commit-security-report.txt");
    fs.writeFileSync(reportPath, reportText, "utf8");
  } catch (_) {}
}

console.log("\n" + "─".repeat(60));
console.log(`${BL}  ${isScanMode ? "SECURITY SCAN" : "COMMIT"} REPORT  ${ts}${X}`);
console.log("─".repeat(60));
console.log(`${DIM}Report saved: ${reportPath}${X}`);

if (passed.length) {
  console.log(`\n${G}${BL}✅ PASSED (${passed.length})${X}`);
  passed.forEach(p => console.log(`  ${G}✓${X} ${p}`));
}
if (warnings.length) {
  console.log(`\n${Y}${BL}⚠️  WARNINGS (${warnings.length})${X}`);
  warnings.forEach(({ label, detail }, i) => {
    console.log(`\n  ${Y}[${i + 1}] ${label}${X}`);
    console.log(detail.split("\n").map(l => `  ${Y}│${X} ${l}`).join("\n"));
  });
  console.log(`\n${Y}  ↑ Commit will proceed. Fix before deploy if needed.${X}`);
}
if (toFix.length) {
  console.log(`\n${Y}${BL}📋 ITEMS TO FIX (${toFix.length}) – non-blocking${X}`);
  toFix.forEach((msg, i) => console.log(`  ${Y}[TO FIX ${i + 1}]${X} ${msg}`));
  console.log(`\n${Y}  ↑ These stay in reports until you fix them. Tell the hook maintainer to remove an item when solved.${X}`);
}
if (criticals.length) {
  console.log(`\n${R}${BL}🚨 BLOCKED (${criticals.length})${X}`);
  criticals.forEach(({ label, detail }, i) => {
    console.log(`\n  ${R}[BLOCKED ${i + 1}] ${label}${X}`);
    console.log(detail.split("\n").map(l => `  ${R}│${X} ${l}`).join("\n"));
  });
  console.log(`\n${R}${BL}║  ${isScanMode ? "Fix issues above before committing." : "Fix above or: git commit --no-verify (never for secrets)"}  ║${X}\n`);
  process.exit(1);
}

console.log(`\n${G}${BL}╔════════════════════════════════════════════════╗${X}`);
console.log(`${G}${BL}║  ✅ ${isScanMode ? "Scan complete." : "Commit allowed."}                            ║${X}`);
console.log(`${G}${BL}╚════════════════════════════════════════════════╝${X}\n`);
process.exit(0);
