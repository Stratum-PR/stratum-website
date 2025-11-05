# Vercel Environment Variables Required

This file documents the environment variables that must be set in Vercel for the website to function correctly.

## Required Environment Variables

### Sanity.io Configuration
The following variables are **required** for the blog to work:

- `VITE_SANITY_PROJECT_ID` - Your Sanity project ID (found in your Sanity dashboard)
- `VITE_SANITY_DATASET` - Your Sanity dataset name (usually `production`)

### Resend Email Service
The following variables are **required** for email functionality (blog subscriptions, checklist results):

- `RESEND_API_KEY` - Your Resend API key (from resend.com)
- `FROM_EMAIL` - Email address to send from (e.g., `contact@stratumpr.com`)
- `ADMIN_EMAIL` - Email address to receive notifications (e.g., `contact@stratumpr.com`)

## How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - **Key**: The variable name (e.g., `VITE_SANITY_PROJECT_ID`)
   - **Value**: The actual value
   - **Environment**: Select `Production`, `Preview`, and/or `Development` as needed
4. Click **Save**
5. **Important**: After adding/updating environment variables, you must redeploy your application for changes to take effect

## Verification

After deploying with environment variables:
- Check the browser console for Sanity configuration logs
- The blog should load posts from Sanity
- Email forms should work without errors

## Troubleshooting

If the blog doesn't appear:
1. Check Vercel build logs for errors
2. Open browser console on dev.stratumpr.com and look for Sanity configuration logs
3. Verify environment variables are set for the correct environment (Production/Preview)
4. Ensure you've redeployed after adding environment variables

