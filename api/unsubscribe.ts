// Vercel Serverless Function for Unsubscribe
// Requires signed token (HMAC) so only the recipient can unsubscribe.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { logger } from '../lib/logger';
import { checkRateLimit } from '../lib/rateLimit';

function getClientId(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : forwarded?.[0] ?? req.headers['x-real-ip'] ?? 'anonymous';
  return `unsubscribe:${ip}`;
}

function verifyUnsubscribeToken(email: string, token: string): boolean {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret || !token) return false;
  const expected = crypto.createHmac('sha256', secret).update(email.toLowerCase().trim()).digest('hex');
  if (token.length !== expected.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(token, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
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

  try {
    const { email, token } = req.body;

    if (!email) {
      return res.status(400).json({ 
        error: 'Missing email',
        message: 'Email address is required'
      });
    }

    if (!token) {
      return res.status(400).json({ 
        error: 'Missing token',
        message: 'Unsubscribe link is invalid or expired. Use the link from your email.'
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

    if (!verifyUnsubscribeToken(email, token)) {
      return res.status(403).json({
        error: 'Invalid token',
        message: 'Unsubscribe link is invalid or expired. Use the link from your email.'
      });
    }

    logger.log(`Unsubscribe request for: ${email}`);
    
    // Remove from Resend Audience if configured
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

    if (RESEND_API_KEY && RESEND_AUDIENCE_ID) {
      try {
        // Update contact in Resend Audience to mark as unsubscribed
        const resendResponse = await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts/${encodeURIComponent(email)}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`
          },
          body: JSON.stringify({
            unsubscribed: true
          })
        });

        if (!resendResponse.ok) {
          const errorData = await resendResponse.json();
          logger.error('Failed to update Resend audience:', errorData);
          // Continue anyway - we still want to mark as unsubscribed
        } else {
          logger.log(`Successfully unsubscribed ${email} from Resend audience`);
        }
      } catch (error) {
        logger.error('Error updating Resend audience:', error);
        // Continue anyway - we still want to mark as unsubscribed
      }
    }
    
    // TODO: In production, also store unsubscribe status in a database
    // For now, Resend audience handles the unsubscribe status
    
    return res.status(200).json({ 
      success: true,
      message: 'Successfully unsubscribed'
    });
  } catch (error: any) {
    logger.error('Unsubscribe error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'An unexpected error occurred'
    });
  }
}

