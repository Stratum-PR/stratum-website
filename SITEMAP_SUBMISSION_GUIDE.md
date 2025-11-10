# Sitemap Submission Guide

Quick guide to submit your updated sitemap to Google Search Console and Bing Webmaster Tools.

---

## Step 1: Submit to Google Search Console

1. **Go to Google Search Console**
   - Visit: https://search.google.com/search-console
   - Sign in with your Google account

2. **Select Your Property**
   - If you haven't added your website yet:
     - Click "Add Property"
     - Enter: `https://www.stratumpr.com`
     - Choose verification method (HTML file, DNS, HTML tag, etc.)
     - Follow the verification steps
   - If already added, select `https://www.stratumpr.com` from the property list

3. **Navigate to Sitemaps**
   - In the left sidebar, click **"Sitemaps"** (under "Indexing")

4. **Submit Your Sitemap**
   - In the "Add a new sitemap" field, enter:
     ```
     sitemap.xml
     ```
   - Click **"Submit"**

5. **Verify Submission**
   - You should see your sitemap appear in the list
   - Status will show "Success" once Google has processed it (may take a few minutes to hours)

**What to Expect:**
- Initial processing: 1-2 hours
- Full indexing: Can take days to weeks depending on site size
- Google will automatically re-crawl your sitemap periodically

---

## Step 2: Submit to Bing Webmaster Tools

1. **Go to Bing Webmaster Tools**
   - Visit: https://www.bing.com/webmasters
   - Sign in with your Microsoft account (or create one)

2. **Add Your Site**
   - If you haven't added your website yet:
     - Click "Add a site"
     - Enter: `https://www.stratumpr.com`
     - Click "Add"
     - Choose verification method:
       - **Recommended**: "Add a meta tag to your homepage" (easiest)
       - Or: "Import from Google Search Console" (if you've already verified there)
     - Follow the verification steps
   - If already added, select your site from the dashboard

3. **Navigate to Sitemaps**
   - In the left sidebar, click **"Sitemaps"**

4. **Submit Your Sitemap**
   - Click **"Submit Sitemap"** button
   - Enter:
     ```
     https://www.stratumpr.com/sitemap.xml
     ```
   - Click **"Submit"**

5. **Verify Submission**
   - Your sitemap should appear in the list
   - Status will show "Success" once processed

**What to Expect:**
- Initial processing: 1-2 hours
- Full indexing: Can take days to weeks
- Bing will automatically re-crawl periodically

---

## Step 3: Verify Your Sitemap is Working

Before submitting, make sure your sitemap is accessible:

1. **Test the Sitemap URL**
   - Visit: `https://www.stratumpr.com/sitemap.xml`
   - You should see XML content with all your URLs
   - Check that it includes:
     - Static pages (home, about, services, etc.)
     - Project pages (from Sanity)
     - Blog post pages (from Sanity)

2. **Validate the XML**
   - Visit: https://www.xml-sitemaps.com/validate-xml-sitemap.html
   - Enter: `https://www.stratumpr.com/sitemap.xml`
   - Click "Validate"
   - Should show "Valid" if everything is correct

3. **Check in Browser**
   - Open: `https://www.stratumpr.com/sitemap.xml`
   - Should display as formatted XML
   - Count the `<url>` tags to see how many pages are included

---

## Quick Reference

### Sitemap URL
```
https://www.stratumpr.com/sitemap.xml
```

### Google Search Console
- URL: https://search.google.com/search-console
- Sitemap location: Left sidebar → Sitemaps

### Bing Webmaster Tools
- URL: https://www.bing.com/webmasters
- Sitemap location: Left sidebar → Sitemaps

### Validation Tool
- XML Validator: https://www.xml-sitemaps.com/validate-xml-sitemap.html

---

## Troubleshooting

### Sitemap Not Found (404 Error)
- Check that the route is set up in `src/App.tsx`
- Verify the Sitemap component is properly exported
- Check browser console for errors

### Sitemap Shows Old/Static Data
- Make sure Sanity environment variables are set
- Check browser console for Sanity fetch errors
- Verify projects exist in Sanity Studio with `publishedAt` dates

### Google/Bing Can't Access Sitemap
- Make sure `robots.txt` allows crawling
- Check that the sitemap URL is accessible (not behind authentication)
- Verify the URL format is correct (no trailing slash)

---

## Important Notes

- **Verification**: You may need to verify site ownership first (HTML tag, DNS, or file upload)
- **Processing Time**: Initial processing takes 1-2 hours; full indexing can take days
- **Auto-Updates**: Both platforms will re-crawl your sitemap periodically, so you don't need to resubmit for every new post

The sitemap will automatically update as you add new projects and blog posts to Sanity!

