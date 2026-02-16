# Fixing Google Indexing of dev.stratumpr.com

## Problem
Google is showing `dev.stratumpr.com` in search results instead of `www.stratumpr.com` when searching for your company name and keywords.

## Root Cause
- Google indexed the dev site first or it has more signals
- The dev site is still accessible and being crawled
- Both sites have the same content, causing duplicate content issues

## Solutions Implemented

### 1. ✅ Block Dev Site from Indexing
- Added conditional `noindex, nofollow` meta tag for dev/staging environments
- Script runs immediately in `index.html` before page load
- Also added check in `updateSEO()` function for dynamic updates

### 2. ✅ Force Canonical URLs
- All canonical URLs now always point to `www.stratumpr.com`
- Even if accessed via dev.stratumpr.com, canonical points to production
- This tells Google which is the preferred version

### 3. ✅ Additional Steps You Need to Take

#### Step 1: Request Removal of Dev URLs from Google

**Option A: Add dev.stratumpr.com as a Property (Recommended)**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click the property dropdown (top left)
3. Click **"Add Property"**
4. Select **"URL prefix"**
5. Enter: `https://dev.stratumpr.com`
6. Choose verification method (HTML tag, DNS, or file upload)
7. Complete verification
8. Once verified, go to **Removals** → **New Request**
9. Enter: `https://dev.stratumpr.com/*`
10. Select "Remove all URLs with this prefix"
11. Submit the request

**Option B: Use URL Inspection Tool (If you can't verify dev domain)**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your **www.stratumpr.com** property
3. Use the search bar at the top to inspect: `dev.stratumpr.com`
4. Click **"Request Indexing"** (this won't work, but shows you the URL)
5. Instead, go to **Removals** → **New Request**
6. Enter specific dev URLs one by one (e.g., `https://dev.stratumpr.com/`, `https://dev.stratumpr.com/about`, etc.)
7. Note: This is tedious, but works without verifying dev domain

**Option C: Use the Temporary Removals Tool (Easier)**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your **www.stratumpr.com** property
3. Go to **Removals** → **New Request**
4. Enter: `site:dev.stratumpr.com` (this searches for all dev URLs)
5. Or enter specific URLs like: `https://dev.stratumpr.com/`
6. Select reason: "Temporary removal" (lasts 6 months)
7. Submit

**Best Approach**: Since you've already added `noindex` tags, the dev site will stop being indexed naturally. The removal request just speeds up the process.

#### Step 2: Verify Dev Site Has noindex Tag (Most Important)
Since you can't easily verify dev.stratumpr.com in Search Console, the most important step is ensuring the noindex tag is working:

1. Visit `https://dev.stratumpr.com` in your browser
2. Right-click → **View Page Source**
3. Search for: `noindex`
4. You should see: `<meta name="robots" content="noindex, nofollow">`
5. If you see this, Google will stop indexing the dev site on its next crawl

**Note**: The noindex tag is the most effective solution. Once deployed, Google will automatically stop indexing dev.stratumpr.com within 1-2 weeks.

#### Step 3: Create robots.txt for Dev Site (Optional but Recommended)
If you have access to modify the dev deployment, add this to `public/robots.txt` on dev:
```
User-agent: *
Disallow: /
```

Or create a separate robots.txt that only applies to dev.stratumpr.com.

#### Step 4: Submit Updated Sitemap
1. In Google Search Console for `www.stratumpr.com`
2. Go to **Sitemaps**
3. Resubmit your sitemap: `https://www.stratumpr.com/sitemap.xml`
4. This helps Google discover the production site faster

#### Step 5: Request Re-indexing of Production Pages
1. In Google Search Console for `www.stratumpr.com`
2. Use **URL Inspection** tool
3. Enter your homepage: `https://www.stratumpr.com/`
4. Click **Request Indexing**
5. Repeat for key pages (About, Services, Projects, etc.)

## What the Code Does

### In `index.html`:
- Immediately checks if on dev/staging domain
- Adds `noindex, nofollow` meta tag
- Forces canonical to production URL

### In `src/utils/seo.ts`:
- Checks hostname on every SEO update
- Adds noindex for dev environments
- Ensures canonical always points to production

## Expected Timeline

- **Immediate**: Dev site will have noindex tag (prevents new indexing)
- **1-2 weeks**: Google will process removal requests
- **2-4 weeks**: Google will start preferring www.stratumpr.com
- **1-2 months**: Full transition to production URLs in search results

## Monitoring

Check Google Search Console regularly:
- Monitor indexing status of both domains
- Check for duplicate content warnings
- Verify canonical URLs are being respected
- Track which domain appears in search results

## Additional Recommendations

1. **Password Protect Dev Site** (if possible)
   - Prevents accidental indexing
   - Better security practice

2. **Use Different Content on Dev** (optional)
   - Add "Development Site" banner
   - Makes it clear to Google it's not production

3. **Monitor Backlinks**
   - Check if any external sites link to dev.stratumpr.com
   - Update those links to point to www.stratumpr.com

4. **Set Up Redirect** (if possible)
   - Redirect dev.stratumpr.com → www.stratumpr.com
   - 301 redirect tells Google which is canonical

## Verification

After deployment, verify:
1. Visit `dev.stratumpr.com` in browser
2. View page source
3. Check for: `<meta name="robots" content="noindex, nofollow">`
4. Check canonical: Should be `https://www.stratumpr.com/...`

## Need Help?

If dev.stratumpr.com still appears in search after 2-4 weeks:
1. Check Google Search Console for indexing status
2. Verify noindex tag is present on dev site
3. Check if there are external links pointing to dev
4. Consider adding password protection to dev site

