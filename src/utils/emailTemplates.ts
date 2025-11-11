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
    title: '¡Bienvenido a Stratum PR!',
    greeting: 'Hola,',
    welcome: 'Gracias por suscribirte a nuestro boletín. Estamos emocionados de tenerte como parte de nuestra comunidad.',
    whatYoullReceive: 'Recibirás:',
    bulletins: 'Boletines con las últimas actualizaciones',
    updates: 'Actualizaciones sobre nuevos artículos y recursos',
    educational: 'Contenido educativo sobre análisis de datos y automatización',
    followUs: 'Síguenos en nuestras redes sociales:',
    changeLanguage: 'Cambiar idioma de preferencia',
    unsubscribe: 'Cancelar suscripción',
    footer: 'Stratum PR - La Arquitectura de Mejores Decisiones',
    tagline: 'Tu socio estratégico para soluciones de inteligencia empresarial en Puerto Rico.'
  } : {
    title: 'Welcome to Stratum PR!',
    greeting: 'Hello,',
    welcome: 'Thank you for subscribing to our newsletter. We\'re excited to have you as part of our community.',
    whatYoullReceive: 'You\'ll receive:',
    bulletins: 'Bulletins with the latest updates',
    updates: 'Updates on new articles and resources',
    educational: 'Educational content on data analytics and automation',
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
          
          <!-- Header with gradient background -->
          <tr>
            <td style="background: linear-gradient(135deg, #266AB2 0%, #1E2B7E 100%); padding: 40px 30px; text-align: center;">
              <img src="https://www.stratumpr.com/Stratum_Icon_whiteline%20ver%202.svg" alt="Stratum PR" style="height: 48px; margin-bottom: 16px;" />
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
              
              <div style="background-color: #f8f9fa; border-left: 4px solid #266AB2; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <p style="margin: 0 0 12px 0; color: #266AB2; font-size: 18px; font-weight: 600;">
                  ${content.whatYoullReceive}
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #555555; font-size: 15px; line-height: 1.8;">
                  <li style="margin-bottom: 8px;">${content.bulletins}</li>
                  <li style="margin-bottom: 8px;">${content.updates}</li>
                  <li style="margin-bottom: 8px;">${content.educational}</li>
                </ul>
              </div>
              
              <!-- Social Media Links -->
              <div style="margin: 40px 0; text-align: center;">
                <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; font-weight: 600;">
                  ${content.followUs}
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                  <tr>
                    <td style="padding: 0 10px;">
                      <a href="https://linkedin.com/company/stratumpr" style="display: inline-block; padding: 12px 24px; background-color: #0077b5; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">LinkedIn</a>
                    </td>
                    <td style="padding: 0 10px;">
                      <a href="https://www.facebook.com/profile.php?id=61577145020919" style="display: inline-block; padding: 12px 24px; background-color: #1877f2; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">Facebook</a>
                    </td>
                    <td style="padding: 0 10px;">
                      <a href="https://www.instagram.com/stratum.pr/" style="display: inline-block; padding: 12px 24px; background-color: #E4405F; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">Instagram</a>
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
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 20px 0;">
                <tr>
                  <td style="padding: 0 10px;">
                    <a href="${languageUrl}" style="color: #266AB2; text-decoration: underline; font-size: 12px;">
                      ${content.changeLanguage}
                    </a>
                  </td>
                  <td style="padding: 0 10px; color: #cccccc;">|</td>
                  <td style="padding: 0 10px;">
                    <a href="${unsubscribeUrl}" style="color: #999999; text-decoration: underline; font-size: 12px;">
                      ${content.unsubscribe}
                    </a>
                  </td>
                </tr>
              </table>
              
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

