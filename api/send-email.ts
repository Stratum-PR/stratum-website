// Vercel Serverless Function for Resend Email API
// This proxies email requests from the client to Resend API to avoid CORS issues
// API key is kept secure on the server - never exposed to browser

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get API key from environment variables (server-side only, no VITE_ prefix)
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.error('Resend API key is missing');
    return res.status(500).json({ 
      error: 'Email service is not configured',
      message: 'RESEND_API_KEY environment variable is missing. Set it in Vercel dashboard (without VITE_ prefix).'
    });
  }

  try {
    const { to, subject, html, from } = req.body;

    // Validate required fields
    if (!to || !subject || !html) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'to, subject, and html are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({
        error: 'Invalid email format',
        message: 'The email address is not valid'
      });
    }

    // Use custom domain email - domain must be verified in Resend dashboard
    // If domain not verified, use onboarding@resend.dev for testing
    const fromEmail = from || process.env.FROM_EMAIL || 'Stratum PR <contact@stratumpr.com>';

    // Send email via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: fromEmail,
        to,
        subject,
        html
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: data,
        fromEmail,
        to
      });
      
      // Provide more helpful error messages
      let errorMessage = data.message || response.statusText;
      if (data.message?.includes('domain') || data.message?.includes('not verified')) {
        errorMessage = 'Email domain not verified. Please verify your domain in Resend dashboard or use onboarding@resend.dev for testing.';
      } else if (data.message?.includes('pattern') || data.message?.includes('match')) {
        errorMessage = 'Invalid email format. Please check the email address and try again.';
      }
      
      return res.status(response.status).json({
        error: 'Failed to send email',
        message: errorMessage,
        details: data
      });
    }

    return res.status(200).json({ 
      success: true,
      data 
    });
  } catch (error: any) {
    console.error('Email sending error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'An unexpected error occurred'
    });
  }
}
