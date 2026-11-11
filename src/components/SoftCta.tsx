import { Link } from "@/components/LocalizedLink";
import { useLanguage } from "@/contexts/LanguageContext";

const COPY = {
  es: {
    title: "¿Quieres saber dónde está tu planta?",
    body: "La autoevaluación toma unos minutos y te da una lista de pendientes con fuentes oficiales. Si prefieres conversar, escríbenos.",
    selfcheck: "Hacer la autoevaluación",
    contact: "Contáctanos",
  },
  en: {
    title: "Want to know where your plant stands?",
    body: "The self-check takes a few minutes and gives you a to-do list with official sources. If you'd rather talk, write to us.",
    selfcheck: "Take the self-check",
    contact: "Contact us",
  },
};

/** Closing call to action on answer and guide pages: the self-check first, contact second. */
export function SoftCta() {
  const { language } = useLanguage();
  const c = COPY[language === "en" ? "en" : "es"];
  return (
    <section className="mt-14 rounded-3xl border border-primary/10 bg-white px-6 py-8 md:px-10" aria-labelledby="soft-cta-heading">
      <h2 id="soft-cta-heading" className="font-telegraf text-xl font-bold text-primary md:text-2xl">
        {c.title}
      </h2>
      <p className="mt-2 max-w-[60ch] font-telegraf text-base text-neutral-700">{c.body}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/autoevaluacion"
          className="inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl bg-primary px-6 py-3 font-telegraf font-semibold text-white transition-colors hover:bg-primary/90 sm:w-auto"
        >
          {c.selfcheck}
        </Link>
        <Link
          to="/contact"
          className="inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl border border-primary/30 px-6 py-3 font-telegraf font-semibold text-primary transition-colors hover:bg-primary/5 sm:w-auto"
        >
          {c.contact}
        </Link>
      </div>
    </section>
  );
}
