// Vercel Serverless Function for Resend Email API
// This proxies email requests from the client to Resend API to avoid CORS issues
// API key is kept secure on the server - never exposed to browser
//
// RESTRICTION: Unauthenticated callers may only use type=welcome (newsletter signup)
// or type=contact (contact form confirmation). All other sends (checklist, admin,
// notifications) require X-Internal-Email-Secret header matching INTERNAL_EMAIL_SECRET.
//
// For the public types the SERVER builds subject/html/text/from; client-supplied
// subject, html, text, from and replyTo are ignored so this endpoint cannot be used
// as an open relay from the stratumpr.com domain.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { logger } from '../lib/logger.js';
import { checkRateLimit } from '../lib/rateLimit.js';
import { renderBrandedEmail } from '../lib/emailLayout.js';
import { buildWelcomeEmail } from '../lib/welcomeEmail.js';

const ALLOWED_UNAUTH_TYPES = ['welcome', 'contact'];

function hasValidInternalSecret(req: VercelRequest): boolean {
  const secret = process.env.INTERNAL_EMAIL_SECRET;
  if (!secret) return false;
  const header = req.headers['x-internal-email-secret'];
  return typeof header === 'string' && header === secret;
}

function getClientId(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : forwarded?.[0] ?? req.headers['x-real-ip'] ?? 'anonymous';
  return `send-email:${ip}`;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_FROM = 'Stratum PR <contact@stratumpr.com>';
const DEFAULT_REPLY_TO = 'contact@stratumpr.com';
const MAX_NAME_LENGTH = 100;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Server-built contact form confirmation (transactional, no marketing content), in the branded layout. */
export function buildContactConfirmation(language: 'es' | 'en', rawName: unknown): { subject: string; html: string; text: string } {
  // Collapse control chars/newlines, trim, cap length
  const name = typeof rawName === 'string'
    ? rawName.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, MAX_NAME_LENGTH)
    : '';
  const firstName = name.split(' ')[0] || '';
  const isEs = language === 'es';
  const subject = isEs ? 'Recibimos tu mensaje - Stratum PR' : 'We received your message - Stratum PR';
  const heading = isEs
    ? (firstName ? `Gracias, ${escapeHtml(firstName)}.` : 'Gracias por escribirnos.')
    : (firstName ? `Thanks, ${escapeHtml(firstName)}.` : 'Thanks for writing to us.');
  const body = isEs
    ? 'Recibimos tu mensaje y te respondemos dentro de 2 días laborables.'
    : "We received your message and we'll reply within 2 business days.";
  const urgentText = isEs
    ? 'Si es urgente, escríbenos a contact@stratumpr.com.'
    : "If it's urgent, email us at contact@stratumpr.com.";
  const mailLink = '<a href="mailto:contact@stratumpr.com" style="color:#1E2B7E;font-weight:700;text-decoration:none;">contact@stratumpr.com</a>';
  const urgentHtml = isEs ? `Si es urgente, escríbenos a ${mailLink}.` : `If it&#39;s urgent, email us at ${mailLink}.`;
  const demoText = isEs
    ? '¿Prefieres hablar? Agenda 30 minutos con nosotros, gratis.'
    : 'Rather talk? Book 30 free minutes with us.';
  const html = renderBrandedEmail({
    lang: language,
    preheader: body,
    eyebrow: isEs ? 'Mensaje recibido' : 'Message received',
    heading,
    bodyHtml: `<p style="margin:0 0 14px;">${escapeHtml(body)}</p><p style="margin:0 0 14px;">${urgentHtml}</p><p style="margin:0 0 6px;color:#525252;">${escapeHtml(demoText)}</p>`,
    cta: { label: isEs ? 'Agenda un demo' : 'Schedule a demo', href: 'https://calendly.com/admin-stratumpr/30min' },
  });
  const text = `${isEs ? (firstName ? `Gracias, ${firstName}.` : 'Gracias por escribirnos.') : (firstName ? `Thanks, ${firstName}.` : 'Thanks for writing to us.')}

${body}

${urgentText}

${demoText} https://calendly.com/admin-stratumpr/30min

— Stratum PR
stratumpr.com
`;
  return { subject, html, text };
}

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

  const bodyType = req.body?.type;
  const allowedUnauth = typeof bodyType === 'string' && ALLOWED_UNAUTH_TYPES.includes(bodyType);
  if (!allowedUnauth && !hasValidInternalSecret(req)) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'This send type requires internal authentication. Use type=welcome or type=contact for public sends.'
    });
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
    const { type } = req.body;
    const language: 'es' | 'en' | undefined =
      req.body.language === 'es' || req.body.language === 'en' ? req.body.language : undefined;

    let toFinal: string;
    let subjectFinal: string;
    let htmlFinal: string;
    let textFinal: string | undefined;
    let fromFinal: string | undefined;
    let replyToFinal: string | undefined;
    // Transactional sends (contact confirmation) must not carry bulk/list headers
    let isTransactional = false;
    // Signed token for the List-Unsubscribe URL (welcome emails only)
    let listUnsubscribeToken: string | undefined;

    if (type === 'contact') {
      // Contact form confirmation: only `to`, `language`, `name` are accepted from the client.
      const to = req.body.to;
      if (typeof to !== 'string' || !EMAIL_REGEX.test(to)) {
        return res.status(400).json({ error: 'Invalid email format', message: 'The email address is not valid' });
      }
      const confirmation = buildContactConfirmation(language ?? 'es', req.body.name);
      toFinal = to;
      subjectFinal = confirmation.subject;
      htmlFinal = confirmation.html;
      textFinal = confirmation.text;
      fromFinal = undefined; // server default (FROM_EMAIL) below
      replyToFinal = DEFAULT_REPLY_TO;
      isTransactional = true;
    } else if (type === 'welcome') {
      // Welcome email: server builds content and injects the signed unsubscribe token.
      const to = req.body.to;
      if (!language) {
        return res.status(400).json({ error: 'Missing required fields', message: "language ('es' or 'en') is required" });
      }
      if (typeof to !== 'string' || !EMAIL_REGEX.test(to)) {
        return res.status(400).json({ error: 'Invalid email format', message: 'The email address is not valid' });
      }
      const secret = process.env.UNSUBSCRIBE_SECRET;
      if (!secret) {
        logger.error('UNSUBSCRIBE_SECRET is missing');
        return res.status(500).json({ error: 'Server configuration error', message: 'Unsubscribe secret not configured.' });
      }
      // Pass the real token to the templates (they URL-encode it into the links, so a
      // placeholder substituted afterwards would never match).
      const token = generateUnsubscribeToken(to);
      listUnsubscribeToken = token;
      toFinal = to;
      const welcome = buildWelcomeEmail(to, language, token);
      subjectFinal = welcome.subject;
      htmlFinal = welcome.html;
      textFinal = welcome.text;
      fromFinal = undefined; // server default (FROM_EMAIL) below
      replyToFinal = DEFAULT_REPLY_TO;
    } else {
      // Internal-secret sends (checklist, notifications): caller controls content.
      ({ to: toFinal, subject: subjectFinal, html: htmlFinal, text: textFinal, from: fromFinal, replyTo: replyToFinal } = req.body);
    }

    // Validate required fields
    if (!toFinal || !subjectFinal || !htmlFinal) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'to, subject, and html are required'
      });
    }

    // Validate email format
    if (!EMAIL_REGEX.test(toFinal)) {
      return res.status(400).json({
        error: 'Invalid email format',
        message: 'The email address is not valid'
      });
    }

    // Use custom domain email - domain must be verified in Resend dashboard
    // If domain not verified, fall back to verified email
    const fromEmail = fromFinal || process.env.FROM_EMAIL || DEFAULT_FROM;
    const replyToEmail = replyToFinal || DEFAULT_REPLY_TO;
    
    // Check if from email contains info@stratumpr.com and domain might not be verified
    // If so, try with contact@stratumpr.com first, then fall back to onboarding@resend.dev
    const isInfoEmail = fromEmail.includes('info@stratumpr.com');
    const fallbackFrom = process.env.FROM_EMAIL || DEFAULT_FROM;
    const testFrom = 'onboarding@resend.dev';
    
    // Generate unsubscribe URL from email if available
    const unsubscribeUrl = `https://www.stratumpr.com/unsubscribe?email=${encodeURIComponent(toFinal)}` +
      (listUnsubscribeToken ? `&token=${listUnsubscribeToken}` : '');
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
          headers: isTransactional
            ? { 'X-Entity-Ref-ID': `contact-${Date.now()}` }
            : {
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

    // After successful welcome email, send admin notification server-side (no client secret needed)
    if (type === 'welcome' && toFinal) {
      const adminEmail = process.env.ADMIN_EMAIL || process.env.FROM_EMAIL || 'contact@stratumpr.com';
      const adminSubject = language === 'es' ? `Nueva suscripción al blog: ${toFinal}` : `New blog subscription: ${toFinal}`;
      const safeTo = escapeHtml(toFinal);
      const adminHtml = language === 'es'
        ? `<h2>Nueva Suscripción al Blog</h2><p><strong>Email:</strong> ${safeTo}</p><p><strong>Idioma:</strong> Español</p><p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>`
        : `<h2>New Blog Subscription</h2><p><strong>Email:</strong> ${safeTo}</p><p><strong>Language:</strong> English</p><p><strong>Date:</strong> ${new Date().toLocaleString('en-US')}</p>`;
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` },
          body: JSON.stringify({
            from: fromEmail || fallbackFrom,
            to: adminEmail.replace(/^.*<([^>]+)>.*$/, '$1').trim() || adminEmail,
            subject: adminSubject,
            html: adminHtml
          })
        });
      } catch (adminErr: any) {
        logger.error('Failed to send admin notification:', adminErr);
      }
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
