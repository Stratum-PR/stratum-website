#!/usr/bin/env node
// ============================================================
//  SCAN GIT HISTORY FOR SECRETS
//  Run: node scripts/scan-history-for-secrets.mjs
//  Optional: HISTORY_SCAN_COMMITS=500 node scripts/scan-history-for-secrets.mjs
// ============================================================

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const MAX_COMMITS = parseInt(process.env.HISTORY_SCAN_COMMITS || "300", 10);

const SECRET_PATTERNS = [
  { re: /(?:password|passwd|pwd)\s*[:=]\s*['"]?[^\s'"]{6,}/gi, label: "Hardcoded password" },
  { re: /(?:secret|api[_-]?key)\s*[:=]\s*['"]?[A-Za-z0-9+/=_-]{16,}/gi, label: "Hardcoded API key or secret" },
  { re: /AKIA[0-9A-Z]{16}/g, label: "AWS Access Key ID" },
  { re: /AIza[0-9A-Za-z_-]{35}/g, label: "Google API key" },
  { re: /github_pat_[A-Za-z0-9_]{82}/g, label: "GitHub Personal Access Token" },
  { re: /ghp_[A-Za-z0-9]{36}/g, label: "GitHub PAT (classic)" },
  { re: /sk_live_[A-Za-z0-9]{24,}/g, label: "Stripe LIVE secret key" },
  { re: /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[A-Za-z0-9+/=_-]+\.[A-Za-z0-9+/=_-]+/g, label: "JWT token" },
];

// Lines containing only these placeholders are ignored (docs / .env.example)
const FALSE_POSITIVE_SUBSTRINGS = [
  "REPLACE_ME",
  "your_project_id_here",
  "your_resend_api_key",
  "your_key_here",
  "your_api_key_here",
  "paste-your-key",
  "example.com",
  "MISSING",
];

function redact(s, maxVisible = 8) {
  if (!s || s.length <= maxVisible * 2) return "***";
  return s.slice(0, 4) + "…" + s.slice(-4);
}

function isFalsePositive(line) {
  const lower = line.toLowerCase();
  return FALSE_POSITIVE_SUBSTRINGS.some((sub) => lower.includes(sub.toLowerCase()));
}

function scanLine(line, filePath) {
  const findings = [];
  const trimmed = line.replace(/^\+\s*/, "").trim();
  if (isFalsePositive(trimmed)) return findings;

  for (const { re, label } of SECRET_PATTERNS) {
    re.lastIndex = 0;
    const matches = trimmed.match(re);
    if (matches) {
      for (const m of matches) {
        findings.push({ label, snippet: redact(m), file: filePath });
      }
    }
  }
  return findings;
}

function main() {
  const cwd = process.cwd();
  console.log("\n🔍 Scanning last", MAX_COMMITS, "commits for secrets in git history…\n");

  let logOutput;
  try {
    logOutput = execSync(`git log -p --all -${MAX_COMMITS}`, {
      encoding: "utf8",
      maxBuffer: 50 * 1024 * 1024,
      cwd,
    });
  } catch (e) {
    if (e.stderr && String(e.stderr).includes("unknown revision")) {
      console.log("No commits to scan.");
      process.exit(0);
    }
    console.error("Git failed:", e.message || e);
    process.exit(1);
  }

  const blocks = logOutput.split(/\n(?=commit [0-9a-f]{40})/);
  const allFindings = [];
  let envFileCommits = new Set();

  for (const block of blocks) {
    const commitMatch = block.match(/^commit ([0-9a-f]{40})/m);
    if (!commitMatch) continue;
    const commitHash = commitMatch[1].slice(0, 8);

    let currentFile = "";
    const lines = block.split("\n");
    let inDiff = false;
    for (const line of lines) {
      if (line.startsWith("diff --git ")) {
        const m = line.match(/^diff --git a\/(.+?) b\/(.+?)$/);
        if (m) {
          currentFile = m[2];
          const base = path.basename(currentFile);
          if (base === ".env" || base === ".env.bak" || base === ".env.backup" || /^\.env\./.test(base)) {
            if (base !== ".env.example") envFileCommits.add(commitHash);
          }
        }
        inDiff = true;
        continue;
      }
      if (line.startsWith("+++ ")) {
        const m = line.match(/^\+\+\+ b\/(.+)$/);
        if (m) currentFile = m[1];
        continue;
      }
      if (inDiff && currentFile && line.startsWith("+") && !line.startsWith("+++")) {
        const findings = scanLine(line, currentFile);
        for (const f of findings) {
          allFindings.push({ commit: commitHash, ...f });
        }
      }
    }
  }

  const reportLines = [
    "GIT HISTORY SECRET SCAN",
    new Date().toISOString(),
    `Commits scanned: ${blocks.length}`,
    "",
    "--- FINDINGS ---",
  ];

  if (allFindings.length) {
    const byCommit = {};
    for (const f of allFindings) {
      const k = f.commit;
      if (!byCommit[k]) byCommit[k] = [];
      byCommit[k].push(f);
    }
    for (const [commit, list] of Object.entries(byCommit)) {
      console.log(`  Commit ${commit}:`);
      reportLines.push(`  Commit ${commit}:`);
      for (const { file, label, snippet } of list) {
        const msg = `    ${label} in ${file} (${snippet})`;
        console.log("   ", msg.trim());
        reportLines.push(msg);
      }
      reportLines.push("");
    }
  }

  if (envFileCommits.size) {
    console.log("  .env / .env.bak / .env.backup appeared in history in commits:", [...envFileCommits].join(", "));
    reportLines.push("");
    reportLines.push("  Env files in history (commits): " + [...envFileCommits].join(", "));
  }

  if (!allFindings.length && !envFileCommits.size) {
    console.log("  No secrets or .env files detected in scanned history.");
    reportLines.push("  No secrets or .env files detected in scanned history.");
  }

  reportLines.push("");
  reportLines.push("See scripts/SECURITY-HISTORY-SCAN.md for what to do if you see findings.");

  const reportDir = path.resolve(cwd, "reports");
  const reportName = `history-secret-scan-${new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19)}.txt`;
  const reportPath = path.join(reportDir, reportName);
  try {
    if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
    fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");
    console.log("\nReport saved:", reportPath);
  } catch (_) {
    // ignore
  }

  process.exit(allFindings.length || envFileCommits.size ? 1 : 0);
}

main();
