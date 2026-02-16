# Security notes

**Outstanding items to fix** are tracked in the pre-commit security hook and appear in every security report until you address them. Run:

```bash
npm run security-check
```

or

```bash
node scripts/security/pre-commit.mjs --scan
```

See the report section **--- ITEMS TO FIX (non-blocking) ---**. Those items do not block commits. When you fix one, ask to have it removed from the hook so it stops appearing in reports.
