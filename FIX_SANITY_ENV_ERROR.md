# 🔧 Quick Fix: Sanity Environment Variable Error

## The Problem

You're seeing:
```
Missing environment variable: NEXT_PUBLIC_SANITY_DATASET
```

This happens because Sanity Studio runs in Node.js and needs environment variables from `.env` file.

---

## ✅ **The Fix (2 Steps)**

### Step 1: Create/Update `.env` File

Create a `.env` file in your project root (same folder as `package.json`) with:

```env
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
VITE_RESEND_API_KEY=your_resend_api_key_here
```

**Replace `your_project_id_here` with your actual Sanity Project ID**

Get your Project ID:
1. Go to https://www.sanity.io/manage
2. Click on your project
3. Copy the Project ID (looks like: `s7h6olb5` or `abc123xyz`)

Example:
```env
VITE_SANITY_PROJECT_ID=s7h6olb5
VITE_SANITY_DATASET=production
VITE_RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Step 2: Restart Sanity Studio

```bash
# Stop the current server (Ctrl+C if running)
# Then restart:
npx sanity start
```

**That's it!** The error should be gone.

---

## 🔍 **Why This Happens**

Sanity Studio runs in Node.js (not browser), so it needs:
- Environment variables available in `process.env`
- `.env` file in the project root
- Variables to be loaded before Studio starts

I've already fixed the code to handle this - you just need to create the `.env` file with your Project ID.

---

## ✅ **Verification**

After fixing:

1. **Check Sanity Studio loads:**
   ```bash
   npx sanity start
   ```
   Should see: "Studio is running at http://localhost:3333"

2. **Open in browser:**
   - Go to http://localhost:3333
   - Should see Sanity Studio (no errors)
   - Should see "Blog Posts" and "Authors" in sidebar

---

## 📝 **Quick Checklist**

- [ ] `.env` file exists in project root
- [ ] `VITE_SANITY_PROJECT_ID` is set (with your actual ID)
- [ ] `VITE_SANITY_DATASET` is set to `production`
- [ ] Restarted Sanity Studio after creating `.env`

---

## 🐛 **Still Having Issues?**

### Error: "Cannot find module '@/services/resend'"
**Fix:** This is a different issue - your main website might have import path problems.

### Error: "Project ID is required"
**Fix:** Make sure your `.env` file has `VITE_SANITY_PROJECT_ID=` (not empty, no quotes)

### Error: Still seeing NEXT_PUBLIC errors
**Fix:** 
1. Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
2. Restart Sanity Studio completely
3. Make sure `.env` file is in the project root (not in a subfolder)

### Sanity Studio loads but shows "No content"
**Fix:** This is normal! You need to create content first:
1. Click "Authors" → Create author
2. Click "Blog Posts" → Create blog post

---

## 💡 **Pro Tips**

1. **Use `.env.local` instead of `.env`:**
   - Some systems prefer `.env.local`
   - Both work, but `.env.local` is usually gitignored automatically

2. **Verify variables are loaded:**
   ```bash
   # Check if .env is being read (Node.js)
   node -e "require('dotenv').config(); console.log(process.env.VITE_SANITY_PROJECT_ID)"
   ```

3. **Check file location:**
   - `.env` must be in project root (same folder as `package.json`)
   - NOT in `src/` or `sanity/` folders

---

## 🎯 **Next Steps**

Once Sanity Studio loads:
1. Create an Author profile
2. Create your first Blog Post
3. Publish it
4. Check it appears on your website!

---

**You're all set!** Just add that Project ID to `.env` and restart. 🚀


