# Vercel Environment Variables Setup Guide

This guide will walk you through setting up environment variables in Vercel for both production and development branches.

## Understanding Vercel Environments

Vercel has three environment types that map to your branches:

- **Production**: Deploys from your main/master branch (usually `main` or `master`)
  - This is your live website (e.g., `stratumpr.com`)
  
- **Preview**: Deploys from all other branches (feature branches, PR branches, etc.)
  - Preview URLs look like: `your-project-git-branch-username.vercel.app`
  - Used for testing before merging to production
  
- **Development**: Deploys when you run `vercel dev` locally
  - Only used for local development with Vercel CLI

## Step-by-Step Setup

### Step 1: Access Your Vercel Project

1. Go to [vercel.com](https://vercel.com) and log in
2. Navigate to your project dashboard
3. Find your project (e.g., "stratum-website" or similar)

### Step 2: Navigate to Environment Variables

1. Click on your project
2. Go to **Settings** (in the top navigation)
3. Click on **Environment Variables** in the left sidebar

### Step 3: Add Sanity Configuration Variables

You'll need to add these variables for Sanity to work:

#### Variable 1: VITE_SANITY_PROJECT_ID

1. Click **Add New** or **Create**
2. Enter the following:
   - **Key**: `VITE_SANITY_PROJECT_ID`
   - **Value**: `s7h6olb5` (your Sanity project ID)
   - **Environment**: Select **ALL THREE** checkboxes:
     - ✅ Production
     - ✅ Preview  
     - ✅ Development
3. Click **Save**

#### Variable 2: VITE_SANITY_DATASET

1. Click **Add New** again
2. Enter the following:
   - **Key**: `VITE_SANITY_DATASET`
   - **Value**: `production`
   - **Environment**: Select **ALL THREE** checkboxes:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
3. Click **Save**

### Step 4: Add Optional Email Variables (if needed)

If you're using the email functionality (blog subscriptions, contact forms), add these:

#### Variable 3: RESEND_API_KEY (if needed)

1. Click **Add New**
2. Enter:
   - **Key**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (from resend.com)
   - **Environment**: Select Production, Preview, and Development as needed
3. Click **Save**

#### Variable 4: FROM_EMAIL (if needed)

1. Click **Add New**
2. Enter:
   - **Key**: `FROM_EMAIL`
   - **Value**: `contact@stratumpr.com` (or your sending email)
   - **Environment**: Select Production, Preview, and Development as needed
3. Click **Save**

#### Variable 5: ADMIN_EMAIL (if needed)

1. Click **Add New**
2. Enter:
   - **Key**: `ADMIN_EMAIL`
   - **Value**: `contact@stratumpr.com` (or your receiving email)
   - **Environment**: Select Production, Preview, and Development as needed
3. Click **Save**

### Step 5: Verify Your Variables

After adding all variables, you should see a list like this:

```
VITE_SANITY_PROJECT_ID     s7h6olb5          Production, Preview, Development
VITE_SANITY_DATASET        production        Production, Preview, Development
RESEND_API_KEY             •••••••••••       Production, Preview, Development
FROM_EMAIL                 contact@...       Production, Preview, Development
ADMIN_EMAIL                contact@...        Production, Preview, Development
```

### Step 6: Redeploy Your Application

**IMPORTANT**: Environment variables only take effect on new deployments!

1. Go to the **Deployments** tab in your Vercel project
2. Find your latest deployment
3. Click the **⋯** (three dots) menu
4. Select **Redeploy**
5. Confirm the redeployment

OR

- Push a new commit to trigger a new deployment:
  ```bash
  git commit --allow-empty -m "Trigger redeploy with new env vars"
  git push
  ```

## Testing Your Setup

### For Production Branch

1. Make sure your `main` (or `master`) branch is set as the production branch
2. After redeploying, visit your production URL
3. Open browser console (F12) and look for:
   ```
   🔍 Sanity Client Config: { projectId: "s7h6...", dataset: "production", ... }
   ```
4. Navigate to your blog page - it should load posts from Sanity

### For Development/Preview Branches

1. Create a new branch or use an existing feature branch
2. Push it to GitHub/GitLab/Bitbucket
3. Vercel will automatically create a preview deployment
4. Visit the preview URL
5. Test that the blog loads correctly
6. Check the browser console for Sanity config logs

## Environment-Specific Configuration

If you need different values for different environments:

### Example: Different Datasets

- **Production**: `VITE_SANITY_DATASET=production`
- **Preview/Development**: `VITE_SANITY_DATASET=development`

To set this up:
1. Add the variable twice with different values
2. Set one for Production only
3. Set another for Preview + Development only

### Example: Different Project IDs (not recommended)

If you have separate Sanity projects for dev/prod:
- Production: `VITE_SANITY_PROJECT_ID=prod_project_id`
- Preview: `VITE_SANITY_PROJECT_ID=dev_project_id`

## Troubleshooting

### Variables Not Working?

1. **Check the environment**: Make sure variables are set for the correct environment (Production/Preview/Development)
2. **Redeploy**: Variables only work on new deployments - redeploy after adding them
3. **Check variable names**: Must be exactly `VITE_SANITY_PROJECT_ID` (case-sensitive)
4. **Check Vercel logs**: Go to Deployments → Click on a deployment → View build logs
5. **Browser console**: Check for Sanity configuration errors in the browser console

### Blog Not Loading?

1. Open browser console (F12)
2. Look for errors starting with `❌ CRITICAL: VITE_SANITY_PROJECT_ID is missing!`
3. Check that variables are set for the correct environment
4. Verify the project ID is correct: `s7h6olb5`
5. Check that the dataset name matches: `production`

### Build Fails?

1. Check Vercel build logs for errors
2. Verify all required environment variables are set
3. Make sure variable names don't have typos
4. Check that values don't have extra spaces or quotes

## Quick Reference

### Required Variables (Minimum)

```
VITE_SANITY_PROJECT_ID=s7h6olb5
VITE_SANITY_DATASET=production
```

### Optional Variables (if using email)

```
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=contact@stratumpr.com
ADMIN_EMAIL=contact@stratumpr.com
```

## Next Steps

After setting up environment variables:

1. ✅ Redeploy your application
2. ✅ Test the blog on production
3. ✅ Test the blog on a preview deployment
4. ✅ Verify Sanity Studio works at `/studio` route
5. ✅ Check browser console for any errors

## Need Help?

- Vercel Documentation: https://vercel.com/docs/concepts/projects/environment-variables
- Sanity Documentation: https://www.sanity.io/docs
- Check your project's `VERCEL_ENV_VARS.md` for project-specific notes

