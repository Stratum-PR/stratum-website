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

    // TODO: In production, store unsubscribe status in a database
    // For now, we'll just log it and return success
    // You should integrate with your email service provider's unsubscribe API
    // or store in a database (e.g., Supabase, MongoDB, etc.)
    
    console.log(`Unsubscribe request for: ${email}`);
    
    // Here you would:
    // 1. Update database to mark email as unsubscribed
    // 2. Remove from mailing list in your email service
    // 3. Log the unsubscribe event
    
    // For now, we'll just return success
    // In production, implement actual unsubscribe logic
    
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

