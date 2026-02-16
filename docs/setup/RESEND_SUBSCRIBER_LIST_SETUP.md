# Resend Subscriber List Setup Guide

This guide will help you set up and manage subscriber lists in Resend for sending newsletters.

## Overview

Resend offers an **Audiences** feature that allows you to:
- Store subscriber email addresses
- Track subscriber preferences (language, tags, etc.)
- Send emails to specific audiences
- Manage unsubscribes automatically
- Track email engagement

---

## Method 1: Using Resend Dashboard (Manual Setup)

### Step 1: Create an Audience

1. **Log in to Resend Dashboard**
   - Go to https://resend.com
   - Navigate to **Audiences** in the left sidebar

2. **Create New Audience**
   - Click **"Create Audience"** or **"New Audience"**
   - Name it: `Newsletter Subscribers` or `Stratum PR Newsletter`
   - Click **"Create"**

3. **Add Subscribers Manually** (Optional)
   - Click on your audience
   - Click **"Add Contact"**
   - Enter email address
   - Add tags (optional): `newsletter`, `english`, `spanish`
   - Click **"Add"**

---

## Method 2: Using Resend API (Automated - Recommended)

Resend provides an API to automatically add subscribers when they sign up on your website.

### Step 1: Get Your Resend API Key

1. Go to Resend Dashboard → **API Keys**
2. Copy your API key (starts with `re_...`)
3. Make sure it's added to your Vercel environment variables as `RESEND_API_KEY`

### Step 2: Create API Endpoint to Add Subscribers

Create a new serverless function to add subscribers to Resend:

**File: `api/add-subscriber.ts`**

```typescript
// Vercel Serverless Function to Add Subscriber to Resend Audience
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID; // You'll get this from Resend

  if (!RESEND_API_KEY) {
    return res.status(500).json({ 
      error: 'Email service is not configured',
      message: 'RESEND_API_KEY environment variable is missing.'
    });
  }

  if (!RESEND_AUDIENCE_ID) {
    return res.status(500).json({ 
      error: 'Audience not configured',
      message: 'RESEND_AUDIENCE_ID environment variable is missing. Create an audience in Resend dashboard first.'
    });
  }

  try {
    const { email, language = 'en', tags = [] } = req.body;

    if (!email) {
      return res.status(400).json({ 
        error: 'Missing email',
        message: 'Email address is required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format',
        message: 'The email address is not valid'
      });
    }

    // Add subscriber to Resend Audience
    const response = await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
        audience_id: RESEND_AUDIENCE_ID,
        // Add language as a tag
        tags: ['newsletter', `language-${language}`, ...tags]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API Error:', data);
      
      // If contact already exists, that's okay
      if (data.message?.includes('already exists') || data.message?.includes('duplicate')) {
        return res.status(200).json({ 
          success: true,
          message: 'Subscriber already exists',
          data 
        });
      }
      
      return res.status(response.status).json({
        error: 'Failed to add subscriber',
        message: data.message || 'An error occurred',
        details: data
      });
    }

    return res.status(200).json({ 
      success: true,
      message: 'Subscriber added successfully',
      data 
    });
  } catch (error: any) {
    console.error('Add subscriber error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'An unexpected error occurred'
    });
  }
}
```

### Step 3: Get Your Audience ID

