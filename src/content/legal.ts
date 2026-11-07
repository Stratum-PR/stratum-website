/**
 * Privacy Policy, Cookie Policy and Terms of Use (Spanish controls; English is a courtesy
 * translation). Structure follows the food-safety software sites we compared (Allera's 2026
 * policy as the model), adapted to Puerto Rico and to the services this site really uses.
 *
 * Keep this file true to the code: if a vendor, cookie or form changes, update it here.
 * Have Puerto Rico counsel review before publishing changes.
 */

export const LEGAL_UPDATED = { es: '7 de noviembre de 2026', en: 'November 7, 2026' };
export const LEGAL_CONTACT_EMAIL = 'contact@stratumpr.com';

export interface LegalTable {
  headers: string[];
  rows: string[][];
}

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: LegalTable;
}

export interface LegalDoc {
  title: string;
  intro: string;
  sections: LegalSection[];
}

type Bilingual = { es: LegalDoc; en: LegalDoc };

// ---------------------------------------------------------------------------
// Privacy Policy
// ---------------------------------------------------------------------------
export const PRIVACY_POLICY: Bilingual = {
  es: {
    title: 'Política de Privacidad',
    intro:
      'Esta política explica qué información recopila Stratum PR LLC ("Stratum PR", "nosotros"), con sede en Trujillo Alto, Puerto Rico, cuando visitas www.stratumpr.com o te comunicas con nosotros, para qué la usamos y qué opciones tienes. La versión en español es la oficial; la versión en inglés es una traducción de cortesía.',
    sections: [
      {
        heading: 'A qué aplica',
        paragraphs: [
          'Aplica a este sitio web y a las comunicaciones de mercadeo relacionadas, como el formulario de contacto, la agenda de conversaciones y el boletín. Los datos que nuestros clientes guardan dentro de nuestra plataforma se rigen por el acuerdo de servicio con cada cliente.',
        ],
      },
      {
        heading: 'Información que recopilamos',
        bullets: [
          'Información que nos das: tu nombre, correo electrónico, teléfono, empresa, industria y el mensaje que envías en el formulario de contacto; tu correo y preferencia de idioma cuando te suscribes al boletín; tu nombre, empresa, correo, teléfono, respuestas y, si lo indicas, cómo nos conociste cuando completas la autoevaluación; y los datos que entregas al agendar una conversación en Calendly.',
          'Información que se recopila automáticamente: la dirección IP, el tipo de navegador y dispositivo, las páginas que visitas y cómo interactúas con ellas. Si aceptas las cookies de análisis, PostHog también graba la sesión (movimientos, clics y desplazamiento), sin lo que escribes en los formularios.',
          'Información guardada en tu dispositivo: tu preferencia de idioma, en el almacenamiento local de tu navegador, y tu decisión sobre cookies, en una cookie.',
        ],
        paragraphs: ['No buscamos recopilar información sensible a través de este sitio. Por favor no la incluyas en tus mensajes.'],
      },
      {
        heading: 'Cómo usamos la información',
        bullets: [
          'Para responder tus preguntas y agendar conversaciones.',
          'Para enviarte el boletín si te suscribiste.',
          'Para entender cómo se usa el sitio y mejorarlo, solo si aceptas las cookies de análisis.',
          'Para proteger el sitio contra abuso, por ejemplo limitando el número de envíos desde una misma dirección IP.',
          'Para cumplir con obligaciones legales.',
        ],
        paragraphs: ['No vendemos tu información personal.'],
      },
      {
        heading: 'Servicios que usamos',
        paragraphs: [
          'Trabajamos con estos proveedores para operar el sitio. Cada uno recibe solo lo necesario para su función y tiene su propia política de privacidad.',
        ],
        table: {
          headers: ['Proveedor', 'Para qué lo usamos', 'Qué información recibe'],
          rows: [
            ['Formspree', 'Recibir los mensajes del formulario de contacto y de la autoevaluación', 'Lo que escribes en el formulario y tus respuestas'],
            ['Resend', 'Enviar correos de confirmación y el boletín', 'Tu correo, nombre y el contenido del correo'],
            ['Calendly', 'Agendar conversaciones (se abre en su sitio)', 'Lo que entregas al agendar'],
            ['PostHog', 'Medir qué páginas se visitan y grabar sesiones sin lo que escribes (solo con tu consentimiento)', 'Datos de navegación, interacciones en la página e identificadores de cookies'],
            ['Vercel', 'Hospedaje del sitio y métricas de rendimiento sin cookies', 'Dirección IP y datos técnicos de la visita'],
            ['Upstash', 'Limitar envíos repetidos a los formularios', 'Dirección IP'],
          ],
        },
      },
      {
        heading: 'Cookies',
        paragraphs: [
          'Solo usamos cookies necesarias, a menos que aceptes las de análisis en el aviso de cookies. Si las aceptas, PostHog nos dice qué páginas se visitan y graba la sesión sin lo que escribes, para mejorar el sitio. Nunca lo usamos para publicidad. La misma cookie de PostHog se comparte con alertas.stratumpr.com y foodtrail.stratumpr.com para reconocer la misma visita entre nuestros sitios.',
          'Puedes cambiar tu decisión en cualquier momento con el botón "Cambiar mis preferencias" al principio de esta página o en nuestra Política de Cookies, donde también están los detalles.',
        ],
      },
      {
        heading: 'Correos y boletín',
        paragraphs: [
          'Solo te enviamos el boletín si te suscribes. Cada correo incluye un enlace para darte de baja, y procesamos las bajas en un máximo de 10 días laborables. Los correos que respondan a tu solicitud, como una confirmación, no son mercadeo.',
        ],
      },
      {
        heading: 'Cuánto tiempo guardamos la información',
        paragraphs: [
          'Guardamos los mensajes y datos de contacto mientras sean necesarios para responderte y mantener la relación, y luego los eliminamos o anonimizamos. Los datos del boletín se guardan hasta que te des de baja. Los datos de análisis se conservan según la configuración de cada proveedor.',
        ],
      },
      {
        heading: 'Seguridad',
        paragraphs: [
          'Usamos conexiones cifradas (HTTPS), acceso limitado a la información y proveedores con medidas de seguridad reconocidas. Ningún sistema es 100% seguro. Si ocurre un incidente que afecte tu información personal, notificaremos a las personas afectadas y a las autoridades según lo requiera la ley aplicable, incluida la Ley Núm. 111 de 2005 de Puerto Rico.',
        ],
      },
      {
        heading: 'Dónde se procesa la información',
        paragraphs: [
          'La mayoría de nuestros proveedores están en Estados Unidos. Tu información puede procesarse fuera de Puerto Rico y fuera del país donde vives.',
        ],
      },
      {
        heading: 'Tus opciones y derechos',
        paragraphs: [
          'Puedes pedirnos acceso a la información que tenemos sobre ti, corregirla o eliminarla, darte de baja del boletín y retirar tu consentimiento a las cookies de análisis. Según dónde vivas, podrías tener derechos adicionales. Escríbenos a contact@stratumpr.com; podríamos pedirte que confirmes tu identidad y te responderemos en un plazo razonable, normalmente dentro de 30 días.',
        ],
      },
      {
        heading: 'Menores de edad',
        paragraphs: [
          'Este sitio está dirigido a negocios y no a menores de 13 años. No recopilamos a sabiendas información de menores. Si crees que un menor nos envió información, escríbenos y la eliminaremos.',
        ],
      },
      {
        heading: 'Cambios a esta política',
        paragraphs: [
          'Si cambiamos esta política, publicaremos la nueva versión aquí con su fecha. Si el cambio es importante, también lo avisaremos en el sitio.',
        ],
      },
      {
        heading: 'Contacto',
        paragraphs: ['Stratum PR LLC, Trujillo Alto, Puerto Rico. Correo: contact@stratumpr.com.'],
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    intro:
      'This policy explains what information Stratum PR LLC ("Stratum PR", "we"), based in Trujillo Alto, Puerto Rico, collects when you visit www.stratumpr.com or contact us, what we use it for and what choices you have. The Spanish version is the official one; this English version is a courtesy translation.',
    sections: [
      {
        heading: 'What this covers',
        paragraphs: [
          'It covers this website and related marketing communications, such as the contact form, booking a conversation and the newsletter. Data our customers store inside our platform is governed by each customer’s service agreement.',
        ],
      },
      {
        heading: 'Information we collect',
        bullets: [
          'Information you give us: your name, email, phone, company, industry and the message you send through the contact form; your email and language preference when you subscribe to the newsletter; your name, company, email, phone, answers and, if you tell us, how you heard about us when you complete the self-check; and the details you provide when booking a conversation on Calendly.',
          'Information collected automatically: IP address, browser and device type, the pages you visit and how you interact with them. If you accept analytics cookies, PostHog also records the session (movements, clicks and scrolling), without what you type in forms.',
          'Information stored on your device: your language preference, in your browser’s local storage, and your cookie choice, in a cookie.',
        ],
        paragraphs: ['We do not seek to collect sensitive information through this site. Please do not include it in your messages.'],
      },
      {
        heading: 'How we use information',
        bullets: [
          'To answer your questions and schedule conversations.',
          'To send you the newsletter if you subscribed.',
          'To understand how the site is used and improve it, only if you accept analytics cookies.',
          'To protect the site from abuse, for example by limiting the number of submissions from one IP address.',
          'To meet legal obligations.',
        ],
        paragraphs: ['We do not sell your personal information.'],
      },
      {
        heading: 'Services we use',
        paragraphs: [
          'We work with these providers to run the site. Each receives only what it needs for its function and has its own privacy policy.',
        ],
        table: {
          headers: ['Provider', 'What we use it for', 'What information it receives'],
          rows: [
            ['Formspree', 'Receiving contact form and self-check submissions', 'What you type in the form and your answers'],
            ['Resend', 'Sending confirmation emails and the newsletter', 'Your email, name and the email content'],
            ['Calendly', 'Booking conversations (opens on its site)', 'What you provide when booking'],
            ['PostHog', 'Measuring which pages are visited and recording sessions without what you type (only with your consent)', 'Browsing data, page interactions and cookie identifiers'],
            ['Vercel', 'Hosting the site and cookieless performance metrics', 'IP address and technical visit data'],
            ['Upstash', 'Limiting repeated form submissions', 'IP address'],
          ],
        },
      },
      {
        heading: 'Cookies',
        paragraphs: [
          'We only use necessary cookies, unless you accept analytics cookies in the cookie notice. If you accept, PostHog tells us which pages are visited and records the session without what you type, to improve the site. We never use it for advertising. The same PostHog cookie is shared with alertas.stratumpr.com and foodtrail.stratumpr.com to recognize the same visit across our sites.',
          'You can change your choice at any time with the "Change my preferences" button at the top of this page or in our Cookie Policy, which also has the details.',
        ],
      },
      {
        heading: 'Emails and newsletter',
        paragraphs: [
          'We only send the newsletter if you subscribe. Every email includes an unsubscribe link, and we process unsubscribes within 10 business days. Emails that respond to your request, such as a confirmation, are not marketing.',
        ],
      },
      {
        heading: 'How long we keep information',
        paragraphs: [
          'We keep messages and contact details while they are needed to answer you and maintain the relationship, and then delete or anonymize them. Newsletter data is kept until you unsubscribe. Analytics data is kept according to each provider’s settings.',
        ],
      },
      {
        heading: 'Security',
        paragraphs: [
          'We use encrypted connections (HTTPS), limited access to information and providers with recognized security measures. No system is 100% secure. If an incident affects your personal information, we will notify affected people and the authorities as required by applicable law, including Puerto Rico Act No. 111 of 2005.',
        ],
      },
      {
        heading: 'Where information is processed',
        paragraphs: [
          'Most of our providers are in the United States. Your information may be processed outside Puerto Rico and outside the country where you live.',
        ],
      },
      {
        heading: 'Your choices and rights',
        paragraphs: [
          'You can ask us for access to the information we hold about you, correct it or delete it, unsubscribe from the newsletter and withdraw your consent to analytics cookies. Depending on where you live, you may have additional rights. Email contact@stratumpr.com; we may ask you to confirm your identity and will respond within a reasonable time, usually within 30 days.',
        ],
      },
      {
        heading: 'Children',
        paragraphs: [
          'This site is aimed at businesses, not children under 13. We do not knowingly collect information from children. If you believe a child sent us information, contact us and we will delete it.',
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'If we change this policy, we will post the new version here with its date. If the change is significant, we will also announce it on the site.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: ['Stratum PR LLC, Trujillo Alto, Puerto Rico. Email: contact@stratumpr.com.'],
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Cookie Policy
// ---------------------------------------------------------------------------
const COOKIE_ROWS_ES = [
  ['stratum_analytics', 'Stratum PR', 'Guarda tu decisión sobre cookies', '6 meses', 'Necesaria'],
  ['site-language', 'Stratum PR (almacenamiento local)', 'Guarda tu idioma', 'Hasta que borres los datos del sitio', 'Necesaria'],
  ['ph_<clave>_posthog', 'PostHog (compartida con *.stratumpr.com)', 'Distinguir visitantes y unir las páginas de una misma sesión', '1 año', 'Análisis'],
];

const COOKIE_ROWS_EN = [
  ['stratum_analytics', 'Stratum PR', 'Stores your cookie choice', '6 months', 'Necessary'],
  ['site-language', 'Stratum PR (local storage)', 'Stores your language', 'Until you clear site data', 'Necessary'],
  ['ph_<key>_posthog', 'PostHog (shared with *.stratumpr.com)', 'Distinguish visitors and join the pages of one session', '1 year', 'Analytics'],
];

export const COOKIE_POLICY: Bilingual = {
  es: {
    title: 'Política de Cookies',
    intro:
      'Esta política explica qué cookies y tecnologías parecidas usa www.stratumpr.com, para qué sirven y cómo controlarlas. Complementa nuestra Política de Privacidad.',
    sections: [
      {
        heading: 'Qué son las cookies',
        paragraphs: [
          'Las cookies son archivos pequeños que un sitio guarda en tu navegador. El almacenamiento local es parecido: guarda datos en tu dispositivo para recordar, por ejemplo, tu idioma.',
        ],
      },
      {
        heading: 'Cómo pedimos tu consentimiento',
        paragraphs: [
          'Cuando visitas el sitio por primera vez, te mostramos un aviso con dos opciones: "Aceptar" o "Solo necesarias". Hasta que elijas, solo usamos cookies necesarias. PostHog solo se carga si aceptas. Si no, el sitio funciona igual.',
        ],
      },
      {
        heading: 'Categorías',
        bullets: [
          'Necesarias: guardan tu decisión sobre cookies y tu idioma. No requieren consentimiento porque el sitio las necesita para funcionar como pediste.',
          'Análisis: PostHog, para saber qué páginas se visitan y grabar la sesión sin lo que escribes. Solo con tu consentimiento y nunca para publicidad.',
          'Mercadeo: no usamos cookies de mercadeo ni de publicidad.',
        ],
        paragraphs: [
          'Vercel, nuestro proveedor de hospedaje, mide visitas y rendimiento sin usar cookies.',
          'Calendly se abre en su propio sitio cuando agendas una conversación; allí aplican sus cookies y su política.',
        ],
      },
      {
        heading: 'Lista de cookies',
        table: { headers: ['Nombre', 'Proveedor', 'Para qué sirve', 'Duración', 'Categoría'], rows: COOKIE_ROWS_ES },
        paragraphs: ['Los nombres y duraciones de terceros pueden cambiar según cada proveedor; revisamos esta lista periódicamente.'],
      },
      {
        heading: 'Cómo cambiar tu decisión',
        paragraphs: [
          'Usa el botón "Cambiar mis preferencias" en esta página para volver a ver el aviso. Si dejas de aceptar, PostHog deja de medir de inmediato. También puedes borrar o bloquear cookies desde la configuración de tu navegador.',
        ],
      },
      {
        heading: 'Contacto',
        paragraphs: ['Si tienes preguntas sobre esta política, escríbenos a contact@stratumpr.com.'],
      },
    ],
  },
  en: {
    title: 'Cookie Policy',
    intro:
      'This policy explains which cookies and similar technologies www.stratumpr.com uses, what they are for and how to control them. It complements our Privacy Policy.',
    sections: [
      {
        heading: 'What cookies are',
        paragraphs: [
          'Cookies are small files a site stores in your browser. Local storage is similar: it keeps data on your device to remember, for example, your language.',
        ],
      },
      {
        heading: 'How we ask for your consent',
        paragraphs: [
          'When you first visit the site, we show a notice with two options: "Accept" or "Only necessary". Until you choose, we only use necessary cookies. PostHog only loads if you accept. If you don’t, the site works the same.',
        ],
      },
      {
        heading: 'Categories',
        bullets: [
          'Necessary: store your cookie choice and your language. They do not require consent because the site needs them to work as you asked.',
          'Analytics: PostHog, to learn which pages are visited and record the session without what you type. Only with your consent and never for advertising.',
          'Marketing: we do not use marketing or advertising cookies.',
        ],
        paragraphs: [
          'Vercel, our hosting provider, measures visits and performance without cookies.',
          'Calendly opens on its own site when you book a conversation; its cookies and policy apply there.',
        ],
      },
      {
        heading: 'Cookie list',
        table: { headers: ['Name', 'Provider', 'Purpose', 'Duration', 'Category'], rows: COOKIE_ROWS_EN },
        paragraphs: ['Third-party names and durations may change at each provider’s discretion; we review this list periodically.'],
      },
      {
        heading: 'How to change your choice',
        paragraphs: [
          'Use the "Change my preferences" button on this page to see the notice again. If you stop accepting, PostHog stops measuring right away. You can also delete or block cookies in your browser settings.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: ['If you have questions about this policy, email contact@stratumpr.com.'],
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Terms of Use
// ---------------------------------------------------------------------------
export const TERMS_OF_USE: Bilingual = {
  es: {
    title: 'Términos de Uso',
    intro:
      'Estos términos aplican al uso del sitio www.stratumpr.com, operado por Stratum PR LLC, con sede en Trujillo Alto, Puerto Rico. Al usar el sitio aceptas estos términos. La versión en español es la oficial.',
    sections: [
      {
        heading: 'Alcance',
        paragraphs: [
          'Estos términos cubren el sitio web y su contenido público. El uso de nuestra plataforma y de nuestros servicios se rige por acuerdos separados con cada cliente.',
        ],
      },
      {
        heading: 'Información general, no asesoría',
        paragraphs: [
          'El contenido del sitio, incluidas las preguntas frecuentes, la autoevaluación y los recursos sobre FSMA, SQF, BRCGS y otros temas, es información general. No es asesoría legal, regulatoria ni profesional. Cada empresa es responsable de su propio cumplimiento y debe confirmar los requisitos en las fuentes oficiales que le aplican.',
        ],
      },
      {
        heading: 'Propiedad intelectual',
        paragraphs: [
          'El contenido, el diseño, el logo y las marcas del sitio pertenecen a Stratum PR o a sus licenciantes. Puedes ver, citar y compartir el contenido para uso personal o para uso interno de tu negocio, siempre que menciones a Stratum PR como fuente y enlaces a la página original.',
        ],
      },
      {
        heading: 'Buscadores y asistentes de inteligencia artificial',
        paragraphs: [
          'Permitimos que los buscadores y los asistentes de inteligencia artificial lean, indexen, resuman y citen las páginas públicas del sitio, siempre que respeten nuestro archivo robots.txt y un ritmo razonable de solicitudes. Agradecemos que enlacen a la fuente.',
        ],
      },
      {
        heading: 'Usos no permitidos',
        bullets: [
          'Extraer contenido de forma masiva o automatizada que sobrecargue el sitio, o evadir límites de solicitudes, robots.txt u otros controles de acceso.',
          'Intentar acceder a áreas no públicas, probar vulnerabilidades o interferir con la seguridad del sitio.',
          'Copiar el sitio en forma masiva para publicar un servicio que compita con el nuestro.',
          'Recopilar datos de contacto o enviar spam a través de los formularios.',
          'Suplantar a otra persona, enviar información falsa o usar el sitio para fines ilegales.',
        ],
      },
      {
        heading: 'Formularios y mensajes',
        paragraphs: [
          'Lo que envías por los formularios debe ser cierto y debe ser tuyo para compartir. Usaremos esa información para responderte según nuestra Política de Privacidad. Si nos envías sugerencias o comentarios, podemos usarlos sin obligación contigo.',
        ],
      },
      {
        heading: 'Sitios y servicios de terceros',
        paragraphs: [
          'El sitio enlaza a servicios de terceros, como Calendly, las redes sociales y las fuentes oficiales citadas en las preguntas frecuentes. Esos sitios tienen sus propios términos y políticas, y no somos responsables por su contenido.',
        ],
      },
      {
        heading: 'Sin garantías',
        paragraphs: [
          'El sitio y su contenido se ofrecen "tal como están" y "según disponibilidad". Hacemos un esfuerzo razonable por mantener la información correcta y actualizada, pero no garantizamos que esté libre de errores ni que el sitio funcione sin interrupciones.',
        ],
      },
      {
        heading: 'Limitación de responsabilidad',
        paragraphs: [
          'En la medida máxima permitida por la ley de Puerto Rico, Stratum PR no será responsable por daños indirectos, incidentales o consecuentes que surjan del uso del sitio. En la medida permitida por la ley, nuestra responsabilidad total por el uso del sitio no excederá cien dólares (US$100).',
        ],
      },
      {
        heading: 'Indemnización',
        paragraphs: [
          'Si usas el sitio en violación de estos términos, aceptas responder por los reclamos que resulten de ese uso.',
        ],
      },
      {
        heading: 'Ley aplicable y jurisdicción',
        paragraphs: [
          'Estos términos se rigen por las leyes del Estado Libre Asociado de Puerto Rico y por las leyes federales aplicables. Cualquier controversia se atenderá en los tribunales con jurisdicción en Puerto Rico.',
        ],
      },
      {
        heading: 'Cambios',
        paragraphs: [
          'Podemos actualizar estos términos. La versión vigente siempre estará en esta página con su fecha. Si alguna parte se declara inválida, el resto sigue vigente.',
        ],
      },
      {
        heading: 'Contacto',
        paragraphs: ['Stratum PR LLC, Trujillo Alto, Puerto Rico. Correo: contact@stratumpr.com.'],
      },
    ],
  },
  en: {
    title: 'Terms of Use',
    intro:
      'These terms apply to your use of www.stratumpr.com, operated by Stratum PR LLC, based in Trujillo Alto, Puerto Rico. By using the site you accept these terms. The Spanish version is the official one.',
    sections: [
      {
        heading: 'Scope',
        paragraphs: [
          'These terms cover the website and its public content. Use of our platform and services is governed by separate agreements with each customer.',
        ],
      },
      {
        heading: 'General information, not advice',
        paragraphs: [
          'The site’s content, including the FAQ, the self-check and the resources on FSMA, SQF, BRCGS and other topics, is general information. It is not legal, regulatory or professional advice. Each company is responsible for its own compliance and should confirm requirements with the official sources that apply to it.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'The site’s content, design, logo and marks belong to Stratum PR or its licensors. You may view, quote and share the content for personal use or your business’s internal use, as long as you credit Stratum PR as the source and link to the original page.',
        ],
      },
      {
        heading: 'Search engines and AI assistants',
        paragraphs: [
          'We allow search engines and AI assistants to read, index, summarize and cite the site’s public pages, as long as they respect our robots.txt file and a reasonable request rate. We appreciate a link back to the source.',
        ],
      },
      {
        heading: 'Prohibited uses',
        bullets: [
          'Bulk or automated content extraction that overloads the site, or evading rate limits, robots.txt or other access controls.',
          'Trying to access non-public areas, probing for vulnerabilities or interfering with the site’s security.',
          'Copying the site in bulk to publish a service that competes with ours.',
          'Harvesting contact data or sending spam through the forms.',
          'Impersonating someone else, submitting false information or using the site for illegal purposes.',
        ],
      },
      {
        heading: 'Forms and messages',
        paragraphs: [
          'What you submit through the forms must be accurate and yours to share. We will use it to respond to you under our Privacy Policy. If you send us suggestions or feedback, we may use them without obligation to you.',
        ],
      },
      {
        heading: 'Third-party sites and services',
        paragraphs: [
          'The site links to third-party services, such as Calendly, social networks and the official sources cited in the FAQ. Those sites have their own terms and policies, and we are not responsible for their content.',
        ],
      },
      {
        heading: 'No warranties',
        paragraphs: [
          'The site and its content are provided "as is" and "as available". We make a reasonable effort to keep information accurate and current, but we do not guarantee it is error-free or that the site will run without interruption.',
        ],
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          'To the fullest extent permitted by Puerto Rico law, Stratum PR will not be liable for indirect, incidental or consequential damages arising from use of the site. To the extent permitted by law, our total liability for use of the site will not exceed one hundred US dollars (US$100).',
        ],
      },
      {
        heading: 'Indemnification',
        paragraphs: ['If you use the site in violation of these terms, you agree to answer for claims that result from that use.'],
      },
      {
        heading: 'Governing law and venue',
        paragraphs: [
          'These terms are governed by the laws of the Commonwealth of Puerto Rico and applicable federal law. Any dispute will be heard in the courts with jurisdiction in Puerto Rico.',
        ],
      },
      {
        heading: 'Changes',
        paragraphs: [
          'We may update these terms. The current version will always be on this page with its date. If any part is found invalid, the rest remains in effect.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: ['Stratum PR LLC, Trujillo Alto, Puerto Rico. Email: contact@stratumpr.com.'],
      },
    ],
  },
};
