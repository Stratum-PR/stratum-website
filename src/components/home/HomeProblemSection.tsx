import { useLanguage } from "@/contexts/LanguageContext";

const PAINS = [
  "home.problem.card1.body",
  "home.problem.card2.body",
  "home.problem.card3.body",
] as const;

const PAPER_SHADOW = "shadow-[0_24px_50px_rgba(0,0,0,0.35)]";

// Small sticky notes piled around the papers: the pending tasks that never stop arriving
const STICKIES = [
  { key: "home.problem.sticky1", className: "right-[4%] top-[0%] w-[34%] max-w-[170px] rotate-[8deg] bg-[#f7c6d0] text-[#5a1f2c]" },
  { key: "home.problem.sticky2", className: "hidden md:block left-[38%] top-[2%] w-[30%] max-w-[150px] -rotate-[4deg] bg-[#cfe4f7] text-[#16324f]" },
  { key: "home.problem.sticky3", className: "left-[0%] top-[42%] w-[36%] max-w-[180px] rotate-[3deg] bg-[#d4ecc9] text-[#22401a]" },
  { key: "home.problem.sticky4", className: "right-[0%] top-[58%] md:top-[52%] w-[40%] md:w-[36%] max-w-[180px] -rotate-[7deg] bg-[#fbd9a8] text-[#5a3a0e]" },
  { key: "home.problem.sticky5", className: "hidden md:block left-[44%] top-[44%] w-[30%] max-w-[150px] rotate-[11deg] bg-[#f6e98f] text-[#3a3410]" },
  { key: "home.problem.sticky6", className: "right-[3%] bottom-0 md:right-[6%] md:bottom-[2%] w-[34%] max-w-[170px] rotate-[5deg] bg-[#f7c6d0] text-[#5a1f2c]" },
  { key: "home.problem.sticky7", className: "hidden md:block left-[2%] bottom-[30%] w-[28%] max-w-[140px] -rotate-[10deg] bg-[#cfe4f7] text-[#16324f]" },
] as const;

/** The "papers" a plant really runs on today: a handwritten log, a broken spreadsheet, a sticky note. */
function PaperPile() {
  const { t } = useLanguage();
  return (
    <div className="relative mx-auto h-[440px] w-full max-w-[520px] md:h-[540px]" aria-hidden>
      {/* Mobile positions first (narrow pile, papers spread so stickies never cover their text); md+ is the original collage */}
      <div
        className={`absolute left-0 top-0 w-[58%] max-w-[300px] -rotate-3 rounded bg-[#fbf8ef] px-4 py-3 text-[#2b2b2b] md:left-[2%] md:top-[4%] md:w-[62%] md:-rotate-6 md:px-6 md:py-5 ${PAPER_SHADOW}`}
      >
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#6b6455] md:mb-2 md:text-xs">{t("home.problem.note1.title")}</p>
        <p className="font-['Caveat',cursive] text-xl leading-normal md:text-2xl">
          6:00 am — 38°F ✓<br />
          12:00 pm — 39°F ✓<br />
          6:00 pm — <span className="text-[#b3261e]">¿?</span>
        </p>
      </div>
      <div
        className={`absolute right-0 top-[27%] w-[56%] max-w-[270px] rotate-[4deg] rounded bg-white px-3 py-3 text-[#2b2b2b] md:top-[20%] md:rotate-[5deg] md:px-5 md:py-4 ${PAPER_SHADOW}`}
      >
        <p className="mb-2 truncate text-xs font-bold uppercase tracking-[0.08em] text-[#6b6455]">Lotes_2026_FINAL_v3.xlsx</p>
        <div className="grid grid-cols-3 gap-px bg-[#d9dbe1] text-xs">
          <span className="bg-[#eef0f4] p-1.5">{t("home.problem.note2.lot")}</span>
          <span className="bg-[#eef0f4] p-1.5">{t("home.problem.note2.date")}</span>
          <span className="bg-[#eef0f4] p-1.5">{t("home.problem.note2.supplier")}</span>
          <span className="bg-white p-1.5">A-112</span>
          <span className="bg-white p-1.5">3/10</span>
          <span className="bg-white p-1.5">—</span>
          <span className="bg-white p-1.5">A-113</span>
          <span className="bg-white p-1.5">#REF!</span>
          <span className="bg-white p-1.5">?</span>
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-[6%] w-[54%] max-w-[250px] -rotate-2 rounded-sm bg-[#f6e98f] px-4 py-3 text-[#3a3410] md:bottom-[3%] md:left-[16%] md:w-[50%] md:px-5 md:py-4 ${PAPER_SHADOW}`}
      >
        <p className="font-['Caveat',cursive] text-[22px] leading-tight md:text-[26px]">{t("home.problem.note3")}</p>
      </div>
      {STICKIES.map(({ key, className }) => (
        <div key={key} className={`absolute rounded-sm px-3.5 py-2.5 ${PAPER_SHADOW} ${className}`}>
          <p className="font-['Caveat',cursive] text-lg leading-tight md:text-xl">{t(key)}</p>
        </div>
      ))}
    </div>
  );
}

export function HomeProblemSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-topo py-16 text-white md:py-24 entrance-animation" aria-labelledby="problem-heading">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 sm:px-6 lg:flex-row lg:gap-16 lg:px-8">
        <div className="order-last w-full lg:order-none lg:flex-1">
          <PaperPile />
        </div>
        <div className="w-full lg:flex-1">
          <p className="mb-5 font-telegraf text-sm font-medium uppercase tracking-[0.14em] text-[#E6E09E]">
            {t("home.problem.eyebrow")}
          </p>
          <h2
            id="problem-heading"
            className="mb-9 font-telegraf text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.025em] [text-wrap:balance]"
          >
            {t("home.problem.title")}
          </h2>
          <ol className="border-b border-white/20">
            {PAINS.map((key, i) => (
              <li key={key} className="flex gap-5 border-t border-white/20 py-4 md:py-5">
                <span className="min-w-6 font-telegraf text-sm text-[#E6E09E]" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-telegraf text-base leading-relaxed text-[#e6e9f5] md:text-lg">{t(key)}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
