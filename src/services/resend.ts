// Resend Email Service
// This handles all email communications including blog subscriptions and checklist results
// NOTE: API key is kept secure on the server - never exposed to browser

import { getWelcomeEmailTemplate, getBlogNotificationTemplate, type EmailTemplateData } from '@/utils/emailTemplates';
import { getWelcomeEmailPlainText, getBlogNotificationPlainText } from '@/utils/emailPlainText';
import { logger } from '@/lib/logger';

const API_ENDPOINT = 'https://api.resend.com/emails'

interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
  from?: string
  replyTo?: string
}

export async function sendEmail(data: EmailData) {
  // Always use serverless function - API key is kept secure on the server
  // Never expose API key to browser for security
  const API_ROUTE = '/api/send-email'
  
  try {
    const response = await fetch(API_ROUTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: data.from, // Server will handle default from email
        to: data.to,
        subject: data.subject,
        html: data.html,
        text: data.text, // Plain text version for better deliverability
        replyTo: data.replyTo || 'contact@stratumpr.com'
      })
    })

    const responseData = await response.json()

    if (!response.ok) {
      logger.error('Email API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: responseData
      })
      throw new Error(responseData.message || `Failed to send email: ${response.statusText}`)
    }

    return responseData.data || responseData
  } catch (error: any) {
    logger.error('Email sending error:', error)
    // Provide helpful error messages
    if (error.message?.includes('CORS') || error.message?.includes('Failed to fetch') || error.message?.includes('network')) {
      throw new Error('Email service is not available. Please try again later or contact support.')
    }
    throw error
  }
}

// Add subscriber to Resend Audience
export async function addSubscriberToAudience(
  email: string, 
  language: 'en' | 'es' = 'en'
) {
  try {
    const response = await fetch('/api/add-subscriber', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        language,
        tags: ['newsletter', `language-${language}`]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // Don't throw error if subscriber already exists
      if (data.message?.includes('already exists') || data.message?.includes('duplicate')) {
        return data;
      }
      throw new Error(data.message || 'Failed to add subscriber to audience');
    }

    return data;
  } catch (error: any) {
    logger.error('Add subscriber to audience error:', error);
    // Don't throw - we still want to send the welcome email even if audience add fails
    return null;
  }
}

// Subscribe to blog updates
export async function subscribeToBlog(email: string, language: 'en' | 'es' = 'en') {
  // Admin email will be handled by the serverless function
  // The serverless function reads ADMIN_EMAIL from environment variables
  const adminEmail = 'contact@stratumpr.com' // Fallback, but server will use ADMIN_EMAIL env var
  
  // Token is generated server-side (HMAC) when sending; client sends placeholder for API to replace
  const UNSUBSCRIBE_TOKEN_PLACEHOLDER = '{{UNSUBSCRIBE_TOKEN}}';
  const unsubscribeToken = UNSUBSCRIBE_TOKEN_PLACEHOLDER;
  
  // Add subscriber to Resend Audience (non-blocking)
  // This allows the welcome email to be sent even if audience add fails
  addSubscriberToAudience(email, language).catch(error => {
    logger.error('Failed to add subscriber to audience (non-critical):', error);
  });
  
  // Use beautiful email template
  const subject = language === 'es' 
    ? '¡Bienvenido a Stratum PR!' 
    : 'Welcome to Stratum PR!'
  
  const html = getWelcomeEmailTemplate({
    email,
    language,
    unsubscribeToken
  });
  
  const text = getWelcomeEmailPlainText({
    email,
    language,
    unsubscribeToken
  });

  // Send notification to admin
  const adminSubject = language === 'es'
    ? `Nueva suscripción al blog: ${email}`
    : `New blog subscription: ${email}`
  
  const adminHtml = language === 'es'
    ? `
      <h2>Nueva Suscripción al Blog</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Idioma:</strong> Español</p>
      <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
    `
    : `
      <h2>New Blog Subscription</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Language:</strong> English</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString('en-US')}</p>
    `

  // Send welcome email via API so server can inject HMAC unsubscribe token (placeholder replaced server-side)
  const API_ROUTE = '/api/send-email';
  const welcomeRes = await fetch(API_ROUTE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'welcome',
      to: email,
      language,
      html,
      text,
      from: 'Stratum PR <info@stratumpr.com>',
      replyTo: 'contact@stratumpr.com'
    })
  });
  const welcomeData = await welcomeRes.json();
  if (!welcomeRes.ok) throw new Error(welcomeData.message || 'Failed to send welcome email');

  // Send admin notification from contact@stratumpr.com
  await sendEmail({
    to: adminEmail,
    subject: adminSubject,
    html: adminHtml
  });
}

