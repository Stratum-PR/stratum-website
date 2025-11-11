// Beautiful HTML Email Templates for Resend
// Matches website design with primary blue (#266AB2) and accent yellow (#E6E08E)

export interface EmailTemplateData {
  email: string;
  language: 'en' | 'es';
  unsubscribeToken?: string;
}

// Generate unsubscribe URL
function getUnsubscribeUrl(email: string, token?: string): string {
  // Use production URL for emails - this ensures links work in production
  // For local testing, users can manually navigate to /unsubscribe
  const baseUrl = 'https://www.stratumpr.com';
  const params = new URLSearchParams();
  params.append('email', email);
  if (token) {
    params.append('token', token);
  }
  return `${baseUrl}/unsubscribe?${params.toString()}`;
}

// Generate language preference change URL
function getLanguagePreferenceUrl(email: string, token?: string): string {
  // Use production URL for emails - this ensures links work in production
  // For local testing, users can manually navigate to /email-preferences
  const baseUrl = 'https://www.stratumpr.com';
  const params = new URLSearchParams();
  params.append('email', email);
  if (token) {
    params.append('token', token);
  }
  return `${baseUrl}/email-preferences?${params.toString()}`;
}

// Welcome Email Template
export function getWelcomeEmailTemplate(data: EmailTemplateData): string {
  const { email, language, unsubscribeToken } = data;
  const unsubscribeUrl = getUnsubscribeUrl(email, unsubscribeToken);
  const languageUrl = getLanguagePreferenceUrl(email, unsubscribeToken);
  
  const isSpanish = language === 'es';
  
  const content = isSpanish ? {
    title: '¡Bienvenido a nuestro boletín!',
    greeting: 'Hola,',
    welcome: 'Gracias por suscribirte a nuestro boletín. Estamos emocionados de tenerte como parte de nuestra comunidad y compartir contigo contenido valioso que te ayudará a transformar tu negocio.',
    bulletins: 'Boletines con nuevos artículos, recursos y herramientas prácticas',
    educational: 'Contenido educativo sobre automatización, análisis predictivo y mejores prácticas de datos',
    insights: 'Casos de estudio reales y ejemplos de cómo otras empresas están optimizando sus operaciones',
    tips: 'Consejos prácticos y guías paso a paso para implementar soluciones de datos en tu organización',
    benefits: 'Como suscriptor, recibirás:',
    followUs: 'Síguenos en nuestras redes sociales:',
    changeLanguage: 'Cambiar idioma de preferencia',
    unsubscribe: 'Cancelar suscripción',
    footer: 'Stratum PR - La Arquitectura de Mejores Decisiones',
    tagline: 'Tu socio estratégico para soluciones de inteligencia empresarial en Puerto Rico.'
  } : {
    title: 'Welcome to our newsletter!',
    greeting: 'Hello,',
    welcome: 'Thank you for subscribing to our newsletter. We\'re excited to have you as part of our community and share valuable content that will help you transform your business.',
    bulletins: 'Bulletins with new articles, resources, and practical tools',
    educational: 'Educational content on automation, predictive analytics, and data best practices',
    insights: 'Real case studies and examples of how other businesses are optimizing their operations',
    tips: 'Practical tips and step-by-step guides to implement data solutions in your organization',
    benefits: 'As a subscriber, you\'ll receive:',
    followUs: 'Follow us on social media:',
    changeLanguage: 'Change language preference',
    unsubscribe: 'Unsubscribe',
    footer: 'Stratum PR - The Architecture of Better Decisions',
    tagline: 'Your strategic partner for business intelligence solutions in Puerto Rico.'
  };

  return `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header with gradient background and colored logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #266AB2 0%, #1E2B7E 100%); padding: 40px 30px; text-align: center;">
              <img src="https://www.stratumpr.com/StratumPR_Logo4.svg" alt="Stratum PR" style="height: 60px; margin-bottom: 20px; max-width: 200px;" />
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; line-height: 1.3;">
                ${content.title}
              </h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                ${content.greeting}
              </p>
              
              <p style="margin: 0 0 30px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                ${content.welcome}
              </p>
              
              <!-- Benefits Section with Image -->
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); border: 2px solid #E6E08E; border-radius: 8px; padding: 25px; margin: 30px 0; text-align: center;">
                <img src="https://www.stratumpr.com/img/working_zoom.jpeg" alt="Data Analytics" style="width: 100%; max-width: 400px; height: auto; border-radius: 6px; margin-bottom: 20px;" />
                <p style="margin: 0 0 15px 0; color: #266AB2; font-size: 20px; font-weight: 700;">
                  ${content.benefits}
                </p>
                <ul style="margin: 0; padding-left: 0; list-style: none; color: #555555; font-size: 15px; line-height: 2; text-align: left; max-width: 500px; margin: 0 auto;">
                  <li style="margin-bottom: 12px;">• ${content.bulletins}</li>
                  <li style="margin-bottom: 12px;">• ${content.educational}</li>
                  <li style="margin-bottom: 12px;">• ${content.insights}</li>
                  <li style="margin-bottom: 12px;">• ${content.tips}</li>
                </ul>
              </div>
              
              <!-- Social Media Links with Icons -->
              <div style="margin: 40px 0; text-align: center;">
                <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; font-weight: 600;">
                  ${content.followUs}
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                  <tr>
                    <td style="padding: 0 15px;">
                      <a href="https://www.linkedin.com/company/stratumpr" target="_blank" style="display: inline-block; text-decoration: none;">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="#0077b5" xmlns="http://www.w3.org/2000/svg" style="border-radius: 50%;">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </td>
                    <td style="padding: 0 15px;">
                      <a href="https://www.facebook.com/profile.php?id=61577145020919" target="_blank" style="display: inline-block; text-decoration: none;">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="#1877f2" xmlns="http://www.w3.org/2000/svg" style="border-radius: 50%;">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    </td>
                    <td style="padding: 0 15px;">
                      <a href="https://www.instagram.com/stratum.pr/" target="_blank" style="display: inline-block; text-decoration: none;">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="url(#instagram-gradient)" xmlns="http://www.w3.org/2000/svg" style="border-radius: 50%;">
                          <defs>
                            <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" style="stop-color:#833AB4;stop-opacity:1" />
                              <stop offset="50%" style="stop-color:#FD1D1D;stop-opacity:1" />
                              <stop offset="100%" style="stop-color:#FCAF45;stop-opacity:1" />
                            </linearGradient>
                          </defs>
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="https://www.stratumpr.com" style="display: inline-block; padding: 14px 32px; background-color: #E6E08E; color: #1E2B7E; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  ${isSpanish ? 'Visitar nuestro sitio web' : 'Visit our website'}
                </a>
              </div>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px; line-height: 1.6;">
                ${content.tagline}
              </p>
              <p style="margin: 0 0 20px 0; color: #999999; font-size: 12px;">
                ${content.footer}
              </p>
              
              <!-- Preferences Links -->
              <div style="margin: 25px 0; text-align: center;">
                <a href="${languageUrl}" style="color: #266AB2; text-decoration: underline; font-size: 13px; margin-right: 20px;">
                  ${content.changeLanguage}
                </a>
                <a href="${unsubscribeUrl}" style="display: inline-block; color: #dc2626; text-decoration: none; font-size: 13px; padding: 8px 16px; border: 1px solid #dc2626; border-radius: 4px; background-color: #ffffff; font-weight: 600;">
                  ${content.unsubscribe}
                </a>
              </div>
              
              <p style="margin: 20px 0 0 0; color: #999999; font-size: 11px; line-height: 1.5;">
                ${isSpanish 
                  ? 'Has recibido este correo porque te suscribiste a nuestro boletín. Si no deseas recibir más correos, puedes cancelar tu suscripción usando el enlace de arriba.'
                  : 'You received this email because you subscribed to our newsletter. If you no longer wish to receive emails, you can unsubscribe using the link above.'}
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Blog Post Notification Template
export function getBlogNotificationTemplate(
  blogTitle: string,
  blogExcerpt: string,
  blogSlug: string,
  data: EmailTemplateData
): string {
  const { email, language, unsubscribeToken } = data;
  const unsubscribeUrl = getUnsubscribeUrl(email, unsubscribeToken);
  const blogUrl = `https://www.stratumpr.com/newsupdates/${blogSlug}`;
  const isSpanish = language === 'es';
  
  const content = isSpanish ? {
    subject: `Nuevo artículo: ${blogTitle}`,
    title: 'Nuevo artículo en nuestro blog',
    readMore: 'Leer artículo completo',
    unsubscribe: 'Cancelar suscripción',
    footer: 'Stratum PR - La Arquitectura de Mejores Decisiones'
  } : {
    subject: `New article: ${blogTitle}`,
    title: 'New article on our blog',
    readMore: 'Read full article',
    unsubscribe: 'Unsubscribe',
    footer: 'Stratum PR - The Architecture of Better Decisions'
  };

  return `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #266AB2 0%, #1E2B7E 100%); padding: 30px; text-align: center;">
              <img src="https://www.stratumpr.com/Stratum_Icon_whiteline%20ver%202.svg" alt="Stratum PR" style="height: 40px; margin-bottom: 12px;" />
              <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">
                ${content.title}
              </h2>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h1 style="margin: 0 0 20px 0; color: #1E2B7E; font-size: 24px; font-weight: bold; line-height: 1.3;">
                ${blogTitle}
              </h1>
              
              <p style="margin: 0 0 30px 0; color: #555555; font-size: 16px; line-height: 1.7;">
                ${blogExcerpt}
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${blogUrl}" style="display: inline-block; padding: 14px 32px; background-color: #E6E08E; color: #1E2B7E; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  ${content.readMore}
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #999999; font-size: 12px;">
                ${content.footer}
              </p>
              <a href="${unsubscribeUrl}" style="color: #999999; text-decoration: underline; font-size: 11px;">
                ${content.unsubscribe}
              </a>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

