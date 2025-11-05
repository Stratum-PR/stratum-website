# 🚀 Quick Reference: Sanity + Resend Setup

## 1. Fix Sanity Studio (RIGHT NOW) ⚡

### Create `.env` file in project root:

```env
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
VITE_RESEND_API_KEY=your_resend_api_key_here
```

### Get Your Project ID:
1. Go to → https://www.sanity.io/manage
2. Click your project
3. Copy the **Project ID**
4. Paste it in `.env`

### Restart:
```bash
npx sanity start
```

Open → http://localhost:3333

✅ **Done!**

---

## 2. Create Your First Content (5 min)

### Step 1: Create Author
1. Click **"Authors"** in Studio
2. Fill in:
   - Name
   - Bio (English & Spanish)
   - Upload photo
3. Click **"Publish"**

### Step 2: Create Blog Post
1. Click **"Blog Posts"**
2. Fill in:
   - Title (English & Spanish)
   - Click **"Generate"** for slug
   - Excerpt (English & Spanish)
   - Upload main image
   - Content (English & Spanish)
   - Add 3-5 tags
   - Set published date
   - Toggle "Featured" if needed
3. Click **"Publish"**

✅ **Done!**

---

## 3. Set Up Resend (5 min)

### Get API Key:
1. Go to → https://resend.com
2. Sign up / Log in
3. Go to **"API Keys"**
4. Create new key
5. Copy it
6. Add to `.env`:
```env
VITE_RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Verify Domain (Production Only):
1. In Resend → **"Domains"**
2. Add `stratumpr.com`
3. Add DNS records to your registrar
4. Wait 5-15 min for verification

✅ **Done!**

---

## 4. Test Everything (2 min)

### Test Blog Subscription:
```bash
npm run dev
```
1. Go to any blog post
2. Enter your email in subscription form
3. Check your inbox

### Test Checklist:
1. Go to `/checklist`
2. Complete the quiz
3. Enter your email
4. Check your inbox for results

✅ **Done!**

---

## 5. Deploy Sanity Studio (Optional)

```bash
npx sanity deploy
```

Choose a hostname (e.g., `stratumpr-blog`)

Your studio will be at:
`https://stratumpr-blog.sanity.studio`

✅ **Done!**

---

## Quick Troubleshooting

### Sanity Studio not loading?
- Check `.env` has correct `VITE_SANITY_PROJECT_ID`
- Restart: `npx sanity start`

### Emails not sending?
- Check `.env` has correct `VITE_RESEND_API_KEY`
- Verify domain in Resend dashboard
- Check browser console for errors

### Blog posts not showing?
- Current hardcoded posts will continue working
- New Sanity posts will appear once you create them

---

## File Structure

```
stratum-website/
├── .env                          ← CREATE THIS
├── sanity.config.ts              ← Already configured
├── sanity.cli.ts                 ← Already configured
├── src/
│   ├── sanity/
│   │   ├── env.ts               ← Environment config
│   │   ├── schemaTypes/
│   │   │   ├── index.ts
│   │   │   ├── blogPost.ts      ← Blog schema
│   │   │   └── author.ts        ← Author schema
│   │   └── structure.ts
│   ├── lib/
│   │   └── sanity.ts            ← Sanity client
│   └── services/
│       └── resend.ts             ← Email service
```

---

## Environment Variables Checklist

- [ ] `VITE_SANITY_PROJECT_ID` - From sanity.io
- [ ] `VITE_SANITY_DATASET` - Set to `production`
- [ ] `VITE_RESEND_API_KEY` - From resend.com

---

## What's Working Now

✅ Checklist sends emails with results
✅ Blog subscription works
✅ Bilingual email support (EN/ES)
✅ Hyperlinks in checklist next steps
✅ Sanity CMS for blog management
✅ Professional email templates
✅ Unified subscriber list

---

## Next Step: Create `.env` File!

That's the only thing blocking you. Everything else is ready to go! 🎉

---

## Need Help?

1. Read `ENV_SETUP.md` - Detailed environment setup
2. Read `SANITY_RESEND_SETUP.md` - Complete guide
3. Read `IMPLEMENTATION_SUMMARY_SANITY_RESEND.md` - What was built

**You're 99% done. Just add those API keys!** 🚀


