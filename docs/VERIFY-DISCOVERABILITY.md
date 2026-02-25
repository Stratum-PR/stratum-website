# Discoverability (SEO + AI) Verification

This project generates crawlable and AI-discoverable artifacts after each production build.

## What Gets Generated

After `npm run build`, the following files are written into `dist/`:

| File | Purpose |
|------|---------|
| `sitemap.xml` | Sitemap for search engines (indexable routes only) |
| `robots.txt` | Allows common bots and points to `Sitemap: <baseUrl>/sitemap.xml` |
| `ai-routes.json` | Machine-readable list of public routes (path, url, title, description) |
| `llms.txt` | Human- and LLM-readable site summary and full page text |
| `content.json` | Structured export: pages (with sections), FAQ, and metadata |

The **base URL** used in all artifacts comes from `VITE_PUBLIC_BASE_URL` (or the default `https://www.stratumpr.com`). Set it in `.env.production` or your deployment environment for production.

## How to Run the Generator

The generator runs automatically after the Vite build:

```bash
npm run build
```

This runs:

1. `vite build`
2. `npx tsx scripts/generate-discoverability.ts`

To run only the generator (e.g. after changing `src/config/discoverable-routes.ts` or `src/content/discoverable-content.ts`), ensure `dist/` exists (run a build first), then:

```bash
npx tsx scripts/generate-discoverability.ts
```

## How to Verify

1. **Build and verify artifacts exist**

   ```bash
   npm run build
   node scripts/verify-discoverability.mjs
   ```

   Optionally pass the expected base URL:

   ```bash
   node scripts/verify-discoverability.mjs https://www.stratumpr.com
   ```

2. **Inspect files locally**

   After `npm run build`, run a local preview:

   ```bash
   npm run preview
   ```

   Then open:

   - `http://localhost:4173/sitemap.xml`
   - `http://localhost:4173/robots.txt`
   - `http://localhost:4173/llms.txt`
   - `http://localhost:4173/ai-routes.json`
   - `http://localhost:4173/content.json`

   Replace the port if your preview uses a different one.

3. **Production**

   After deploying, open the same paths on your production domain (e.g. `https://www.stratumpr.com/sitemap.xml`) to confirm they are served correctly.

## Source of Truth

- **Routes and base URL:** `src/config/discoverable-routes.ts`  
  - `DISCOVERABLE_ROUTES`, `getPublicBaseUrl()`, `safePathForUrl()`, `DEFAULT_OG_IMAGE`
- **Page copy for llms.txt / content.json:** `src/content/discoverable-content.ts`  
  - `PAGE_CONTENT`, `FAQ_ENTRIES`

When you add a new public page:

1. Add its entry to `DISCOVERABLE_ROUTES` (and export a `*_ROUTE` constant if used by a page).
2. Add or extend `PAGE_CONTENT[path]` with the same copy as the live page (no secrets or PII).

## Security

Do **not** put secrets, API keys, or PII in:

- `DISCOVERABLE_ROUTES` (titles, descriptions)
- `PAGE_CONTENT` or `FAQ_ENTRIES`

This data is served publicly in sitemap, robots, llms.txt, content.json, and meta tags.
