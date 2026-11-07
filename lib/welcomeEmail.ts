/**
 * Newsletter welcome email, in the branded layout. Built server-side by /api/send-email (type=welcome)
 * with a signed unsubscribe token. Keeps the unsubscribe and language-preference links (CAN-SPAM).
 */
import { renderBrandedEmail } from './emailLayout.js';

const SITE = 'https://www.stratumpr.com';

function prefsUrl(path: string, email: string, token: string): string {
  const params = new URLSearchParams({ email });
  if (token) params.append('token', token);
  return `${SITE}${path}?${params.toString()}`;
}

export function buildWelcomeEmail(email: string, language: 'es' | 'en', token: string): { subject: string; html: string; text: string } {
  const isEs = language === 'es';
  const unsubscribeUrl = prefsUrl('/unsubscribe', email, token);
  const languageUrl = prefsUrl('/email-preferences', email, token);
  const selfCheckUrl = `${SITE}/autoevaluacion`;

  const subject = isEs ? '¡Bienvenido a Stratum PR!' : 'Welcome to Stratum PR!';
  const heading = isEs ? 'Bienvenido a Stratum PR.' : 'Welcome to Stratum PR.';
  const p1 = isEs
    ? 'Gracias por suscribirte. Te escribiremos solo cuando tengamos algo útil para tu planta: cambios en las reglas de la FDA, guías de inocuidad y novedades de Alertas PR.'
    : "Thanks for subscribing. We'll only write when we have something useful for your plant: FDA rule changes, food safety guides and Alertas PR updates.";
  const p2 = isEs
    ? 'Mientras tanto, mira qué tan lista está tu planta para una auditoría. Toma 3 minutos.'
    : "Meanwhile, see how ready your plant is for an audit. It takes 3 minutes.";
  const why = isEs
    ? 'Recibes este correo porque te suscribiste en stratumpr.com.'
    : 'You are getting this email because you subscribed on stratumpr.com.';
  const changeLanguage = isEs ? 'Cambiar idioma' : 'Change language';
  const unsubscribe = isEs ? 'Cancelar suscripción' : 'Unsubscribe';
  const link = (href: string, label: string) => `<a href="${href}" style="color:#1E2B7E;text-decoration:underline;">${label}</a>`;

  const html = renderBrandedEmail({
    lang: language,
    preheader: p1,
    eyebrow: isEs ? 'Suscripción confirmada' : 'Subscription confirmed',
    heading,
    bodyHtml: `<p style="margin:0 0 14px;">${p1}</p><p style="margin:0 0 6px;color:#525252;">${p2}</p>`,
    cta: { label: isEs ? 'Haz la autoevaluación' : 'Take the self-check', href: selfCheckUrl },
    footerNoteHtml: `${why} ${link(languageUrl, changeLanguage)} · ${link(unsubscribeUrl, unsubscribe)}`,
  });

  const text = [
    heading,
    '',
    p1,
    '',
    `${p2} ${selfCheckUrl}`,
    '',
    isEs ? '— El equipo de Stratum PR' : '— The Stratum PR team',
    'stratumpr.com · contact@stratumpr.com',
    '',
    why,
    `${changeLanguage}: ${languageUrl}`,
    `${unsubscribe}: ${unsubscribeUrl}`,
  ].join('\n');

  return { subject, html, text };
}
