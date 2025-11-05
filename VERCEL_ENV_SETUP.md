# Vercel Environment Variables Setup

If you're seeing a **blank white page** on `dev.stratumpr.com`, it's likely because environment variables are missing in Vercel.

## Required Environment Variables

Add these in your **Vercel Dashboard** → **Project Settings** → **Environment Variables**:

### Sanity CMS (Required for Blog)
```
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=production
```

**To find your Sanity Project ID:**
1. Go to https://www.sanity.io/manage
2. Click on your project
3. Copy the Project ID (looks like: `abc123xyz`)

### Resend Email Service (Required for Email Subscriptions)
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=contact@stratumpr.com
ADMIN_EMAIL=your_admin_email@example.com
```

**Note:** 
- `RESEND_API_KEY` does NOT have `VITE_` prefix (server-side only)
- `FROM_EMAIL` and `ADMIN_EMAIL` do NOT have `VITE_` prefix (server-side only)
- `VITE_SANITY_*` variables DO have `VITE_` prefix (client-side)

## After Adding Variables

1. **Redeploy** your project in Vercel
2. Environment variables are applied during build
3. The site should load correctly after redeployment

## Troubleshooting

- **Blank page**: Check browser console (F12) for errors
- **Blog not loading**: Verify `VITE_SANITY_PROJECT_ID` is set
- **Email not working**: Verify `RESEND_API_KEY` is set (without `VITE_` prefix)

## Environment Variable Prefixes

- **`VITE_` prefix**: Exposed to browser (client-side)
  - `VITE_SANITY_PROJECT_ID`
  - `VITE_SANITY_DATASET`

- **No prefix**: Server-side only (secure)
  - `RESEND_API_KEY`
  - `FROM_EMAIL`
  - `ADMIN_EMAIL`

