import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CALENDLY_URL } from "@/constants/links";
import { logger } from "@/lib/logger";

export function HomeFinalCtaSection() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const { subscribeToBlog } = await import("@/services/resend");
      await subscribeToBlog(email, language === "es" ? "es" : "en");
      setStatus("success");
      setEmail("");
    } catch (error) {
      logger.error("Home subscription error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="noticias" className="scroll-mt-16 bg-topo px-4 py-16 text-center text-white md:py-24" aria-labelledby="final-cta-heading">
      <h2 id="final-cta-heading" className="font-telegraf text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.025em] [text-wrap:balance]">
        {t("home.finalCta.title")}
      </h2>
      <p className="mx-auto mb-8 mt-3 max-w-xl font-telegraf text-lg text-white/80">{t("home.finalCta.subtitle")}</p>

      {status === "success" ? (
        <p role="status" className="mx-auto max-w-xl rounded-2xl bg-white/10 px-6 py-4 font-telegraf text-lg">
          {t("home.finalCta.success")}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-xl flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <label htmlFor="home-news-email" className="sr-only">
            {t("home.finalCta.emailLabel")}
          </label>
          <input
            id="home-news-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("home.finalCta.emailPlaceholder")}
            className="h-14 w-full min-w-0 rounded-2xl sm:w-auto sm:flex-[1_1_220px] border-0 px-5 font-telegraf text-lg text-black"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="h-14 w-full rounded-2xl bg-white px-8 sm:w-auto font-telegraf text-lg font-semibold text-primary transition-colors hover:bg-[#E6E09E] disabled:opacity-60"
          >
            {status === "loading" ? t("home.finalCta.subscribing") : t("home.finalCta.subscribe")}
          </button>
        </form>
      )}
      {status === "error" && (
        <p role="alert" className="mt-3 font-telegraf text-base text-[#E6E09E]">
          {t("home.finalCta.error")}
        </p>
      )}

      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-[44px] items-center font-telegraf font-semibold text-white underline-offset-4 hover:underline"
      >
        {t("home.finalCta.orBook")}
      </a>
    </section>
  );
}
