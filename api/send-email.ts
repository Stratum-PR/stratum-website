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
    // If domain not verified, fall back to verified email
    let fromEmail = from || process.env.FROM_EMAIL || 'Stratum PR <contact@stratumpr.com>';
    
    // Check if from email contains info@stratumpr.com and domain might not be verified
    // If so, try with contact@stratumpr.com first, then fall back to onboarding@resend.dev
    const isInfoEmail = fromEmail.includes('info@stratumpr.com');
    const fallbackFrom = process.env.FROM_EMAIL || 'Stratum PR <contact@stratumpr.com>';
    const testFrom = 'onboarding@resend.dev';

    // Send email via Resend API
    let response;
    let data;
    let lastError;
    
    // Try sending with the requested from email first
    try {
      response = await fetch('https://api.resend.com/emails', {
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

      data = await response.json();

      // If it fails with pattern/domain error and we're using info@, try fallback
      if (!response.ok && isInfoEmail && (
        data.message?.includes('pattern') || 
        data.message?.includes('match') ||
        data.message?.includes('domain') ||
        data.message?.includes('not verified')
      )) {
        console.warn(`Failed to send with ${fromEmail}, trying fallback: ${fallbackFrom}`);
        lastError = data;
        
        // Try with contact@stratumpr.com
        response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: fallbackFrom,
            to,
            subject,
            html
          })
        });

        data = await response.json();
        
        // If still fails, try onboarding@resend.dev (always works)
        if (!response.ok) {
          console.warn(`Failed to send with ${fallbackFrom}, trying test email: ${testFrom}`);
          lastError = data;
          
          response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${RESEND_API_KEY}`
            },
            body: JSON.stringify({
              from: testFrom,
              to,
              subject,
              html
            })
          });

          data = await response.json();
        } else {
          // Success with fallback - log it
          console.log(`Successfully sent email using fallback: ${fallbackFrom}`);
        }
      }
    } catch (fetchError: any) {
      console.error('Fetch error:', fetchError);
      return res.status(500).json({
        error: 'Network error',
        message: 'Failed to connect to email service'
      });
    }

    if (!response.ok) {
      console.error('Resend API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: data,
        fromEmail,
        fallbackFrom,
        to
      });
      
      // Provide more helpful error messages
      let errorMessage = data.message || response.statusText;
      if (data.message?.includes('domain') || data.message?.includes('not verified')) {
        errorMessage = `Email domain not verified. The email "${fromEmail}" cannot be used. Please verify your domain in Resend dashboard.`;
      } else if (data.message?.includes('pattern') || data.message?.includes('match')) {
        errorMessage = `Invalid email format for "${fromEmail}". Please verify the domain in Resend dashboard or contact support.`;
      }
      
      return res.status(response.status).json({
        error: 'Failed to send email',
        message: errorMessage,
        details: data,
        attemptedFrom: fromEmail,
        lastError: lastError
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
