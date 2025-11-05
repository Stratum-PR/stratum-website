# Sanity.io & Resend Integration Setup Guide

This guide will help you set up Sanity.io for blog management and Resend for email services.

## Prerequisites

- Node.js 18+ installed
- Stratum website repository cloned
- Access to create accounts on Sanity.io and Resend

---

## Part 1: Sanity.io Setup (Blog CMS)

### Step 1: Create Sanity Account & Project

1. Go to [sanity.io](https://www.sanity.io/) and create a free account
2. Create a new project:
   - Project name: **Stratum PR Blog**
   - Dataset: **production**
3. Note your **Project ID** (you'll find it in project settings)

### Step 2: Install Sanity Dependencies

```bash
cd /path/to/stratum-website
npm install @sanity/client @sanity/image-url sanity @sanity/vision
```

### Step 3: Configure Environment Variables

Create or update `.env` file in your project root:

```env
# Sanity Configuration
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production

# Resend Configuration  
VITE_RESEND_API_KEY=your_resend_api_key_here
```

### Step 4: Initialize Sanity Studio

```bash
# Run Sanity Studio locally
npx sanity init
```

When prompted:
- Use existing project: **Yes**
- Select your Stratum PR Blog project
- Dataset: **production**
- Output path: **./studio** (or keep default)

### Step 5: Start Sanity Studio

```bash
# In a separate terminal window
npm run sanity
```

Or manually:
```bash
cd studio
npx sanity start
```

The studio will open at `http://localhost:3333`

### Step 6: Create Your First Blog Post

1. Open `http://localhost:3333`
2. Click "Author" and create an author profile (yourself)
3. Click "Blog Post" and create a new post:
   - **Title (English):** Your post title
   - **Title (Spanish):** Spanish translation
   - **Slug:** URL-friendly version (e.g., "understanding-it-needs")
   - **Excerpt (English):** Short description
   - **Excerpt (Spanish):** Spanish description
   - **Main Image:** Upload a relevant image
   - **Content (English):** Write your blog content
   - **Content (Spanish):** Spanish translation
   - **Tags:** Add relevant tags
   - **Published At:** Set publication date
   - **Featured Post:** Toggle if you want it featured

4. Click **Publish**

### Step 7: Deploy Sanity Studio (Optional but Recommended)

```bash
cd studio
npx sanity deploy
```

Choose a studio hostname (e.g., `stratumpr-blog`). Your studio will be available at:
`https://stratumpr-blog.sanity.studio`

---

## Part 2: Resend Email Service Setup

### Step 1: Create Resend Account

1. Go to [resend.com](https://resend.com/)
2. Sign up for a free account
3. Verify your email

### Step 2: Get API Key

1. Go to **API Keys** in the Resend dashboard
2. Click **Create API Key**
3. Name it "Stratum Website"
4. Copy the API key
5. Add it to your `.env` file:

```env
VITE_RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

### Step 3: Verify Your Domain (Production)

For production use, you need to verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter: `stratumpr.com`
4. Add the provided DNS records to your domain registrar:
   - SPF record
   - DKIM records
   - DMARC record (optional but recommended)

5. Wait for verification (usually 5-15 minutes)

### Step 4: Update "From" Email

Once domain is verified, update the `from` email in:
`src/services/resend.ts`

```typescript
from: 'Stratum PR <hello@stratumpr.com>',
```

---

## Part 3: Testing Email Functionality

### Test Blog Subscription

1. Start your development server:
```bash
npm run dev
```

2. Navigate to any blog post
3. Scroll to the subscription form
4. Enter your email and subscribe
5. Check your inbox for the welcome email

### Test Checklist Results

1. Navigate to `/checklist`
2. Complete the IT readiness quiz
3. Enter your email at the end
4. Check your inbox for detailed results

---

## Part 4: Managing Blog Subscribers

### Option A: Manual Management

Resend automatically stores all sent emails in the dashboard:
1. Go to Resend dashboard
2. Click **Emails** to see all sent emails
3. Export recipient list as needed

### Option B: Use Resend Audiences (Recommended)

1. In Resend dashboard, go to **Audiences**
2. Create a new audience: "Blog Subscribers"
3. Create another: "Checklist Participants"

Update `src/services/resend.ts` to add contacts to audiences:

```typescript
// After successful subscription
await fetch('https://api.resend.com/audiences/{audience_id}/contacts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${RESEND_API_KEY}`
  },
  body: JSON.stringify({
    email: email,
    first_name: '', // Optional
    last_name: '', // Optional
  })
})
```

---

## Part 5: Sending Blog Post Notifications

When you publish a new blog post:

1. Go to Resend dashboard
2. Click **Broadcasts**
3. Create new broadcast
4. Select "Blog Subscribers" audience
5. Create your email (or use the template function)
6. Send!

### Or Automate with Code:

```typescript
import { sendBlogNotification } from '@/services/resend'

// When new post is published
await sendBlogNotification(
  subscriberEmails,  // Array of subscriber emails
  'Post Title',
  'Post excerpt...',
  'post-slug',
  'en'  // or 'es'
)
```

---

## Part 6: Production Deployment Checklist

### Environment Variables

Make sure these are set in your production environment (Vercel/Netlify):

```env
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_RESEND_API_KEY=your_resend_api_key
```

### Sanity Studio Deployment

```bash
cd studio
npx sanity deploy
```

### Update CORS Settings

1. Go to Sanity project settings
2. Add your production domain to **CORS Origins**:
   - `https://www.stratumpr.com`
   - `https://stratumpr.com`

### Resend Domain Verification

1. Ensure domain is verified in Resend
2. Update `from` email to use your domain
3. Test sending from production

---

## Part 7: Content Management Workflow

### Adding New Blog Posts

1. Open Sanity Studio (`https://stratumpr-blog.sanity.studio`)
2. Click **Blog Post** → **Create**
3. Fill in English content
4. Fill in Spanish translation
5. Add images and tags
6. Set publish date
7. Click **Publish**

### Blog Post Best Practices

1. **SEO-friendly slugs:** Use lowercase with hyphens
2. **Engaging excerpts:** 150-200 characters
3. **Quality images:** Minimum 1200x630px for social sharing
4. **Tags:** Use 3-5 relevant tags
5. **Bilingual:** Always provide both English and Spanish versions

### Email Best Practices

1. **Subject lines:** Keep under 50 characters
2. **Preview text:** First 100 characters matter
3. **Mobile-first:** Most readers on mobile
4. **Clear CTA:** One primary call-to-action
5. **Test first:** Send test email before broadcasting

---

## Troubleshooting

### Sanity Issues

**Problem:** Can't connect to Sanity
**Solution:** Check that `VITE_SANITY_PROJECT_ID` is correct in `.env`

**Problem:** No blog posts showing
**Solution:** Ensure posts are published (not drafts) in Sanity Studio

### Resend Issues

**Problem:** Emails not sending
**Solution:** 
- Check API key is correct
- Verify domain in Resend dashboard
- Check console for errors

**Problem:** Emails going to spam
**Solution:**
- Complete domain verification (SPF, DKIM, DMARC)
- Don't use spam trigger words
- Maintain good sender reputation

### Development Issues

**Problem:** Changes not reflecting
**Solution:**
- Clear browser cache
- Restart development server
- Check console for errors

---

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Resend Documentation](https://resend.com/docs)
- [Sanity GROQ Query Language](https://www.sanity.io/docs/groq)
- [Email Best Practices](https://resend.com/docs/send-with-best-practices)

---

## Support

For implementation help:
- Check console logs for specific errors
- Review Sanity Studio for content issues
- Check Resend dashboard for email delivery status

---

## Next Steps

1. ✅ Complete Sanity setup
2. ✅ Create your first blog post
3. ✅ Configure Resend and verify domain
4. ✅ Test email functionality
5. ✅ Migrate existing blog posts to Sanity
6. ✅ Set up regular content publishing schedule
7. ✅ Monitor email engagement metrics

---

**Ready to go!** 🚀 Your blog and email system is now fully integrated and ready for production use.


