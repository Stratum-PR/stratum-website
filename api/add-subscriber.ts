// Vercel Serverless Function to Add Subscriber to Resend Audience
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { logger } from '../lib/logger';
import { checkRateLimit } from '../lib/rateLimit';

function getClientId(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : forwarded?.[0] ?? req.headers['x-real-ip'] ?? 'anonymous';
  return `add-subscriber:${ip}`;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { allowed } = await checkRateLimit(getClientId(req));
  if (!allowed) {
    return res.status(429).json({ error: 'Too many requests', message: 'Please try again later.' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

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

  // Only allow these tags; ignore client-supplied tags to prevent injection/abuse
  const ALLOWED_LANGUAGES = ['en', 'es'] as const;
  const allowedTags = new Set(['newsletter', 'language-en', 'language-es']);

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

    const lang = ALLOWED_LANGUAGES.includes(language as any) ? language : 'en';
    const safeTags = Array.isArray(tags)
      ? tags.filter((t: unknown) => typeof t === 'string' && allowedTags.has(t))
      : [];
    const tagsToSend = ['newsletter', `language-${lang}`, ...safeTags];

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
        tags: tagsToSend
      })
    });

    const data = await response.json();

    if (!response.ok) {
      logger.error('Resend API Error:', data);
      
      // If contact already exists, that's okay - return success
      if (data.message?.includes('already exists') || 
          data.message?.includes('duplicate') ||
          data.message?.includes('Contact already exists')) {
        return res.status(200).json({ 
          success: true,
          message: 'Subscriber already exists in audience',
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
      message: 'Subscriber added successfully to audience',
      data 
    });
  } catch (error: any) {
    logger.error('Add subscriber error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'An unexpected error occurred'
    });
  }
}

