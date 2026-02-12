# Scan Git History for Secrets

This doc explains how to check your repository history for leaked secrets and what to do if something is found.

## Run the scan

From the repo root:

```bash
node scripts/scan-history-for-secrets.mjs
```

- By default the script scans the **last 300 commits** across all branches.
- To scan more commits: `HISTORY_SCAN_COMMITS=500 node scripts/scan-history-for-secrets.mjs`
- Results are printed to the terminal and saved under `reports/history-secret-scan-<timestamp>.txt`.
- Exit code is **0** if nothing was found, **1** if secrets or `.env`-like files were detected.

## What it looks for

- Hardcoded passwords, API keys, and “secret”/“api_key” style values (long strings).
- AWS keys, Google API keys, GitHub PATs, Stripe live keys, JWT-like tokens.
- Any commit that **added** a file named `.env`, `.env.bak`, `.env.backup`, or `.env.*` (except `.env.example`).

Placeholders like `REPLACE_ME`, `your_project_id_here`, `your_resend_api_key`, etc. are ignored so that docs and `.env.example` don’t trigger the scan.

## If the scan finds something

### 1. Rotate the secret immediately

If a real key or password was committed:

- Revoke or rotate it in the service (GitHub, AWS, Resend, Stripe, etc.).
- Generate a new secret and store it only in env vars or a secrets manager, **not** in the repo.

### 2. Remove the secret from history (optional but recommended)

So that old commits don’t still contain the value:

- **Specific file (e.g. `.env`, `.env.bak`):** use the steps in [PURGE-ENV-FROM-HISTORY.md](./PURGE-ENV-FROM-HISTORY.md) (e.g. `git filter-branch` or `git filter-repo` to remove that path from all commits).
- **Other files that contain secrets:** use the same idea: remove the file from history with `filter-branch` or BFG, or use a tool that rewrites commits to replace the secret with a placeholder (e.g. BFG Repo-Cleaner with a replacement file).

After rewriting history:

- Force-push the affected branches: `git push --force origin <branch>`.
- Warn anyone who has cloned the repo to re-clone or reset their branch; force-push rewrites remote history.

### 3. Keep secrets out of future commits

- Use the pre-commit hook (and `npm run security-check`) so that new commits are checked before they enter history.
- Never commit `.env`, `.env.local`, or backup env files; keep them in `.gitignore`.

## When to run

- **One-time:** after onboarding or when you first add the script, to see if history is already clean.
- **Periodically:** e.g. once a quarter or after a security review.
- **After a mistake:** if someone might have committed a secret, run the scan and then rotate + clean history if needed.