1. Go to Resend Dashboard → **Audiences**
2. Click on your audience (or create one if you haven't)
3. The **Audience ID** is in the URL or shown in the audience details
   - Format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
4. Add it to Vercel environment variables as `RESEND_AUDIENCE_ID`

### Step 4: Update Your Subscription Service

Update `src/services/resend.ts` to add subscribers to the audience:

```typescript
// Add this function to src/services/resend.ts

// Add subscriber to Resend Audience
export async function addSubscriberToAudience(
  email: string, 
  language: 'en' | 'es' = 'en'
) {
  try {
    const response = await fetch('/api/add-subscriber', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        language,
        tags: ['newsletter', `language-${language}`]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to add subscriber to audience');
    }

    return data;
  } catch (error: any) {
    console.error('Add subscriber error:', error);
    throw error;
  }
}

// Update subscribeToBlog to also add to audience
export async function subscribeToBlog(email: string, language: 'en' | 'es' = 'en') {
  // ... existing code ...
  
  // Add subscriber to Resend Audience
  try {
    await addSubscriberToAudience(email, language);
  } catch (error) {
    console.error('Failed to add to audience, but subscription email sent:', error);
    // Don't fail the whole subscription if audience add fails
  }
  
  // ... rest of existing code ...
}
```

---

## Method 3: Using Resend's Email API with Recipients

You can also send emails directly to a list of recipients without using Audiences, but Audiences is recommended for better management.

---

## Sending Newsletters to Your Subscriber List

### Option A: Using Resend Dashboard

1. Go to **Emails** → **Send Email**
2. Select your audience
3. Compose your email
4. Send

### Option B: Using API (Programmatic)

Update your `sendBlogNotification` function to use the audience:

```typescript
// In src/services/resend.ts

export async function sendBlogNotificationToAudience(
  blogTitle: string,
  blogExcerpt: string,
  blogSlug: string,
  language: 'en' | 'es' = 'en'
) {
  const RESEND_AUDIENCE_ID = process.env.VITE_RESEND_AUDIENCE_ID; // For client-side, use serverless function
  
  // Use serverless function to send to audience
  const response = await fetch('/api/send-to-audience', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      audienceId: RESEND_AUDIENCE_ID,
      subject: language === 'es' 
        ? `Nuevo artículo: ${blogTitle}`
        : `New article: ${blogTitle}`,
      blogTitle,
      blogExcerpt,
      blogSlug,
      language,
      // Filter by language tag
      tags: [`language-${language}`]
    })
  });

  return response.json();
}
```

---

## Managing Subscribers

### Unsubscribe Handling

Resend automatically handles unsubscribes when you use Audiences. When a user clicks unsubscribe:

1. They're automatically removed from future sends
2. Their status is updated in the audience
3. You can see unsubscribes in the dashboard

### Update Your Unsubscribe API

Update `api/unsubscribe.ts` to also remove from Resend audience:

```typescript
// In api/unsubscribe.ts, add this after validation:

// Remove from Resend Audience
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

if (RESEND_API_KEY && RESEND_AUDIENCE_ID) {
  try {
    await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts/${encodeURIComponent(email)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        unsubscribed: true
      })
    });
  } catch (error) {
    console.error('Failed to update Resend audience:', error);
    // Continue anyway - we still want to mark as unsubscribed in our system
  }
}
```

---

## Environment Variables Needed

Add these to your Vercel dashboard:

1. **RESEND_API_KEY** (already set)
   - Your Resend API key

2. **RESEND_AUDIENCE_ID** (new)
   - Your audience ID from Resend dashboard
   - Format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

---

## Step-by-Step Setup Checklist

### Initial Setup:
- [ ] Create audience in Resend dashboard
- [ ] Copy audience ID
- [ ] Add `RESEND_AUDIENCE_ID` to Vercel environment variables
- [ ] Create `api/add-subscriber.ts` serverless function
- [ ] Update `src/services/resend.ts` to add subscribers to audience
- [ ] Update `api/unsubscribe.ts` to handle Resend audience unsubscribes
- [ ] Test subscription flow

### For Sending Newsletters:
- [ ] Create `api/send-to-audience.ts` serverless function (optional)
- [ ] Update blog notification function to use audience
- [ ] Test sending to audience

---

## Resend API Documentation

- **Audiences API**: https://resend.com/docs/api-reference/audiences
- **Contacts API**: https://resend.com/docs/api-reference/contacts
- **Send Email API**: https://resend.com/docs/api-reference/emails/send-email

---

## Benefits of Using Resend Audiences

1. **Automatic Unsubscribe Management**: Resend handles unsubscribes automatically
2. **Better Deliverability**: Resend manages bounce handling and spam complaints
3. **Subscriber Segmentation**: Use tags to segment by language, interests, etc.
4. **Analytics**: Track opens, clicks, and engagement per subscriber
5. **Compliance**: Helps with GDPR and CAN-SPAM compliance

---

## Quick Start: Minimal Implementation

If you want to get started quickly:

1. **Create audience in Resend dashboard**
2. **Add `RESEND_AUDIENCE_ID` to Vercel env vars**
3. **Use the API endpoint provided above** (`api/add-subscriber.ts`)
4. **Update your subscription service** to call the new endpoint

This will automatically add all new subscribers to your Resend audience, making it easy to send newsletters later.

---

## Testing

1. **Test Adding Subscriber**:
   ```bash
   curl -X POST https://www.stratumpr.com/api/add-subscriber \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","language":"en"}'
   ```

2. **Check Resend Dashboard**:
   - Go to Audiences → Your Audience
   - Verify the subscriber appears in the list

3. **Test Unsubscribe**:
   - Use the unsubscribe link from an email
   - Check Resend dashboard to see status updated

---

**Last Updated**: Based on Resend API as of 2024

