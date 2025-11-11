// Beautiful HTML Email Templates for Resend
// Matches website design with primary blue (#266AB2) and accent yellow (#E6E08E)

export interface EmailTemplateData {
  email: string;
  language: 'en' | 'es';
  unsubscribeToken?: string;
}

// Generate unsubscribe URL
function getUnsubscribeUrl(email: string, token?: string): string {
  const baseUrl = 'https://www.stratumpr.com';
  const params = new URLSearchParams({ email });
  if (token) params.append('token', token);
  return `${baseUrl}/unsubscribe?${params.toString()}`;
}

// Generate language preference change URL
function getLanguagePreferenceUrl(email: string, token?: string): string {
  const baseUrl = 'https://www.stratumpr.com';
  const params = new URLSearchParams({ email });
  if (token) params.append('token', token);
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
    whatYoullReceive: 'Como suscriptor, recibirás:',
    bulletins: '📊 Boletines mensuales con las últimas tendencias en análisis de datos e inteligencia empresarial',
    updates: '📝 Actualizaciones exclusivas sobre nuevos artículos, recursos y herramientas prácticas',
    educational: '🎓 Contenido educativo sobre automatización, análisis predictivo y mejores prácticas de datos',
    insights: '💡 Casos de estudio reales y ejemplos de cómo otras empresas están optimizando sus operaciones',
    tips: '⚡ Consejos prácticos y guías paso a paso para implementar soluciones de datos en tu organización',
    benefits: 'Al suscribirte, tendrás acceso a:',
    benefit1: 'Estrategias probadas para reducir trabajo manual y aumentar la eficiencia',
    benefit2: 'Guías prácticas sobre implementación de sistemas de datos y automatización',
    benefit3: 'Análisis de tendencias del mercado y cómo aplicarlas a tu negocio',
    benefit4: 'Recursos descargables y plantillas que puedes usar inmediatamente',
    followUs: 'Síguenos en nuestras redes sociales:',
    changeLanguage: 'Cambiar idioma de preferencia',
    unsubscribe: 'Cancelar suscripción',
    footer: 'Stratum PR - La Arquitectura de Mejores Decisiones',
    tagline: 'Tu socio estratégico para soluciones de inteligencia empresarial en Puerto Rico.'
  } : {
    title: 'Welcome to our newsletter!',
    greeting: 'Hello,',
    welcome: 'Thank you for subscribing to our newsletter. We\'re excited to have you as part of our community and share valuable content that will help you transform your business.',
    whatYoullReceive: 'As a subscriber, you\'ll receive:',
    bulletins: '📊 Monthly bulletins with the latest trends in data analytics and business intelligence',
    updates: '📝 Exclusive updates on new articles, resources, and practical tools',
    educational: '🎓 Educational content on automation, predictive analytics, and data best practices',
    insights: '💡 Real case studies and examples of how other businesses are optimizing their operations',
    tips: '⚡ Practical tips and step-by-step guides to implement data solutions in your organization',
    benefits: 'By subscribing, you\'ll have access to:',
    benefit1: 'Proven strategies to reduce manual work and increase efficiency',
    benefit2: 'Practical guides on implementing data systems and automation',
    benefit3: 'Market trend analysis and how to apply them to your business',
    benefit4: 'Downloadable resources and templates you can use immediately',
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
                <ul style="margin: 0; padding-left: 0; list-style: none; color: #555555; font-size: 15px; line-height: 2;">
                  <li style="margin-bottom: 12px;">✓ ${content.benefit1}</li>
                  <li style="margin-bottom: 12px;">✓ ${content.benefit2}</li>
                  <li style="margin-bottom: 12px;">✓ ${content.benefit3}</li>
                  <li style="margin-bottom: 12px;">✓ ${content.benefit4}</li>
                </ul>
              </div>
              
              <div style="background-color: #f8f9fa; border-left: 4px solid #266AB2; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <p style="margin: 0 0 12px 0; color: #266AB2; font-size: 18px; font-weight: 600;">
                  ${content.whatYoullReceive}
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #555555; font-size: 15px; line-height: 1.8;">
                  <li style="margin-bottom: 10px;">${content.bulletins}</li>
                  <li style="margin-bottom: 10px;">${content.updates}</li>
                  <li style="margin-bottom: 10px;">${content.educational}</li>
                  <li style="margin-bottom: 10px;">${content.insights}</li>
                  <li style="margin-bottom: 10px;">${content.tips}</li>
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
                      <a href="https://linkedin.com/company/stratumpr" style="display: inline-block; text-decoration: none;">
                        <img src="https://cdn.simpleicons.org/linkedin/0077b5" alt="LinkedIn" style="width: 40px; height: 40px; border-radius: 50%;" />
                      </a>
                    </td>
                    <td style="padding: 0 15px;">
                      <a href="https://www.facebook.com/profile.php?id=61577145020919" style="display: inline-block; text-decoration: none;">
                        <img src="https://cdn.simpleicons.org/facebook/1877f2" alt="Facebook" style="width: 40px; height: 40px; border-radius: 50%;" />
                      </a>
                    </td>
                    <td style="padding: 0 15px;">
                      <a href="https://www.instagram.com/stratum.pr/" style="display: inline-block; text-decoration: none;">
                        <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="Instagram" style="width: 40px; height: 40px; border-radius: 50%;" />
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

