// Vercel Serverless Function for Resend Email API
// This proxies email requests from the client to Resend API to avoid CORS issues
// API key is kept secure on the server - never exposed to browser

import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { logger } from '../lib/logger';
import { checkRateLimit } from '../lib/rateLimit';

function getClientId(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : forwarded?.[0] ?? req.headers['x-real-ip'] ?? 'anonymous';
  return `send-email:${ip}`;
}

const UNSUBSCRIBE_TOKEN_PLACEHOLDER = '{{UNSUBSCRIBE_TOKEN}}';

function generateUnsubscribeToken(email: string): string {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret) return '';
  return crypto.createHmac('sha256', secret).update(email.toLowerCase().trim()).digest('hex');
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

  if (!RESEND_API_KEY) {
    logger.error('Resend API key is missing');
    return res.status(500).json({ 
      error: 'Email service is not configured',
      message: 'RESEND_API_KEY environment variable is missing. Set it in Vercel dashboard (without VITE_ prefix).'
    });
  }

  try {
    const { to, subject, html, text, from, replyTo, type, language } = req.body;

    // Welcome email: server generates signed unsubscribe token and replaces placeholder
    if (type === 'welcome' && to && language) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(to)) {
        return res.status(400).json({ error: 'Invalid email format', message: 'The email address is not valid' });
      }
      const secret = process.env.UNSUBSCRIBE_SECRET;
      if (!secret) {
        logger.error('UNSUBSCRIBE_SECRET is missing');
        return res.status(500).json({ error: 'Server configuration error', message: 'Unsubscribe secret not configured.' });
      }
      const token = generateUnsubscribeToken(to);
      const htmlWithToken = (html || '').split(UNSUBSCRIBE_TOKEN_PLACEHOLDER).join(token);
      const textWithToken = (text || '').split(UNSUBSCRIBE_TOKEN_PLACEHOLDER).join(token);
      const subjectWelcome = language === 'es' ? '¡Bienvenido a Stratum PR!' : 'Welcome to Stratum PR!';
      // Fall through to send with htmlWithToken, textWithToken, subjectWelcome
      req.body = { ...req.body, subject: subjectWelcome, html: htmlWithToken, text: textWithToken };
    }

    const { to: toFinal, subject: subjectFinal, html: htmlFinal, text: textFinal, from: fromFinal, replyTo: replyToFinal } = req.body;

    // Validate required fields (after welcome handling)
    if (!toFinal || !subjectFinal || !htmlFinal) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'to, subject, and html are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(toFinal)) {
      return res.status(400).json({
        error: 'Invalid email format',
        message: 'The email address is not valid'
      });
    }

    // Use custom domain email - domain must be verified in Resend dashboard
    // If domain not verified, fall back to verified email
    let fromEmail = fromFinal || process.env.FROM_EMAIL || 'Stratum PR <contact@stratumpr.com>';
    const replyToEmail = replyToFinal || 'contact@stratumpr.com';
    
    // Check if from email contains info@stratumpr.com and domain might not be verified
    // If so, try with contact@stratumpr.com first, then fall back to onboarding@resend.dev
    const isInfoEmail = fromEmail.includes('info@stratumpr.com');
    const fallbackFrom = process.env.FROM_EMAIL || 'Stratum PR <contact@stratumpr.com>';
    const testFrom = 'onboarding@resend.dev';
    
    // Generate unsubscribe URL from email if available
    const unsubscribeUrl = `https://www.stratumpr.com/unsubscribe?email=${encodeURIComponent(toFinal)}`;
    const unsubscribeMailto = `mailto:contact@stratumpr.com?subject=Unsubscribe&body=Please unsubscribe ${encodeURIComponent(toFinal)}`;

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
          to: toFinal,
          subject: subjectFinal,
          html: htmlFinal,
          text: textFinal || undefined, // Plain text version for better deliverability
          reply_to: replyToEmail,
          headers: {
            'List-Unsubscribe': `<${unsubscribeUrl}>, <${unsubscribeMailto}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
            'X-Entity-Ref-ID': `newsletter-${Date.now()}`,
            'Precedence': 'bulk'
          }
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
        logger.warn(`Failed to send with ${fromEmail}, trying fallback: ${fallbackFrom}`);
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
            to: toFinal,
            subject: subjectFinal,
            html: htmlFinal
          })
        });

        data = await response.json();
        
        // If still fails, try onboarding@resend.dev (always works)
        if (!response.ok) {
          logger.warn(`Failed to send with ${fallbackFrom}, trying test email: ${testFrom}`);
          lastError = data;
          
          response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${RESEND_API_KEY}`
            },
            body: JSON.stringify({
              from: testFrom,
              to: toFinal,
              subject: subjectFinal,
              html: htmlFinal
            })
          });

          data = await response.json();
        } else {
          // Success with fallback - log it
          logger.log(`Successfully sent email using fallback: ${fallbackFrom}`);
        }
      }
    } catch (fetchError: any) {
      logger.error('Fetch error:', fetchError);
      return res.status(500).json({
        error: 'Network error',
        message: 'Failed to connect to email service'
      });
    }

    if (!response.ok) {
      logger.error('Resend API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: data,
        fromEmail,
        fallbackFrom,
        to: toFinal
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
    logger.error('Email sending error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'An unexpected error occurred'
    });
  }
}
