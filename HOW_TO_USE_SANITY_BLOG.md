# 📝 How to Use Sanity for Blog Posts

## Overview

You now have TWO ways to manage blog posts:

1. **Hardcoded Posts** (current) - Blog posts defined in code
2. **Sanity CMS** (new) - Blog posts managed via Studio

Both will work simultaneously. You can gradually migrate to Sanity or keep both.

---

## Option 1: Continue Using Hardcoded Posts

Your existing blog posts are in:
- `src/data/blog/itNeedsPost.ts`
- `src/data/blog/erpPost.ts`
- `src/data/blog/dataPracticesPost.ts`

These will continue to work as-is. No changes needed.

---

## Option 2: Use Sanity CMS (Recommended)

### Advantages:
✅ No coding required to add posts
✅ Bilingual content management
✅ Rich text editor
✅ Image management
✅ Publish scheduling
✅ Tag management
✅ Team collaboration

---

## Creating Blog Posts in Sanity

### Step 1: Access Sanity Studio

**Local:**
```bash
npx sanity start
```
Open: http://localhost:3333

**Deployed:**
```bash
npx sanity deploy
```
Access: https://your-hostname.sanity.studio

### Step 2: Create Author (First Time Only)

1. Click **"Authors"** in left sidebar
2. Click **"+ Create"**
3. Fill in:
   - **Name:** Your name (e.g., "Genesis Rodriguez")
   - **Slug:** Click "Generate" (creates URL-friendly version)
   - **Image:** Upload profile photo
   - **Bio (English):** Short bio about you
   - **Bio (Spanish):** Spanish translation
4. Click **"Publish"**

### Step 3: Create Blog Post

1. Click **"Blog Posts"** in left sidebar
2. Click **"+ Create"**
3. Fill in all fields:

#### Basic Info:
- **Title (English):** Your post title
- **Title (Spanish):** Spanish translation
- **Slug:** Click "Generate" (creates URL from title)
- **Author:** Select your author profile

#### Content Preview:
- **Excerpt (English):** 150-200 character summary
- **Excerpt (Spanish):** Spanish translation
- **Main Image:** Upload featured image (min 1200x630px)

#### Main Content:
- **Content (English):** Write your article
  - Use the rich text editor
  - Add headings, lists, bold, italic
  - Insert images inline
  - Add links
- **Content (Spanish):** Spanish translation

#### Metadata:
- **Tags:** Add 3-5 relevant tags (press Enter after each)
- **Published At:** Set publication date/time
- **Featured Post:** Toggle ON for homepage feature

4. Click **"Publish"**

---

## Fetching Sanity Posts in Your Website

### Current Implementation:

The website currently uses hardcoded posts. To display Sanity posts, you have two options:

### Option A: Keep Both (Recommended for Now)

Keep your existing hardcoded posts and manually add Sanity posts to the code when needed.

### Option B: Fetch from Sanity Dynamically

Update `src/pages/Blog.tsx` to fetch from Sanity:

```typescript
import { useState, useEffect } from 'react';
import { sanityClient, blogPostsQuery } from '@/lib/sanity';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(blogPostsQuery)
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  // Rest of your component...
}
```

---

## Content Guidelines

### Title Best Practices:
- Clear and descriptive
- 50-60 characters
- Include relevant keywords
- Same meaning in both languages

### Excerpt Best Practices:
- 150-200 characters
- Compelling summary
- Include benefit/hook
- Complete thought

### Content Best Practices:
- Use headings (H2, H3) for structure
- Short paragraphs (2-3 sentences)
- Bullet points for lists
- Bold key concepts
- Add relevant images
- Include actionable takeaways

### Tag Best Practices:
- Use 3-5 tags per post
- Be consistent across posts
- Use lowercase
- Categories: "data analytics", "ai automation", "erp", "business intelligence"

### Image Best Practices:
- Minimum 1200x630px (optimal for social sharing)
- High quality, relevant images
- Compress before uploading (use tinypng.com)
- Add descriptive alt text

---

## Publishing Workflow

### Draft → Review → Publish

