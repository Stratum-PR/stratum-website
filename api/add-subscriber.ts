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
        // Add language and newsletter tags
        tags: ['newsletter', `language-${language}`, ...tags]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API Error:', data);
      
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
    console.error('Add subscriber error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'An unexpected error occurred'
    });
  }
}

