// Vercel Serverless Function for Unsubscribe
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

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

    console.log(`Unsubscribe request for: ${email}`);
    
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
          console.error('Failed to update Resend audience:', errorData);
          // Continue anyway - we still want to mark as unsubscribed
        } else {
          console.log(`Successfully unsubscribed ${email} from Resend audience`);
        }
      } catch (error) {
        console.error('Error updating Resend audience:', error);
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
    console.error('Unsubscribe error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'An unexpected error occurred'
    });
  }
}

