// "¿Cómo nos conociste?" options. The keys are shared with Alertas PR and FoodTrail, so the
// answers can be compared across sites: don't rename them.
type Label = { es: string; en: string };

export const HEARD_FROM: ReadonlyArray<{ key: string; label: Label }> = [
  { key: "google", label: { es: "Google", en: "Google" } },
  { key: "social", label: { es: "Facebook / Instagram", en: "Facebook / Instagram" } },
  { key: "linkedin", label: { es: "LinkedIn", en: "LinkedIn" } },
  { key: "referral", label: { es: "Un amigo o colega", en: "A friend or colleague" } },
  { key: "event", label: { es: "Evento o feria", en: "Event or trade show" } },
  { key: "association", label: { es: "Asociación o gremio", en: "Association or trade group" } },
  { key: "news", label: { es: "Noticias", en: "News" } },
  { key: "ai", label: { es: "Inteligencia artificial (IA)", en: "Artificial intelligence (AI)" } },
  { key: "other", label: { es: "Otro", en: "Other" } },
];

export const HEARD_FROM_AI: ReadonlyArray<{ key: string; label: Label }> = [
  { key: "chatgpt", label: { es: "ChatGPT", en: "ChatGPT" } },
  { key: "gemini", label: { es: "Gemini", en: "Gemini" } },
  { key: "claude", label: { es: "Claude", en: "Claude" } },
  { key: "copilot", label: { es: "Copilot", en: "Copilot" } },
  { key: "perplexity", label: { es: "Perplexity", en: "Perplexity" } },
  { key: "other_ai", label: { es: "Otra", en: "Other" } },
];

export const HEARD_FROM_OTHER_MAX = 100;
