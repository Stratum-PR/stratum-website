#!/usr/bin/env node
// ============================================================
//  PRE-COMMIT SECURITY HOOK — MARKETING / STATIC SITE
//  Use for: company site, landing, about/FAQ, email-style pages.
//  No user login, no DB, no payments → lighter checks.
//
//  Location: scripts/pre-commit-marketing.mjs (repo root)
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

// ─── Banner ─────────────────────────────────────────────────
console.log(`\n${BL}${B}╔══════════════════════════════════════════════════╗${X}`);
console.log(`${BL}${B}║   🔒  PRE-COMMIT  (Marketing / static site)       ║${X}`);
console.log(`${BL}${B}╚══════════════════════════════════════════════════╝${X}\n`);

const files = stagedFiles();
if (!files.length) {
  console.log(`${G}✓ No staged files – nothing to check.${X}\n`);
  // Still write a short report so reports/ exists and user sees where reports go
  const reportsDir = path.resolve(process.cwd(), "reports");
  const ts = new Date().toISOString();
  const safeTs = ts.replace(/[:.]/g, "-");
  const reportPath = path.join(reportsDir, `security-commit-${safeTs}.txt`);
  const reportText = "PRE-COMMIT REPORT (Marketing site)\n" + ts + "\n\nNo staged files – nothing to check.\n\nRESULT: COMMIT ALLOWED\n";
  try {
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
    fs.writeFileSync(reportPath, reportText, "utf8");
    console.log(`${DIM}Report saved: ${reportPath}${X}\n`);
  } catch (_) {}
  process.exit(0);
}

console.log(`${DIM}Scanning ${files.length} staged file(s)…${X}\n`);

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
  if (ENV_FILES.has(base) || file.endsWith(".env") || file.includes(".env.") || ENV_LIKE_PATTERN.test(base)) {
    crit("🚨 .env or env-backup file staged for commit", `File: ${file}\n     Env files must never be committed. Add to .gitignore.`);
    secretFound = true;
    return;
  }
  const content = stagedContent(file);
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
  const content = stagedContent(file);
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
  const content = stagedContent(file);
  XSS_PATTERNS.forEach(({ re, label }) => {
    re.lastIndex = 0;
    if (re.test(content)) {
      warn(`⚠️  XSS risk: ${label}`, `File: ${file}\n     Prefer textContent or DOMPurify.sanitize() for user content.`);
      xssFound = true;
    }
  });
});
if (!xssFound) pass("No obvious XSS patterns");

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
  const content = stagedContent(file);
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
      const pkg = JSON.parse(stagedContent(file));
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
  const c = stagedContent(f);
  return (c.includes("<form") || c.includes("type=\"submit\"") || c.includes("fetch(")) && (c.includes("mailto:") || c.includes("action=") || c.includes("email"));
});
if (hasForm) {
  warn("📧 Form/contact code detected",
    "If submitting to a backend or 3rd party:\n" +
    "     - Do not put API keys or webhook URLs in client code.\n" +
    "     - Use a serverless function or backend proxy; keep secrets server-side.");
}

// ════════════════════════════════════════════════════════════
// REPORT (console + file)
// ════════════════════════════════════════════════════════════
const reportLines = [];
const ts = new Date().toISOString();
reportLines.push("PRE-COMMIT REPORT (Marketing site)");
reportLines.push(ts);
reportLines.push("");
reportLines.push("--- PASSED ---");
passed.forEach(p => reportLines.push("  [PASS] " + p));
reportLines.push("");
reportLines.push("--- WARNINGS ---");
warnings.forEach(({ label }, i) => reportLines.push("  [WARN] " + (i + 1) + ". " + label));
reportLines.push("");
reportLines.push("--- BLOCKED ---");
criticals.forEach(({ label }, i) => reportLines.push("  [BLOCKED] " + (i + 1) + ". " + label));
reportLines.push("");

const allowed = criticals.length === 0;
reportLines.push("RESULT: " + (allowed ? "COMMIT ALLOWED" : "COMMIT BLOCKED"));
const reportText = reportLines.join("\n");

const reportsDir = path.resolve(process.cwd(), "reports");
const safeTs = ts.replace(/[:.]/g, "-");
const reportFileName = `security-commit-${safeTs}.txt`;
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
console.log(`${BL}  COMMIT REPORT (Marketing)  ${ts}${X}`);
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
if (criticals.length) {
  console.log(`\n${R}${BL}🚨 BLOCKED (${criticals.length})${X}`);
  criticals.forEach(({ label, detail }, i) => {
    console.log(`\n  ${R}[BLOCKED ${i + 1}] ${label}${X}`);
    console.log(detail.split("\n").map(l => `  ${R}│${X} ${l}`).join("\n"));
  });
  console.log(`\n${R}${BL}║  Fix above or: git commit --no-verify (never for secrets)  ║${X}\n`);
  process.exit(1);
}

console.log(`\n${G}${BL}╔════════════════════════════════════════════════╗${X}`);
console.log(`${G}${BL}║  ✅ Commit allowed.                            ║${X}`);
console.log(`${G}${BL}╚════════════════════════════════════════════════╝${X}\n`);
process.exit(0);
