// Server-side only: forwards checklist result emails to send-email with INTERNAL_EMAIL_SECRET.
// Call this from the client instead of sendEmail() for checklist results so the secret is never exposed.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit } from '../lib/rateLimit';

function getClientId(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : forwarded?.[0] ?? req.headers['x-real-ip'] ?? 'anonymous';
  return `send-checklist-email:${ip}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.INTERNAL_EMAIL_SECRET;
  if (!secret) {
    return res.status(503).json({
      error: 'Service not configured',
      message: 'INTERNAL_EMAIL_SECRET is not set. Checklist emails require server configuration.'
    });
  }

  const { allowed } = await checkRateLimit(getClientId(req));
  if (!allowed) {
    return res.status(429).json({ error: 'Too many requests', message: 'Please try again later.' });
  }

  const { to, subject, html, text } = req.body || {};
  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'Missing required fields', message: 'to, subject, and html are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    return res.status(400).json({ error: 'Invalid email format', message: 'The email address is not valid' });
  }

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.VITE_PUBLIC_BASE_URL || 'https://www.stratumpr.com';
  const sendEmailUrl = `${baseUrl.replace(/\/$/, '')}/api/send-email`;

  try {
    const response = await fetch(sendEmailUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Email-Secret': secret,
      },
      body: JSON.stringify({
        type: 'checklist',
        to,
        subject,
        html,
        text: text || undefined,
        from: process.env.FROM_EMAIL || 'Stratum PR <contact@stratumpr.com>',
        replyTo: 'contact@stratumpr.com',
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    return res.status(200).json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to send email';
    return res.status(500).json({ error: 'Internal server error', message });
  }
}
