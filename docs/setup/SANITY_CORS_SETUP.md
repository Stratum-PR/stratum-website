# Sanity CORS Configuration for Production

If you're getting "Failed to load blog posts" on `dev.stratumpr.com`, you need to configure CORS (Cross-Origin Resource Sharing) in your Sanity project.

## Why CORS is Needed

When using Sanity's CDN (which is enabled in production for better performance), your production domain needs to be allowed to make requests to Sanity's API. This is a security feature.

## How to Configure CORS in Sanity

### Step 1: Go to Sanity Dashboard

1. Visit [sanity.io/manage](https://sanity.io/manage)
2. Log in to your account
3. Select your project (Project ID: `s7h6olb5`)

### Step 2: Navigate to API Settings

1. Click on **Settings** in the top navigation
2. Click on **API** in the left sidebar
3. Scroll down to **CORS origins**

### Step 3: Add Your Production Domain

Add the following origins (one per line):

```
https://dev.stratumpr.com
https://www.stratumpr.com
https://stratumpr.com
```

**Important**: 
- Include the `https://` protocol
- Don't include trailing slashes
- Add each domain on a separate line

### Step 4: Save Changes

Click **Save** at the bottom of the page.

### Step 5: Wait and Test

- CORS changes can take a few minutes to propagate
- Wait 2-5 minutes after saving
- Clear your browser cache
- Test the blog page again

## Alternative: Use Direct API (No CORS Required)

If you don't want to configure CORS, you can modify the code to use the direct API instead of CDN. This is slower but works without CORS configuration.

**To use Direct API:**

Edit `src/lib/sanity.ts` and change:
```typescript
useCdn: import.meta.env.PROD,
```

To:
```typescript
useCdn: false, // Always use direct API
```

**Note**: Direct API is slower but works everywhere without CORS configuration.

## Troubleshooting

### Still Getting Errors?

1. **Check Environment Variables in Vercel:**
   - Go to Vercel → Your Project → Settings → Environment Variables
   - Verify `VITE_SANITY_PROJECT_ID` is set to `s7h6olb5`
   - Verify `VITE_SANITY_DATASET` is set to `production`
   - Make sure they're set for **Production** environment

2. **Check Browser Console:**
   - Open dev tools (F12) on `dev.stratumpr.com`
   - Look for errors in the Console tab
   - Look for the Sanity config log: `🔍 Sanity Client Config:`
   - Check if `projectId` shows as "MISSING"

3. **Verify Sanity Project:**
   - Make sure your Sanity project ID is correct: `s7h6olb5`
   - Make sure you have published blog posts in Sanity Studio
   - Check that posts have a `publishedAt` date set

4. **Test CORS Configuration:**
   - Open browser console on your production site
   - Look for CORS errors (they usually mention "CORS policy" or "Access-Control-Allow-Origin")
   - If you see CORS errors, the domain isn't configured correctly in Sanity

## Quick Test

After configuring CORS, test by opening the browser console on `dev.stratumpr.com` and looking for:

```
🔍 Sanity Client Config: { projectId: "s7h6...", dataset: "production", ... }
📡 Using Sanity CDN (requires CORS configuration for dev.stratumpr.com)
📡 Fetching blog posts from Sanity...
✅ Fetched posts: X
```

If you see these logs, it's working! If not, check the error messages.