// Send checklist results
export async function sendChecklistResults(
  email: string, 
  score: number, 
  language: 'en' | 'es' = 'en'
) {
  const subject = language === 'es'
    ? 'Tus Resultados de Preparación de TI - Stratum PR'
    : 'Your IT Readiness Results - Stratum PR'
  
  const getAssessment = (score: number, lang: 'en' | 'es') => {
    if (score <= 10) {
      return {
        title: lang === 'es' ? '🔴 Crítico' : '🔴 Critical',
        description: lang === 'es'
          ? 'Tus sistemas necesitan atención inmediata. Los procesos manuales y la falta de integración están limitando significativamente tu capacidad de crecimiento.'
          : 'Your systems need immediate attention. Manual processes and lack of integration are significantly limiting your growth capacity.'
      }
    } else if (score <= 18) {
      return {
        title: lang === 'es' ? '🟡 Necesita Mejora' : '🟡 Needs Improvement',
        description: lang === 'es'
          ? 'Hay oportunidades claras para modernizar. Invertir en automatización y mejores herramientas aumentará la eficiencia significativamente.'
          : 'There are clear opportunities to modernize. Investing in automation and better tools will increase efficiency significantly.'
      }
    } else if (score <= 24) {
      return {
        title: lang === 'es' ? '🟢 Bueno' : '🟢 Good',
        description: lang === 'es'
          ? 'Estás en el camino correcto. Algunas optimizaciones te llevarán al siguiente nivel.'
          : 'You\'re on the right track. Some optimizations will take you to the next level.'
      }
    } else {
      return {
        title: lang === 'es' ? '🌟 Excelente' : '🌟 Excellent',
        description: lang === 'es'
          ? '¡Felicidades! Tus sistemas están bien posicionados para el crecimiento. El enfoque debe estar en el mantenimiento y la mejora continua.'
          : 'Congratulations! Your systems are well-positioned for growth. Focus should be on maintenance and continuous improvement.'
      }
    }
  }

  const assessment = getAssessment(score, language)
  
  const html = language === 'es'
    ? `
      <h1>Resultados de tu Evaluación de Preparación de TI</h1>
      <h2>Tu puntuación: ${score}/30</h2>
      <h3>${assessment.title}</h3>
      <p>${assessment.description}</p>
      
      <h3>Próximos Pasos Recomendados:</h3>
      <ol>
        <li><strong>Agendar una consulta gratuita</strong> - <a href="https://www.stratumpr.com/contact">Habla con nuestro equipo</a> sobre tus necesidades específicas</li>
        <li><strong>Explorar nuestros servicios</strong> - <a href="https://www.stratumpr.com/services">Ver cómo podemos ayudar</a></li>
        <li><strong>Ver casos de estudio</strong> - <a href="https://www.stratumpr.com/projects">Aprender de proyectos exitosos</a></li>
      </ol>
      
      <p>¿Listo para dar el siguiente paso? <a href="https://calendly.com/admin-stratumpr/30min">Agenda tu consulta gratuita ahora</a></p>
      
      <br>
      <p style="color: #666; font-size: 12px;">Has sido agregado a nuestra lista de correo para recibir actualizaciones del blog.</p>
      <p style="color: #666; font-size: 12px;">Stratum PR - La Arquitectura de Mejores Decisiones</p>
    `
    : `
      <h1>Your IT Readiness Assessment Results</h1>
      <h2>Your Score: ${score}/30</h2>
      <h3>${assessment.title}</h3>
      <p>${assessment.description}</p>
      
      <h3>Recommended Next Steps:</h3>
      <ol>
        <li><strong>Schedule a free consultation</strong> - <a href="https://www.stratumpr.com/contact">Talk to our team</a> about your specific needs</li>
        <li><strong>Explore our services</strong> - <a href="https://www.stratumpr.com/services">See how we can help</a></li>
        <li><strong>View case studies</strong> - <a href="https://www.stratumpr.com/projects">Learn from successful projects</a></li>
      </ol>
      
      <p>Ready to take the next step? <a href="https://calendly.com/admin-stratumpr/30min">Schedule your free consultation now</a></p>
      
      <br>
      <p style="color: #666; font-size: 12px;">You've been added to our mailing list to receive blog updates.</p>
      <p style="color: #666; font-size: 12px;">Stratum PR - The Architecture of Better Decisions</p>
    `

  return sendEmail({
    to: email,
    subject,
    html
  })
}

// Send new blog post notification
export async function sendBlogNotification(
  to: string[],
  blogTitle: string,
  blogExcerpt: string,
  blogSlug: string,
  language: 'en' | 'es' = 'en'
) {
  const subject = language === 'es'
    ? `Nuevo artículo: ${blogTitle}`
    : `New article: ${blogTitle}`
  
  // Send to multiple recipients with their language preferences
  // Note: In production, you'd want to store language preferences per email
  return Promise.all(to.map(email => {
    // Generate unsubscribe token for each recipient
    const unsubscribeToken = btoa(`${email}-${Date.now()}`).replace(/[^a-zA-Z0-9]/g, '');
    
    const html = getBlogNotificationTemplate(blogTitle, blogExcerpt, blogSlug, {
      email,
      language,
      unsubscribeToken
    });
    
    const text = getBlogNotificationPlainText(blogTitle, blogExcerpt, blogSlug, {
      email,
      language,
      unsubscribeToken
    });
    
    return sendEmail({
      to: email,
      subject,
      html,
      text, // Plain text version for better deliverability
      from: 'Stratum PR <info@stratumpr.com>', // Newsletter emails from info@stratumpr.com (auto-fallback if not verified)
      replyTo: 'contact@stratumpr.com'
    });
  }))
}


