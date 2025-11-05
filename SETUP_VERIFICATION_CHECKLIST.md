# ✅ Sanity + Resend Setup Verification Checklist

Use this checklist to verify everything is properly connected and working.

---

## 📋 **Environment Variables**

- [ ] **`.env` file exists** in project root
- [ ] **`VITE_SANITY_PROJECT_ID`** is set and contains your actual Project ID
- [ ] **`VITE_SANITY_DATASET`** is set to `production`
- [ ] **`VITE_RESEND_API_KEY`** is set and contains your actual API key

**How to verify:**
```bash
# Check if .env file exists
ls -la .env

# Verify values (be careful - don't commit!)
cat .env
```

**Expected:**
```env
VITE_SANITY_PROJECT_ID=abc123xyz
VITE_SANITY_DATASET=production
VITE_RESEND_API_KEY=re_xxxxxxxxxxxxx
```

---

## 🔧 **Sanity Configuration**

- [ ] **Sanity Studio starts without errors**
- [ ] **Can access Studio at `http://localhost:3333`**
- [ ] **See "Blog Posts" and "Authors" in sidebar**
- [ ] **Created at least one Author profile**
- [ ] **Created at least one Blog Post**

**How to verify:**
```bash
# Start Sanity Studio
npx sanity start

# Should see: "Studio is running at http://localhost:3333"
```

**Test in Studio:**
1. Open `http://localhost:3333`
2. Click "Authors" → Create new author
3. Click "Blog Posts" → Create new post
4. Fill in both English and Spanish fields
5. Publish

---

## 📧 **Resend Email Service**

- [ ] **Resend account created** at resend.com
- [ ] **API key generated** and added to `.env`
- [ ] **Domain verified** (for production - can test without for dev)

**How to verify:**
1. Go to https://resend.com/api-keys
2. Confirm API key matches `.env` file
3. Check emails sent in Resend dashboard

---

## 🔗 **Blog Subscription Component**

- [ ] **Subscription form appears** on blog detail pages
- [ ] **Form accepts email input**
- [ ] **Submit button works**
- [ ] **Success message shows** after submission
- [ ] **Welcome email received** in inbox

**How to test:**
1. Navigate to any blog post (e.g., `/blog/understanding-your-organizations-it-needs`)
2. Scroll to bottom of post
3. Should see "Subscribe to Blog Updates" section
4. Enter your email
5. Click "Subscribe"
6. Should see success message
7. Check your email inbox for welcome message

**Expected behavior:**
- ✅ Form shows on page
- ✅ Loading state while submitting
- ✅ Success message: "Thanks for subscribing!"
- ✅ Welcome email arrives within seconds

---

## 📝 **Blog Posts from Sanity**

- [ ] **Blog posts from Sanity appear** on `/blog` page (if any created)
- [ ] **Can click to view Sanity posts**
- [ ] **Sanity posts display correctly** with images, content, etc.
- [ ] **Bilingual content works** (switch language toggle)

**How to test:**
1. Create a blog post in Sanity Studio
2. Navigate to `/blog` page
3. Should see your Sanity post listed
4. Click on it to view detail page
5. Test language toggle - content should switch

**Note:** Your existing hardcoded posts will still work. Both will show up.

---

## 🎯 **Checklist Email Functionality**

- [ ] **Complete IT readiness checklist**
- [ ] **Enter email for results**
- [ ] **Results email received** with score and recommendations
- [ ] **Email includes clickable links** to services, blog, consultation

**How to test:**
1. Navigate to `/checklist`
2. Answer all 10 questions
3. Enter your email
4. Click "Get Results"
5. Should see success message
6. Check email inbox
7. Verify email contains:
   - Your score (X/30)
   - Assessment level
   - Recommended next steps
   - Clickable links

---

## 🐛 **Error Checking**

### Check Browser Console
- [ ] **No errors in console** when loading blog pages
- [ ] **No errors in console** when submitting subscription
- [ ] **No errors in console** when completing checklist

**How to check:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Navigate through site
4. Look for red error messages

### Common Errors to Watch For:

**"Missing environment variable"**
- ❌ Fix: Check `.env` file exists and has correct variable names

**"Failed to send email"**
- ❌ Fix: Verify `VITE_RESEND_API_KEY` is correct
- ❌ Fix: Check Resend dashboard for API key status

**"Cannot connect to Sanity"**
- ❌ Fix: Verify `VITE_SANITY_PROJECT_ID` is correct
- ❌ Fix: Check Sanity project settings

**"Cannot find module '@/services/resend'"**
- ❌ Fix: File should exist at `src/services/resend.ts`

