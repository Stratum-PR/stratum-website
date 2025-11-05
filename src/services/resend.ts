// Resend Email Service
// This handles all email communications including blog subscriptions and checklist results
// NOTE: API key is kept secure on the server - never exposed to browser

const API_ENDPOINT = 'https://api.resend.com/emails'

interface EmailData {
  to: string
  subject: string
  html: string
  from?: string
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
        html: data.html
      })
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error('Email API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: responseData
      })
      throw new Error(responseData.message || `Failed to send email: ${response.statusText}`)
    }

    return responseData.data || responseData
  } catch (error: any) {
    console.error('Email sending error:', error)
    // Provide helpful error messages
    if (error.message?.includes('CORS') || error.message?.includes('Failed to fetch') || error.message?.includes('network')) {
      throw new Error('Email service is not available. Please try again later or contact support.')
    }
    throw error
  }
}

// Subscribe to blog updates
export async function subscribeToBlog(email: string, language: 'en' | 'es' = 'en') {
  // Admin email will be handled by the serverless function
  // The serverless function reads ADMIN_EMAIL from environment variables
  const adminEmail = 'contact@stratumpr.com' // Fallback, but server will use ADMIN_EMAIL env var
  
  // Send welcome email to subscriber
  const subject = language === 'es' 
    ? 'Bienvenido al Blog de Stratum PR' 
    : 'Welcome to Stratum PR Blog'
  
  const html = language === 'es'
    ? `
      <h1>¡Gracias por suscribirte!</h1>
      <p>Has sido agregado a nuestra lista de correo. Recibirás actualizaciones cuando publiquemos nuevos artículos del blog.</p>
      <p>¿Necesitas ayuda con tus sistemas de datos? <a href="https://www.stratumpr.com/contact">Contáctanos</a></p>
      <br>
      <p style="color: #666; font-size: 12px;">Stratum PR - La Arquitectura de Mejores Decisiones</p>
    `
    : `
      <h1>Thanks for subscribing!</h1>
      <p>You've been added to our mailing list. You'll receive updates when we publish new blog posts.</p>
      <p>Need help with your data systems? <a href="https://www.stratumpr.com/contact">Contact us</a></p>
      <br>
      <p style="color: #666; font-size: 12px;">Stratum PR - The Architecture of Better Decisions</p>
    `

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

  // Send both emails
  await Promise.all([
    sendEmail({
      to: email,
      subject,
      html
    }),
    sendEmail({
      to: adminEmail,
      subject: adminSubject,
      html: adminHtml
    })
  ])
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
      
      <p>¿Listo para dar el siguiente paso? <a href="https://calendly.com/jrodriguez4917/30min">Agenda tu consulta gratuita ahora</a></p>
      
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
      
      <p>Ready to take the next step? <a href="https://calendly.com/jrodriguez4917/30min">Schedule your free consultation now</a></p>
      
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
    ? `Nuevo Post: ${blogTitle}`
    : `New Post: ${blogTitle}`
  
  const blogUrl = `https://www.stratumpr.com/blog/${blogSlug}`
  
  const html = language === 'es'
    ? `
      <h1>Nuevo Artículo del Blog</h1>
      <h2>${blogTitle}</h2>
      <p>${blogExcerpt}</p>
      <p><a href="${blogUrl}" style="background-color: #1E2B7E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Leer Más</a></p>
      <br>
      <p style="color: #666; font-size: 12px;">Stratum PR - La Arquitectura de Mejores Decisiones</p>
    `
    : `
      <h1>New Blog Post</h1>
      <h2>${blogTitle}</h2>
      <p>${blogExcerpt}</p>
      <p><a href="${blogUrl}" style="background-color: #1E2B7E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Read More</a></p>
      <br>
      <p style="color: #666; font-size: 12px;">Stratum PR - The Architecture of Better Decisions</p>
    `

  // Send to multiple recipients
  return Promise.all(to.map(email => 
    sendEmail({
      to: email,
      subject,
      html
    })
  ))
}


