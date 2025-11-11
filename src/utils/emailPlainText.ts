// Plain Text Versions of Email Templates
// Plain text versions improve deliverability and are required by many email clients

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

// Welcome Email Plain Text Template
export function getWelcomeEmailPlainText(data: EmailTemplateData): string {
  const { email, language, unsubscribeToken } = data;
  const unsubscribeUrl = getUnsubscribeUrl(email, unsubscribeToken);
  const languageUrl = getLanguagePreferenceUrl(email, unsubscribeToken);
  const websiteUrl = 'https://www.stratumpr.com';
  
  const isSpanish = language === 'es';
  
  const content = isSpanish ? {
    title: '¡Bienvenido a nuestro boletín!',
    greeting: 'Hola,',
    welcome: 'Gracias por suscribirte a nuestro boletín. Estamos emocionados de tenerte como parte de nuestra comunidad y compartir contigo contenido valioso que te ayudará a transformar tu negocio.',
    whatYoullReceive: 'Como suscriptor, recibirás:',
    bulletins: '• Boletines mensuales con las últimas tendencias en análisis de datos e inteligencia empresarial',
    updates: '• Actualizaciones exclusivas sobre nuevos artículos, recursos y herramientas prácticas',
    educational: '• Contenido educativo sobre automatización, análisis predictivo y mejores prácticas de datos',
    insights: '• Casos de estudio reales y ejemplos de cómo otras empresas están optimizando sus operaciones',
    tips: '• Consejos prácticos y guías paso a paso para implementar soluciones de datos en tu organización',
    benefits: 'Al suscribirte, tendrás acceso a:',
    benefit1: '• Estrategias probadas para reducir trabajo manual y aumentar la eficiencia',
    benefit2: '• Guías prácticas sobre implementación de sistemas de datos y automatización',
    benefit3: '• Análisis de tendencias del mercado y cómo aplicarlas a tu negocio',
    benefit4: '• Recursos descargables y plantillas que puedes usar inmediatamente',
    followUs: 'Síguenos en nuestras redes sociales:',
    linkedin: 'LinkedIn: https://linkedin.com/company/stratumpr',
    facebook: 'Facebook: https://www.facebook.com/profile.php?id=61577145020919',
    instagram: 'Instagram: https://www.instagram.com/stratum.pr/',
    visitWebsite: 'Visita nuestro sitio web:',
    changeLanguage: 'Cambiar idioma de preferencia',
    unsubscribe: 'Cancelar suscripción',
    footer: 'Stratum PR - La Arquitectura de Mejores Decisiones',
    tagline: 'Tu socio estratégico para soluciones de inteligencia empresarial en Puerto Rico.'
  } : {
    title: 'Welcome to our newsletter!',
    greeting: 'Hello,',
    welcome: 'Thank you for subscribing to our newsletter. We\'re excited to have you as part of our community and share valuable content that will help you transform your business.',
    whatYoullReceive: 'As a subscriber, you\'ll receive:',
    bulletins: '• Monthly bulletins with the latest trends in data analytics and business intelligence',
    updates: '• Exclusive updates on new articles, resources, and practical tools',
    educational: '• Educational content on automation, predictive analytics, and data best practices',
    insights: '• Real case studies and examples of how other businesses are optimizing their operations',
    tips: '• Practical tips and step-by-step guides to implement data solutions in your organization',
    benefits: 'By subscribing, you\'ll have access to:',
    benefit1: '• Proven strategies to reduce manual work and increase efficiency',
    benefit2: '• Practical guides on implementing data systems and automation',
    benefit3: '• Market trend analysis and how to apply them to your business',
    benefit4: '• Downloadable resources and templates you can use immediately',
    followUs: 'Follow us on social media:',
    linkedin: 'LinkedIn: https://linkedin.com/company/stratumpr',
    facebook: 'Facebook: https://www.facebook.com/profile.php?id=61577145020919',
    instagram: 'Instagram: https://www.instagram.com/stratum.pr/',
    visitWebsite: 'Visit our website:',
    changeLanguage: 'Change language preference',
    unsubscribe: 'Unsubscribe',
    footer: 'Stratum PR - The Architecture of Better Decisions',
    tagline: 'Your strategic partner for business intelligence solutions in Puerto Rico.'
  };

  return `
${content.title}

${content.greeting}

${content.welcome}

${content.whatYoullReceive}

${content.bulletins}
${content.updates}
${content.educational}
${content.insights}
${content.tips}

${content.benefits}

${content.benefit1}
${content.benefit2}
${content.benefit3}
${content.benefit4}

${content.followUs}

${content.linkedin}
${content.facebook}
${content.instagram}

${content.visitWebsite}
${websiteUrl}

---

${content.tagline}
${content.footer}

${content.changeLanguage}: ${languageUrl}
${content.unsubscribe}: ${unsubscribeUrl}

You received this email because you subscribed to our newsletter. If you no longer wish to receive emails, you can unsubscribe using the link above.
  `.trim();
}

// Blog Notification Plain Text Template
export function getBlogNotificationPlainText(
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
    title: 'Nuevo artículo en nuestro blog',
    readMore: 'Leer artículo completo',
    unsubscribe: 'Cancelar suscripción',
    footer: 'Stratum PR - La Arquitectura de Mejores Decisiones'
  } : {
    title: 'New article on our blog',
    readMore: 'Read full article',
    unsubscribe: 'Unsubscribe',
    footer: 'Stratum PR - The Architecture of Better Decisions'
  };

  return `
${content.title}

${blogTitle}

${blogExcerpt}

${content.readMore}: ${blogUrl}

---

${content.footer}

${content.unsubscribe}: ${unsubscribeUrl}
  `.trim();
}

