// Vercel Serverless Function for Email Preferences
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, language } = req.body;

    if (!email) {
      return res.status(400).json({ 
        error: 'Missing email',
        message: 'Email address is required'
      });
    }

    if (!language || !['en', 'es'].includes(language)) {
      return res.status(400).json({ 
        error: 'Invalid language',
        message: 'Language must be "en" or "es"'
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

    // TODO: In production, store language preference in a database
    // For now, we'll just log it and return success
    // You should integrate with your email service provider's API
    // or store in a database (e.g., Supabase, MongoDB, etc.)
    
    console.log(`Language preference update for ${email}: ${language}`);
    
    // Here you would:
    // 1. Update database with language preference
    // 2. Update mailing list preferences in your email service
    // 3. Log the preference change event
    
    // For now, we'll just return success
    // In production, implement actual preference update logic
    
    return res.status(200).json({ 
      success: true,
      message: 'Language preference updated successfully'
    });
  } catch (error: any) {
    console.error('Email preferences error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'An unexpected error occurred'
    });
  }
}

