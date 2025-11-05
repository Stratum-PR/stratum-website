# 🔧 Quick Fix: Sanity Environment Variables

## The Problem

You're seeing: `Missing environment variable: NEXT_PUBLIC_SANITY_DATASET`

This is because Sanity's template uses Next.js conventions, but you're using Vite.

## The Solution (2 minutes)

### Step 1: Create `.env` File

In your project root, create a file named `.env` with these contents:

```env
# Sanity CMS Configuration
VITE_SANITY_PROJECT_ID=your_actual_project_id_here
VITE_SANITY_DATASET=production

# Resend Email Service
VITE_RESEND_API_KEY=your_resend_api_key_here
```

### Step 2: Get Your Sanity Project ID

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Click on your **Stratum PR Blog** project
3. Copy the **Project ID** (it looks like: `abc123xyz`)
4. Replace `your_actual_project_id_here` in `.env` with your actual ID

Example:
```env
VITE_SANITY_PROJECT_ID=abc123xyz
VITE_SANITY_DATASET=production
```

### Step 3: Restart Sanity Studio

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npx sanity start
```

Or if you're running from package.json:
```bash
npm run sanity
```

### Step 4: Open Studio

Go to: `http://localhost:3333`

You should now see the Sanity Studio interface! 🎉

---

## Still Having Issues?

### Issue: "Cannot find module 'sanity'"

**Fix:** Install dependencies first:
```bash
npm install @sanity/client @sanity/image-url sanity @sanity/vision
```

### Issue: "projectId is required"

**Fix:** Make sure your `.env` file has the correct `VITE_SANITY_PROJECT_ID` value (no quotes, no spaces)

### Issue: Studio loads but shows empty

**Fix:** This is normal! You haven't created any content yet. Click:
1. **"Authors"** to create your first author
2. **"Blog Posts"** to create your first post

---

## What I Fixed for You

✅ Updated `sanity.cli.ts` to use Vite env vars (`VITE_` prefix instead of `NEXT_PUBLIC_`)
✅ Created proper schema structure in `src/sanity/`
✅ Added `env.ts` for environment config
✅ Created schema types for Blog Posts and Authors
✅ Set up proper file structure

All you need to do is:
1. Create `.env` file
2. Add your Project ID
3. Restart Sanity

---

## Next Steps After Studio Works

1. **Create an Author:**
   - Name: Your name
   - Bio (English): Your bio
   - Bio (Spanish): Spanish translation
   - Upload your photo

2. **Create Your First Blog Post:**
   - Title (English): "Understanding Your Organization's IT Needs"
   - Title (Spanish): "Entendiendo las Necesidades de TI de tu Organización"
   - Slug: Click "Generate" button
   - Excerpt: Short description
   - Content: Write your post
   - Tags: Add relevant tags
   - Published At: Set date
   - Featured: Toggle on if featured

3. **Publish!**

---

## Complete `.env` Example

```env
# Replace these with your actual values:
VITE_SANITY_PROJECT_ID=abc123xyz
VITE_SANITY_DATASET=production
VITE_RESEND_API_KEY=re_xxxxxxxxxxxxx
```

**Note:** Never commit `.env` to Git! It's already in `.gitignore`

---

**You're almost there!** Just add your Project ID and restart. 🚀


