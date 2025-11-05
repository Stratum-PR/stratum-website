# 📝 How to Create a Blog Post in Sanity Studio

## Step-by-Step Guide

### Prerequisites
Make sure Sanity Studio is running:
```bash
npx sanity start
```
Then open: http://localhost:3333/studio

---

## Step 1: Create an Author (First Time Only)

1. In Sanity Studio, click **"Authors"** in the left sidebar
2. Click **"+ Create"** button (top right)
3. Fill in the form:
   - **Name:** Your full name (e.g., "Genesis Rodriguez")
   - **Slug:** Click "Generate" button (auto-creates from name)
   - **Image:** Click to upload a profile photo (optional but recommended)
   - **Bio (English):** Your professional bio in English
   - **Bio (Spanish):** Your professional bio in Spanish
4. Click **"Publish"** button (top right)
5. Remember the Author - you'll select it when creating blog posts

---

## Step 2: Create a Blog Post

1. In Sanity Studio, click **"Blog Posts"** in the left sidebar
2. Click **"+ Create"** button (top right)
3. Fill in all required fields:

### Basic Information
- **Title (English):** Your blog post title in English
  - Example: "Understanding Your Organization's IT Needs"
- **Title (Spanish):** Your blog post title in Spanish
  - Example: "Entendiendo las Necesidades de TI de tu Organización"
- **Slug:** Click "Generate" button (auto-creates URL-friendly slug)
- **Author:** Click dropdown and select the author you created in Step 1

### Content Preview
- **Excerpt (English):** Short summary (150-200 characters)
  - Example: "Discover how to assess your organization's technology needs and identify areas for improvement."
- **Excerpt (Spanish):** Short summary in Spanish
  - Example: "Descubre cómo evaluar las necesidades tecnológicas de tu organización e identificar áreas de mejora."

### Visual Content
- **Main Image:** Click to upload a featured image
  - Recommended: 1200x630px for social media sharing
  - Formats: JPG, PNG, WebP

### Main Content
- **Content (English):** Write your full blog post in English
  - Use the rich text editor
  - Add headings, bold, italic, lists
  - Insert images inline if needed
  - Add links to other resources
- **Content (Spanish):** Write your full blog post in Spanish
  - Same formatting options as English content

### Metadata
- **Tags:** Click to add tags (press Enter after each tag)
  - Examples: "data analytics", "erp", "business intelligence", "ai automation"
  - Use lowercase, no spaces or use hyphens
- **Published At:** Click to set the publication date/time
  - Can be set to future date for scheduling
  - Default: current date/time
- **Featured Post:** Toggle ON if you want this post featured on homepage

### Publish
4. Click **"Publish"** button (top right)
5. Your post is now live and will appear on your website!

---

## Content Tips

### Title Best Practices
- 50-60 characters
- Include relevant keywords
- Clear and descriptive
- Same meaning in both languages

### Excerpt Best Practices
- 150-200 characters
- Compelling summary
- Include benefit/hook
- Complete thought

### Content Structure
```
Introduction (2-3 paragraphs)
  - Hook the reader
  - Explain the problem
  - Preview what they'll learn

Main Sections (Use H2 headings)
  - Break into digestible sections
  - Use bullet points for lists
  - Include examples

Conclusion (1-2 paragraphs)
  - Summarize key points
  - Call to action
```

### Rich Text Editor Tips
- **Bold:** Select text, click B button or Cmd+B / Ctrl+B
- **Italics:** Select text, click I button or Cmd+I / Ctrl+I
- **Headings:** Use the heading dropdown
- **Lists:** Click bullet or numbered list button
- **Links:** Select text, click link button, paste URL
- **Images:** Click image button to upload inline images

---

## Example Blog Post

### Title (English)
"5 Signs Your Business Needs Data Analytics"

### Title (Spanish)
"5 Señales de que Tu Negocio Necesita Análisis de Datos"

### Excerpt (English)
"Is your business making decisions in the dark? Discover the 5 key signs that indicate you need data analytics to drive growth and efficiency."

### Excerpt (Spanish)
"¿Tu negocio está tomando decisiones a ciegas? Descubre las 5 señales clave que indican que necesitas análisis de datos para impulsar el crecimiento y la eficiencia."

### Tags
- data analytics
- business intelligence
- data-driven decisions
- small business
- puerto rico

### Content Structure
1. Introduction - Why data matters
2. Sign 1: You're making decisions based on gut feeling
3. Sign 2: Reports take days or weeks to compile
4. Sign 3: You can't see real-time performance metrics
5. Sign 4: Different departments use different systems
6. Sign 5: You're missing growth opportunities
7. Conclusion - Next steps

---

## After Publishing

### View on Website
Your blog post will appear at:
- `/blog` - Blog listing page
- `/blog/[your-slug]` - Individual post page

### Example URLs
If slug is `understanding-it-needs`:
- Full URL: `https://www.stratumpr.com/blog/understanding-it-needs`

### Notify Subscribers
After publishing, you can:
1. Use Resend to send notifications to subscribers
2. Or manually email your list about the new post

---

## Troubleshooting

### Post not showing on website?
- Check if it's published (not draft)
- Verify publish date is not in future
- Check website is fetching from Sanity (might still use hardcoded posts)

### Can't see Author dropdown?
- Make sure you created an Author first
- Publish the Author before creating blog posts

### Rich text editor not working?
- Try refreshing the page
- Check browser console for errors
- Make sure JavaScript is enabled

### Image not uploading?
- Check file size (should be under 10MB)
- Try different format (JPG instead of PNG)
- Check internet connection

---

## Quick Reference Checklist

Before creating a blog post, make sure you have:
- [ ] Created at least one Author
- [ ] Title in English
- [ ] Title in Spanish
- [ ] Excerpt in English (150-200 chars)
- [ ] Excerpt in Spanish (150-200 chars)
- [ ] Featured image ready (1200x630px)
- [ ] Full content in English
- [ ] Full content in Spanish
- [ ] 3-5 relevant tags
- [ ] Publication date set

---

**Ready to create your first post?** Follow the steps above and you'll have a beautiful bilingual blog post live in minutes! 🚀

