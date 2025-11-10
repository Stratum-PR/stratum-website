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
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property (add `dev.stratumpr.com` if not already added)
3. Go to **Removals** → **New Request**
4. Enter: `dev.stratumpr.com/*`
5. Select "Remove all URLs with this prefix"
6. Submit the request

#### Step 2: Add dev.stratumpr.com to Google Search Console
1. Add `dev.stratumpr.com` as a property in Google Search Console
2. Verify ownership
3. Go to **Settings** → **Crawling** → **robots.txt Tester**
4. Ensure robots.txt allows crawling (for the noindex to work)

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

