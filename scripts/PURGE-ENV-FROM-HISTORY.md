# Remove .env.bak from Git history (so it no longer appears on GitHub)

**.env.bak still on GitHub?** It exists in past commits. Rewrite history and force-push to remove it. Run these in **Git Bash** at the repo root (or run `bash scripts/purge-env-bak-from-history.sh`). Not from inside Cursor’s integrated terminal if it fails there.

## 1. Clean working tree (required for filter-branch)

```bash
git stash push -u -m "before purge .env.bak"
```

## 2. Remove .env.bak from all commits

**Using Git only (no extra install):** Run in **Git Bash** (not PowerShell) at repo root. With 900+ commits this takes about 15–20 minutes.

```bash
# Optional: stash uncommitted work first
git stash push -u -m "before purge"

# Suppress warning and rewrite history
export FILTER_BRANCH_SQUELCH_WARNING=1
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch .env.bak" --prune-empty --tag-name-filter cat -- --all

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Restore work if you stashed
git stash pop
```

**Alternative – git-filter-repo** (faster, but must be installed first):
- Install: `pip install git-filter-repo` (requires Python), or download from https://github.com/newren/git-filter-repo  
- Then run: `git filter-repo --path .env.bak --invert-paths --force`  
- Note: run as `git filter-repo`, not `git filter-repo` – it’s a standalone script that Git can run if it’s on your PATH.

If a previous filter-branch was interrupted, remove its temp dir first: `rm -rf .git-rewrite`

## 3. Restore your work

```bash
git stash pop
```

## 4. Clean up refs and gc (optional but recommended)

```bash
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

## 5. Force-push to GitHub

**If filter-branch said "Ref 'refs/heads/main' is unchanged"** then `.env.bak` was never on **main**'s history (it only existed on other branches). So main on GitHub is already clean. To remove `.env.bak` from GitHub entirely, force-push the **other** branches that were rewritten (so their rewritten history replaces the remote):

```bash
# Push the rewritten branches (from your first filter-branch --all run).
# Replace with any branch names that were actually rewritten:
git push --force origin staging
git push --force origin dev
git push --force origin dev-jova
git push --force origin Stratum-Hub
```

If you need to rewrite main (e.g. you later find .env.bak is on main), stash first, then:
```bash
git stash push -u -m "before filter-branch main"
export FILTER_BRANCH_SQUELCH_WARNING=1
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch .env.bak" --prune-empty main
git push --force origin main
git stash pop
```

**If other refs were rewritten** (e.g. staging, dev), push them too so GitHub loses .env.bak on those branches:

```bash
git push --force origin staging
git push --force origin dev
# etc. for any branch that was rewritten
```

**Warning:** Force-push rewrites remote history. Anyone else with a clone should re-clone or reset their branch.

---

**.env.bak is already untracked** (removed from the index). These steps only remove it from **past** commits.
