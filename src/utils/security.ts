
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential script tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 1000); // Limit length
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const validateRequired = (value: string, minLength = 1): boolean => {
  return value.trim().length >= minLength;
};

export const generateHoneypotField = (): string => {
  return Math.random().toString(36).substring(7);
};

// Rate limiting using localStorage
export const checkRateLimit = (): { allowed: boolean; timeLeft?: number } => {
  const key = 'contact_form_submissions';
  const now = Date.now();
  const submissions = JSON.parse(localStorage.getItem(key) || '[]');
  
  // Remove submissions older than 15 minutes
  const recent = submissions.filter((time: number) => now - time < 15 * 60 * 1000);
  
  if (recent.length >= 3) {
    const oldestRecent = Math.min(...recent);
    const timeLeft = Math.ceil((oldestRecent + 15 * 60 * 1000 - now) / 1000 / 60);
    return { allowed: false, timeLeft };
  }
  
  // Add current submission
  recent.push(now);
  localStorage.setItem(key, JSON.stringify(recent));
  
  return { allowed: true };
};

// Simple math CAPTCHA
export const generateMathCaptcha = (): { question: string; answer: number } => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return {
    question: `What is ${num1} + ${num2}?`,
    answer: num1 + num2
  };
};
