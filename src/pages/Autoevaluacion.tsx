import { useEffect, useMemo, useState } from "react";
import { Link } from "@/components/LocalizedLink";
import { ArrowLeft, ArrowRight, Check, Download, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { SELFCHECK_ROUTE } from "@/config/discoverable-routes";
import { CALENDLY_URL, FORMSPREE_URL } from "@/constants/links";
import { BUSINESS, ITEMS, STEPS, TIERS, itemApplies, scoreAnswers, type Question } from "@/content/selfcheck";
import { HEARD_FROM, HEARD_FROM_AI, HEARD_FROM_OTHER_MAX } from "@/content/heardFrom";
import { logger } from "@/lib/logger";
import { track } from "@/lib/analytics";
import ReportPrint from "@/components/selfcheck/ReportPrint";
import "./passport.css";

type Screen = "step" | "contact" | "result";

const TIER_STYLE = {
  ready: "bg-[#E6F4EE] text-[#1b7a4c]",
  close: "bg-[#FCF1DF] text-[#9A5B00]",
  gaps: "bg-[#FDECEA] text-[#B3261E]",
} as const;

const RING_C = 2 * Math.PI * 52;
const STAMP_ROT = [-8, 6, -4, 9];

// Which step each scored item belongs to, for the per-area marks on the report card
const ITEM_STEP: Record<string, number> = {};
STEPS.forEach((s, i) =>
  s.questions.forEach((q) => {
    if (q.type === "single") ITEM_STEP[q.item] = i;
    if (q.type === "multi") q.items.forEach((it) => (ITEM_STEP[it.item] = i));
  })
);

// Atrás / Siguiente: pinned to the bottom of the screen on mobile, inline (static) from md up
const NAV_BAR_CLASS =
  "sticky bottom-0 z-10 -mx-4 flex flex-nowrap items-center justify-between gap-3 border-t border-primary/10 bg-[#FAFAF8]/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:static md:mx-0 md:flex-wrap md:bg-transparent md:px-0 md:pb-0 md:pt-6 md:backdrop-blur-none";

const inputClass =
  "h-12 w-full rounded-2xl border border-primary/20 bg-white px-4 font-telegraf text-base text-[#0b1215] outline-none transition-colors focus:border-primary";

const Autoevaluacion = () => {
  const { t, language } = useLanguage();
  const lang = language === "es" ? "es" : "en";
  const [screen, setScreen] = useState<Screen>("step");
  const [step, setStep] = useState(0);
  const [single, setSingle] = useState<Record<string, number>>({});
  const [multi, setMulti] = useState<Record<string, boolean>>({});
  const [contact, setContact] = useState({ name: "", business: "", email: "", phone: "", consent: false });
  // "¿Cómo nos conociste?": optional; each follow-up only counts for its own answer
  const [heard, setHeard] = useState({ from: "", ai: "", other: "" });
  // "Otro" business type: optional free text, sent with the lead only (never to analytics)
  const [businessOther, setBusinessOther] = useState("");
  const [sending, setSending] = useState(false);
  const [ringReady, setRingReady] = useState(false);
  const [folio] = useState(() => `SPR-${Math.floor(100000 + Math.random() * 900000)}`);

  const result = useMemo(() => scoreAnswers(single, multi), [single, multi]);
  const current = STEPS[step];
  // A step is complete when every single/pick question has an answer (checklists may stay empty)
  const stepDone = current.questions.every((q) => q.type === "multi" || single[q.id] != null);
  const contactValid =
    contact.name.trim() && contact.business.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) && contact.consent;

  // Let the score ring sweep from 0 once the report is on screen
  useEffect(() => {
    if (screen !== "result") return setRingReady(false);
    const id = requestAnimationFrame(() => setRingReady(true));
    return () => cancelAnimationFrame(id);
  }, [screen]);

  // Funnel events (only with analytics consent): which screen each visitor reaches, so PostHog can
  // show where people leave. Step number and an English step name only; never answers or contact details.
  useEffect(() => {
    if (screen === "step") {
      track("selfcheck_step_viewed", { step: String(step + 1), step_name: STEPS[step].title.en });
    } else if (screen === "contact") {
      track("selfcheck_step_viewed", { step: String(STEPS.length + 1), step_name: "Your details" });
    } else if (screen === "result") {
      track("selfcheck_report_viewed", { tier: result.tier, pct: String(result.pct) });
    }
    // result is read only when the report screen opens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, step]);

  const go = (next: Screen, nextStep = 0) => {
    setScreen(next);
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactValid || sending) return;
    setSending(true);
    // The lead goes to the team inbox; the visitor sees the report either way
    const heardFrom = heard.from || null;
    const heardFromAi = heard.from === "ai" ? heard.ai || null : null;
    const heardFromOther = heard.from === "other" ? heard.other.trim().slice(0, HEARD_FROM_OTHER_MAX) || null : null;
    // Unscored context answers (business type, food sales): Spanish label for the lead, English for analytics
    const pickAnswer = (id: string, l: "es" | "en") => {
      const q = STEPS.flatMap((s) => s.questions).find((x) => x.id === id);
      return q?.type === "pick" && single[id] != null ? q.opts[single[id]][l] : "";
    };
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Autoevaluación: ${contact.business} (${result.pct}%)`,
          _replyto: contact.email,
          name: contact.name,
          business: contact.business,
          email: contact.email,
          phone: contact.phone,
          business_type: pickAnswer("business", "es"),
          business_type_other: single.business === BUSINESS.other ? businessOther.trim().slice(0, HEARD_FROM_OTHER_MAX) : "",
          food_sales: pickAnswer("sales", "es"),
          consent: true,
          language: lang,
          score: `${result.points}/${result.max} (${result.pct}%)`,
          tier: TIERS[result.tier].label.es,
          pending: result.pending.map((k) => ITEMS[k].title.es).join("; "),
          source: "stratumpr.com/autoevaluacion",
          heard_from: heardFrom ?? "",
          heard_from_ai: heardFromAi ?? "",
          heard_from_other: heardFromOther ?? "",
        }),
      });
      if (!response.ok) logger.error("Self-check lead was not accepted:", response.status);
      // Funnel event only, no contact details; sent only with analytics consent
      track("selfcheck_submitted", {
        heard_from: heardFrom,
        heard_from_ai: heardFromAi,
        business_type: pickAnswer("business", "en") || null,
        food_sales: pickAnswer("sales", "en") || null,
      });
    } catch (error) {
      logger.error("Self-check lead failed to send:", error);
    }
    setSending(false);
    go("result");
  };

  const renderQuestion = (q: Question) => {
    const optionClass = (on: boolean) =>
      `flex w-full items-center gap-3 rounded-2xl border px-5 py-4 text-left font-telegraf text-base transition-colors ${
        on ? "border-primary bg-primary/[0.06] text-[#0b1215]" : "border-primary/15 bg-white text-neutral-700 hover:border-primary/40"
      }`;
    const mark = (on: boolean, round: boolean) => (
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center border-2 ${round ? "rounded-full" : "rounded-md"} ${
          on ? "border-primary bg-primary text-white" : "border-primary/30"
        }`}
        aria-hidden
      >
        {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </span>
    );

    return (
      <fieldset key={q.id} className="mb-10">
        <legend className="mb-2 font-telegraf text-xl font-bold text-[#0b1215] md:text-2xl">{q.q[lang]}</legend>
        {q.help && <p className="mb-4 font-telegraf text-sm text-neutral-500">{q.help[lang]}</p>}
        <div className={`space-y-2.5 ${q.help ? "" : "mt-4"}`} role={q.type === "multi" ? "group" : "radiogroup"}>
          {q.type === "multi"
            ? q.items.filter((it) => itemApplies(it.item, single)).map((it) => {
                const on = !!multi[it.item];
                return (
                  <button
                    key={it.item}
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    onClick={() => setMulti((m) => ({ ...m, [it.item]: !on }))}
                    className={optionClass(on)}
                  >
                    {mark(on, false)}
                    <span>
                      {it.label[lang]}
                      {it.sub && <span className="mt-1 block text-sm text-neutral-500">{it.sub[lang]}</span>}
                    </span>
                  </button>
                );
              })
            : (q.type === "pick" ? q.opts : q.opts.map((o) => o.label)).map((label, i) => {
                const on = single[q.id] === i;
                return (
                  <button
                    key={label.es}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setSingle((s) => ({ ...s, [q.id]: i }))}
                    className={optionClass(on)}
                  >
                    {mark(on, true)}
                    <span>{label[lang]}</span>
                  </button>
                );
              })}
        </div>
        {q.id === "business" && single.business === BUSINESS.other && (
          <label className="mt-4 block">
            <span className="mb-1.5 block font-telegraf text-sm font-semibold text-[#0b1215]">{t("selfcheck.businessOther")}</span>
            <input
              type="text"
              name="business_other"
              maxLength={HEARD_FROM_OTHER_MAX}
              value={businessOther}
              onChange={(e) => setBusinessOther(e.target.value)}
              className={inputClass}
            />
          </label>
        )}
      </fieldset>
    );
  };

  const stamps = STEPS.map((s, i) => {
    const items = result.applicable.filter((k) => ITEM_STEP[k] === i);
    const ok = items.filter((k) => (result.scores[k] ?? 0) === 2).length;
    return { title: s.title[lang], ok, n: items.length, done: items.length > 0 && ok === items.length };
  });
  const issued = new Date().toLocaleDateString(lang === "es" ? "es-PR" : "en-US", { day: "numeric", month: "short", year: "numeric" });
  const priorities = result.pending.filter((k) => ITEMS[k].block).length;
  const issuedLong = new Date().toLocaleDateString(lang === "es" ? "es-PR" : "en-US", { day: "numeric", month: "long", year: "numeric" });

  // "Descargar PDF": print only the report (see ReportPrint); the document title becomes the file name
  const downloadPdf = () => {
    const previousTitle = document.title;
    const slug = (contact.business || "Stratum").replace(/[\/:*?"<>|]+/g, "").trim();
    document.title = `${t("selfcheck.passport.title")} - ${slug}`;
    document.body.classList.add("printing-report");
    const restore = () => {
      document.body.classList.remove("printing-report");
      document.title = previousTitle;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    track("selfcheck_pdf_downloaded", { tier: result.tier, pct: String(result.pct) });
    window.print();
  };
  // Question and contact screens: smaller hero on mobile so the form starts above the fold
  const compact = screen === "step" || screen === "contact";

  return (
    <>
      <PageMeta route={SELFCHECK_ROUTE} />
      <section
        className={`bg-topo px-4 text-white md:pb-12 md:pt-32 ${compact ? "pb-6 pt-20" : "pb-12 pt-28"}`}
        aria-labelledby="selfcheck-heading"
      >
        <div className={`mx-auto ${screen === "result" ? "max-w-6xl" : "max-w-3xl"}`}>
          <p
            className={`font-telegraf text-sm font-medium uppercase tracking-[0.14em] text-[#E6E09E] md:mb-4 ${compact ? "mb-2" : "mb-4"}`}
          >
            {t("selfcheck.eyebrow")}
          </p>
          <h1
            id="selfcheck-heading"
            className={`font-telegraf font-bold leading-[1.05] tracking-[-0.03em] md:text-[clamp(2rem,5vw,3.25rem)] ${
              compact ? "text-2xl" : "text-[clamp(2rem,5vw,3.25rem)]"
            }`}
          >
            {screen === "result" ? t("selfcheck.result.title") : t("selfcheck.title")}
          </h1>
          {(screen === "step" || screen === "contact") && (
            <div className="mt-4 md:mt-8" aria-label={`${t("selfcheck.step")} ${screen === "contact" ? STEPS.length + 1 : step + 1} / ${STEPS.length + 1}`}>
              <p className="mb-2 font-telegraf text-sm text-white/70">
                {t("selfcheck.step")} {screen === "contact" ? STEPS.length + 1 : step + 1} {t("selfcheck.of")} {STEPS.length + 1} ·{" "}
                {screen === "contact" ? t("selfcheck.contact.stepTitle") : current.title[lang]}
              </p>
              <div className="flex gap-1.5" aria-hidden>
                {[...STEPS, null].map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${screen === "contact" || i <= step ? "bg-[#E6E09E]" : "bg-white/20"}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className={`bg-[#FAFAF8] px-4 md:py-16 ${compact ? "pb-4 pt-8" : "py-12"}`}>
        {screen === "step" && (
          <div className="mx-auto max-w-3xl">
            {current.questions.map(renderQuestion)}
            <div className={NAV_BAR_CLASS}>
              {/* No "Atrás" on the first question: the self-check starts there (keeps "Siguiente" on the right) */}
              <button
                type="button"
                onClick={() => go("step", step - 1)}
                disabled={step === 0}
                aria-hidden={step === 0}
                tabIndex={step === 0 ? -1 : undefined}
                className={`inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-2xl px-2 font-telegraf font-semibold text-primary hover:bg-primary/5 md:px-4 ${step === 0 ? "invisible" : ""}`}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                {t("selfcheck.back")}
              </button>
              <button
                type="button"
                disabled={!stepDone}
                onClick={() => (step < STEPS.length - 1 ? go("step", step + 1) : go("contact"))}
                className="inline-flex min-h-[52px] items-center gap-2 rounded-2xl bg-primary px-6 font-telegraf text-base font-semibold text-white transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40 md:px-8 md:text-lg"
              >
                {t("selfcheck.next")}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </div>
        )}

        {screen === "contact" && (
          <form onSubmit={submitContact} className="mx-auto max-w-3xl" noValidate>
            <h2 className="mb-2 font-telegraf text-2xl font-bold text-[#0b1215]">{t("selfcheck.contact.title")}</h2>
            <p className="mb-8 font-telegraf text-base text-neutral-600">{t("selfcheck.contact.body")}</p>
            <div className="grid gap-5 sm:grid-cols-2">
              {(
                [
                  ["name", "selfcheck.contact.name", "text", "name", true],
                  ["business", "selfcheck.contact.business", "text", "organization", true],
                  ["email", "selfcheck.contact.email", "email", "email", true],
                  ["phone", "selfcheck.contact.phone", "tel", "tel", false],
                ] as const
              ).map(([key, label, type, auto, required]) => (
                <label key={key} className="block">
                  <span className="mb-1.5 block font-telegraf text-sm font-semibold text-[#0b1215]">
                    {t(label)}
                    {required ? " *" : ""}
                  </span>
                  <input
                    type={type}
                    autoComplete={auto}
                    required={required}
                    value={contact[key]}
                    onChange={(e) => setContact((c) => ({ ...c, [key]: e.target.value }))}
                    className={inputClass}
                  />
                </label>
              ))}
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block font-telegraf text-sm font-semibold text-[#0b1215]">{t("selfcheck.contact.heardFrom")}</span>
                <select
                  name="heard_from"
                  value={heard.from}
                  onChange={(e) => setHeard({ from: e.target.value, ai: "", other: "" })}
                  className={`${inputClass} ${heard.from ? "" : "text-neutral-500"}`}
                >
                  <option value="">{t("selfcheck.contact.heardFrom.placeholder")}</option>
                  {HEARD_FROM.map((o) => (
                    <option key={o.key} value={o.key}>
                      {o.label[lang]}
                    </option>
                  ))}
                </select>
              </label>
              {heard.from === "ai" && (
                <label className="block">
                  <span className="mb-1.5 block font-telegraf text-sm font-semibold text-[#0b1215]">{t("selfcheck.contact.heardFromAi")}</span>
                  <select
                    name="heard_from_ai"
                    value={heard.ai}
                    onChange={(e) => setHeard((h) => ({ ...h, ai: e.target.value }))}
                    className={`${inputClass} ${heard.ai ? "" : "text-neutral-500"}`}
                  >
                    <option value="">{t("selfcheck.contact.heardFrom.placeholder")}</option>
                    {HEARD_FROM_AI.map((o) => (
                      <option key={o.key} value={o.key}>
                        {o.label[lang]}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {heard.from === "other" && (
                <label className="block">
                  <span className="mb-1.5 block font-telegraf text-sm font-semibold text-[#0b1215]">{t("selfcheck.contact.heardFromOther")}</span>
                  <input
                    type="text"
                    name="heard_from_other"
                    maxLength={HEARD_FROM_OTHER_MAX}
                    value={heard.other}
                    onChange={(e) => setHeard((h) => ({ ...h, other: e.target.value }))}
                    className={inputClass}
                  />
                </label>
              )}
            </div>
            <label className="mt-6 flex items-start gap-3 font-telegraf text-sm leading-relaxed text-neutral-700">
              <input
                type="checkbox"
                checked={contact.consent}
                onChange={(e) => setContact((c) => ({ ...c, consent: e.target.checked }))}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#1e2b7e]"
              />
              <span>
                {t("selfcheck.contact.consent")}{" "}
                <Link to="/privacy" className="font-semibold text-primary underline">
                  {t("footer.privacy")}
                </Link>
                .
              </span>
            </label>
            <div className={`mt-8 ${NAV_BAR_CLASS}`}>
              <button
                type="button"
                onClick={() => go("step", STEPS.length - 1)}
                className="inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-2xl px-2 font-telegraf font-semibold text-primary hover:bg-primary/5 md:px-4"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                {t("selfcheck.back")}
              </button>
              <button
                type="submit"
                disabled={!contactValid || sending}
                className="inline-flex min-h-[52px] items-center gap-2 rounded-2xl bg-primary px-6 font-telegraf text-base font-semibold text-white transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40 md:px-8 md:text-lg"
              >
                {sending ? t("selfcheck.contact.sending") : t("selfcheck.finish")}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </form>
        )}

        {screen === "result" && (
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
            <aside>
              <article className="passport play font-telegraf" style={{ ["--pct" as string]: result.pct }} aria-label={t("selfcheck.passport.title")}>
                <div className="passport-top">
                  <div className="flex items-center justify-between gap-3">
                    <img src="/img/stratum-logo-white.png" alt="Stratum" width={640} height={120} className="h-6 w-auto" />
                    <div className="text-right">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#E6E09E]">{t("selfcheck.passport.title")}</p>
                      <p className="text-xs text-white/60">
                        {t("selfcheck.passport.no")} {folio}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-xs uppercase tracking-[0.12em] text-white/60">{t("selfcheck.passport.holder")}</p>
                  <p className="text-xl font-bold">{contact.business || "—"}</p>
                  <div className="passport-route" role="img" aria-label={`${result.pct}% ${t("selfcheck.passport.dest")}`}>
                    <div className="passport-end">
                      <b>{t("selfcheck.passport.originShort")}</b>
                      <small>{t("selfcheck.passport.origin")}</small>
                    </div>
                    <div className="passport-track">
                      <i className="passport-fill" />
                      <span className="passport-mark" aria-hidden>
                        {result.pct}%
                      </span>
                    </div>
                    <div className="passport-end text-right">
                      <b>100%</b>
                      <small>{t("selfcheck.passport.dest")}</small>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-5 px-6 py-6">
                  <div className="passport-ring" role="img" aria-label={`${result.points} / ${result.max} ${t("selfcheck.points")}`}>
                    <svg viewBox="0 0 120 120" aria-hidden>
                      <circle cx="60" cy="60" r="52" fill="none" stroke="#E2E5EC" strokeWidth="11" />
                      <circle
                        className="arc"
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="#1e2b7e"
                        strokeWidth="11"
                        strokeLinecap="round"
                        strokeDasharray={RING_C}
                        strokeDashoffset={ringReady ? RING_C * (1 - result.points / result.max) : RING_C}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-primary">{result.pct}%</span>
                      <span className="text-xs text-neutral-500">
                        {result.points}/{result.max}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${TIER_STYLE[result.tier]}`}>
                      {TIERS[result.tier].label[lang]}
                    </span>
                    <p className="mt-2 text-[15px] leading-snug text-neutral-700">{TIERS[result.tier].body[lang]}</p>
                  </div>
                </div>

                <dl className="grid grid-cols-3 gap-1.5 px-4 pb-6 text-center sm:gap-2 sm:px-6">
                  {[
                    [t("selfcheck.passport.pending"), result.pending.length],
                    [t("selfcheck.passport.priorities"), priorities],
                    [t("selfcheck.passport.issued"), issued],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="rounded-2xl bg-[#F3F5FA] px-1 py-3 sm:px-2">
                      <dt className="text-[11px] font-bold uppercase tracking-[0.02em] text-neutral-500 sm:text-xs sm:tracking-[0.08em]">{label}</dt>
                      <dd className="mt-1 text-base font-bold text-[#0b1215]">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="passport-perf" aria-hidden />

                <div className="px-6 py-6">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">{t("selfcheck.passport.stamps")}</p>
                  <ul className="passport-stamps" style={{ ["--n" as string]: stamps.length }}>
                    {stamps.map((st, i) => (
                      <li
                        key={st.title}
                        className={`passport-stamp ${st.done ? "is-done" : ""}`}
                        style={{ ["--r" as string]: `${STAMP_ROT[i % 4]}deg`, ["--i" as string]: i }}
                      >
                        <span className="passport-seal">{st.done ? <Check className="h-7 w-7" strokeWidth={3} aria-hidden /> : `${st.ok}/${st.n}`}</span>
                        <span className="text-xs font-semibold leading-tight text-neutral-600">{st.title}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-primary/10 pt-4 text-center text-xs text-neutral-500">{t("selfcheck.passport.basis")}</p>
                </div>
              </article>
              <button
                type="button"
                onClick={downloadPdf}
                className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-primary/25 bg-white px-6 font-telegraf font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                <Download className="h-5 w-5" aria-hidden />
                {t("selfcheck.pdf.download")}
              </button>
              <ReportPrint
                lang={lang}
                t={t}
                business={contact.business}
                name={contact.name}
                folio={folio}
                issuedLong={issuedLong}
                issuedShort={issued}
                result={result}
                priorities={priorities}
                stamps={stamps}
              />
            </aside>

            <div>
              {result.pending.length > 0 && (
                <>
                  <h2 className="mb-2 font-telegraf text-2xl font-bold text-[#0b1215]">{t("selfcheck.todo")}</h2>
                  <p className="mb-5 font-telegraf text-base text-neutral-600">{t("selfcheck.todo.body")}</p>
                  <ol className="mb-10 space-y-3">
                    {result.pending.map((k) => {
                      const it = ITEMS[k];
                      return (
                        <li key={k} className="rounded-2xl border border-primary/10 bg-white px-6 py-5">
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <h3 className="font-telegraf text-lg font-bold text-[#0b1215]">{it.title[lang]}</h3>
                            {it.block && (
                              <span className="rounded-full bg-[#FDECEA] px-2.5 py-0.5 font-telegraf text-xs font-bold text-[#B3261E]">
                                {t("selfcheck.priority")}
                              </span>
                            )}
                          </div>
                          <p className="font-telegraf text-base leading-relaxed text-neutral-700">{it.todo[lang]}</p>
                          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                            {it.url && (
                              <a href={it.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 font-telegraf text-sm text-secondary hover:underline">
                                {t("selfcheck.officialSource")}
                                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                              </a>
                            )}
                            {it.faq && (
                              <Link to={`/preguntas#${it.faq}`} className="font-telegraf text-sm text-secondary hover:underline">
                                {t("selfcheck.readMore")}
                              </Link>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </>
              )}

              <div className="rounded-3xl bg-topo px-6 py-9 text-center text-white">
                <h2 className="font-telegraf text-2xl font-bold">{t("selfcheck.cta.title")}</h2>
                <p className="mx-auto mt-2 max-w-lg font-telegraf text-white/80">{t("selfcheck.cta.body")}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center rounded-2xl bg-white px-7 font-telegraf font-semibold text-primary hover:bg-[#E6E09E]"
                  >
                    {t("home.hero.cta.primary")}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSingle({});
                      setMulti({});
                      go("step", 0);
                    }}
                    className="inline-flex min-h-[48px] items-center rounded-2xl border border-white/40 px-7 font-telegraf font-semibold text-white hover:bg-white/10"
                  >
                    {t("selfcheck.restart")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Autoevaluacion;