---

## 📊 **Component Verification**

### BlogSubscription Component
- [ ] **Located at:** `src/components/BlogSubscription.tsx`
- [ ] **Imports Resend service:** `@/services/resend`
- [ ] **Uses language context:** `useLanguage()` hook
- [ ] **Rendered in BlogDetail:** `src/pages/BlogDetail.tsx`

### Resend Service
- [ ] **Located at:** `src/services/resend.ts`
- [ ] **Has `subscribeToBlog()` function**
- [ ] **Uses `VITE_RESEND_API_KEY` environment variable**
- [ ] **Sends bilingual emails**

### Sanity Client
- [ ] **Located at:** `src/lib/sanity.ts`
- [ ] **Has `sanityClient` export**
- [ ] **Uses `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET`**
- [ ] **Has queries: `blogPostsQuery`, `blogPostBySlugQuery`**

---

## 🎨 **Visual Verification**

### Blog Detail Page
- [ ] **Subscription box visible** at bottom of post
- [ ] **Styled correctly** with primary colors
- [ ] **Email input field** works
- [ ] **Submit button** changes to "Subscribing..." when loading

### Email Appearance
- [ ] **Welcome email** has proper formatting
- [ ] **Bilingual content** displays correctly
- [ ] **Links work** in email
- [ ] **Branding consistent** (Stratum PR colors, logo mentions)

---

## 🔐 **Security Check**

- [ ] **`.env` file is in `.gitignore`**
- [ ] **No API keys committed to Git**
- [ ] **Environment variables not exposed in client-side code** (except VITE_ prefix ones which are intended)

**Verify:**
```bash
# Check .gitignore contains .env
grep "\.env" .gitignore

# Verify .env is not tracked
git status | grep .env
# Should return nothing (not in git)
```

---

## 📱 **Responsive Design**

- [ ] **Subscription form works on mobile**
- [ ] **Email displays correctly on mobile devices**
- [ ] **Blog pages responsive**

**How to test:**
1. Open DevTools
2. Toggle device toolbar (mobile view)
3. Test subscription form on small screen
4. Test on actual mobile device if possible

---

## 🌍 **Bilingual Support**

- [ ] **Subscription form text changes** when language toggled
- [ ] **Welcome emails sent in correct language**
- [ ] **Checklist results emails sent in correct language**

**How to test:**
1. Toggle language button in header
2. Navigate to blog post
3. Check subscription form text changes
4. Subscribe in English - get English email
5. Toggle to Spanish, subscribe - get Spanish email

---

## ✅ **Final Verification Steps**

### Test Complete Flow:
1. [ ] Create blog post in Sanity Studio
2. [ ] View blog post on website
3. [ ] Subscribe to blog updates
4. [ ] Receive welcome email
5. [ ] Complete IT readiness checklist
6. [ ] Receive checklist results email
7. [ ] Verify all links in emails work

### Production Readiness:
- [ ] **Domain verified in Resend** (for production)
- [ ] **CORS configured in Sanity** (add production domain)
- [ ] **Environment variables set in production** (Vercel/Netlify)
- [ ] **Sanity Studio deployed** (optional but recommended)

---

## 🎯 **Success Criteria**

Everything is working if:
- ✅ You can create blog posts in Sanity Studio
- ✅ Blog subscription form works and sends emails
- ✅ Checklist sends result emails with hyperlinks
- ✅ No console errors
- ✅ Emails arrive in inbox within seconds
- ✅ Bilingual support works
- ✅ All links in emails are clickable

---

## 🆘 **Troubleshooting**

### If subscription form doesn't appear:
1. Check `BlogSubscription` is imported in `BlogDetail.tsx`
2. Check `BlogSubscription` is rendered in JSX
3. Check browser console for errors

### If emails don't send:
1. Verify API key is correct in `.env`
2. Check Resend dashboard for errors
3. Verify domain is verified (for production)
4. Check browser network tab for API call errors

### If Sanity posts don't appear:
1. Verify posts are published (not drafts)
2. Check Sanity project ID is correct
3. Check CORS settings in Sanity
4. Verify queries in `src/lib/sanity.ts`

---

## 📞 **Need Help?**

1. Check browser console for specific errors
2. Check Resend dashboard → Emails tab for delivery status
3. Check Sanity Studio → Content tab for published posts
4. Review setup guides:
   - `SANITY_RESEND_SETUP.md` - Full setup guide
   - `QUICK_REFERENCE.md` - Quick commands
   - `ENV_SETUP.md` - Environment variable setup

---

**Once all items are checked ✅, your blog and email system is fully functional!** 🎉