1. **Create Draft:**
   - Fill in all English content
   - Save as draft (don't publish yet)

2. **Add Translations:**
   - Fill in all Spanish content
   - Double-check translations

3. **Review:**
   - Preview post
   - Check images load correctly
   - Verify links work
   - Proofread both languages

4. **Schedule/Publish:**
   - Set publish date (future or now)
   - Click "Publish"

5. **Notify Subscribers:**
   - Use Resend to send notification (see below)

---

## Notifying Blog Subscribers

After publishing a new post in Sanity, send notifications:

```typescript
import { sendBlogNotification } from '@/services/resend';

// Get subscriber emails (from your database or Resend audience)
const subscriberEmails = ['email1@example.com', 'email2@example.com'];

// Send notifications
await sendBlogNotification(
  subscriberEmails,
  'Your Blog Post Title',
  'Your engaging excerpt that makes people want to read...',
  'your-blog-slug',
  'en'  // or 'es' for Spanish subscribers
);
```

### Automating Notifications:

You can set up a webhook in Sanity to automatically send emails when posts are published:

1. Go to Sanity project settings
2. Click "Webhooks"
3. Add webhook pointing to your API endpoint
4. Your endpoint calls `sendBlogNotification()`

---

## Editing Existing Posts

1. Open Sanity Studio
2. Click "Blog Posts"
3. Find your post
4. Make changes
5. Click "Publish" (updates immediately)

---

## Deleting Posts

1. Open post in Studio
2. Click "..." menu (top right)
3. Click "Delete"
4. Confirm

**Note:** This doesn't remove from website until you rebuild/redeploy.

---

## Bilingual Content Tips

### Translation Workflow:
1. Write in your primary language first
2. Complete the entire post
3. Then translate to second language
4. Review both for consistency

### What to Translate:
- ✅ Title
- ✅ Excerpt  
- ✅ All body content
- ✅ Image captions
- ✅ Author bio
- ❌ Tags (keep in English for consistency)
- ❌ Slug (keep in English for URL consistency)

### Translation Tools:
- DeepL (better than Google Translate)
- ChatGPT with proper prompts
- Professional translator (for important posts)

---

## Managing Authors

### Add New Team Member:

1. Go to "Authors" in Studio
2. Create new author profile
3. When creating posts, select their name

### Update Author Info:

1. Open author in Studio
2. Edit bio, photo, etc.
3. Publish
4. All their posts auto-update

---

## Sanity Studio Tips

### Keyboard Shortcuts:
- `Ctrl + S` / `Cmd + S` - Save draft
- `Ctrl + Shift + P` / `Cmd + Shift + P` - Publish
- `Ctrl + B` / `Cmd + B` - Bold text
- `Ctrl + I` / `Cmd + I` - Italic text

### Useful Features:
- **History:** See all changes (clock icon)
- **Duplicate:** Copy existing post to create similar one
- **Preview:** See how it looks before publishing
- **Schedule:** Set future publish date

---

## Troubleshooting

### Post not showing on website?
- Ensure it's published (not draft)
- Check slug is unique
- Verify publish date is not in future
- Check if website is fetching from Sanity

### Images not loading?
- Check image is uploaded in Sanity
- Verify image URL is accessible
- Try re-uploading image

### Translations missing?
- Ensure both English AND Spanish fields are filled
- Check required fields are complete

---

## Content Ideas

### Blog Post Topics:
1. "5 Signs Your Business Needs Data Analytics"
2. "Understanding ERP Systems: A Beginner's Guide"
3. "How AI Can Automate Your Customer Service"
4. "Data Security Best Practices for Small Businesses"
5. "The ROI of Business Intelligence Tools"
6. "Cloud vs On-Premise: Which is Right for You?"
7. "Getting Started with Power BI"
8. "Common Data Management Mistakes"
9. "Industry 4.0 in Puerto Rico Manufacturing"
10. "Building a Data-Driven Culture"

---

## Next Steps

1. ✅ Create your first author profile
2. ✅ Write your first Sanity blog post
3. ✅ Publish and test
4. ✅ Send notification to subscribers
5. ✅ Set up regular publishing schedule

---

**You're ready to start publishing!** 🎉

For technical setup, see `SANITY_RESEND_SETUP.md`


