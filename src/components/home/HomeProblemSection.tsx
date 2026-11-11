import { Link } from "@/components/LocalizedLink";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Pinned flat to the corkboard, so a short contact shadow instead of a floating one
const PAPER_SHADOW = "shadow-[0_6px_14px_rgba(40,20,5,0.35)]";

// Push-pin head colors (glossy highlight, base, rim)
const PIN_COLORS = {
  red: "bg-[radial-gradient(circle_at_35%_30%,#ff9a9a,#d32f2f_55%,#7f1010)]",
  blue: "bg-[radial-gradient(circle_at_35%_30%,#9cc8ff,#1e5bb8_55%,#0d2d66)]",
  yellow: "bg-[radial-gradient(circle_at_35%_30%,#fff3a6,#e0b400_55%,#7a6000)]",
  green: "bg-[radial-gradient(circle_at_35%_30%,#a8e6a1,#2e8b3a_55%,#11451a)]",
} as const;

function Pin({ color, className = "left-1/2 -translate-x-1/2" }: { color: keyof typeof PIN_COLORS; className?: string }) {
  return (
    <span
      className={`absolute -top-2 z-10 h-4 w-4 rounded-full shadow-[1px_3px_3px_rgba(0,0,0,0.45)] ${PIN_COLORS[color]} ${className}`}
    />
  );
}

// Cork texture: two offset dot grids over a warm base
const CORK =
  "bg-[#c49a6c] [background-image:radial-gradient(rgba(92,56,24,0.28)_1px,transparent_1.6px),radial-gradient(rgba(255,238,210,0.22)_1px,transparent_1.6px)] [background-size:7px_7px,11px_11px] [background-position:0_0,3px_5px]";

// Small sticky notes piled around the papers: the pending tasks that never stop arriving
const STICKIES: { key: string; pin: keyof typeof PIN_COLORS; className: string }[] = [
  { key: "home.problem.sticky1", pin: "blue", className: "right-[4%] top-[0%] w-[34%] max-w-[170px] rotate-[8deg] bg-[#f7c6d0] text-[#5a1f2c]" },
  { key: "home.problem.sticky2", pin: "red", className: "hidden md:block left-[38%] top-[2%] w-[30%] max-w-[150px] -rotate-[4deg] bg-[#cfe4f7] text-[#16324f]" },
  { key: "home.problem.sticky3", pin: "yellow", className: "left-[0%] top-[42%] w-[36%] max-w-[180px] rotate-[3deg] bg-[#d4ecc9] text-[#22401a]" },
  { key: "home.problem.sticky4", pin: "green", className: "right-[0%] top-[58%] md:top-[52%] w-[40%] md:w-[36%] max-w-[180px] -rotate-[7deg] bg-[#fbd9a8] text-[#5a3a0e]" },
  { key: "home.problem.sticky5", pin: "blue", className: "hidden md:block left-[44%] top-[44%] w-[30%] max-w-[150px] rotate-[11deg] bg-[#f6e98f] text-[#3a3410]" },
  { key: "home.problem.sticky6", pin: "red", className: "right-[3%] bottom-0 md:right-[6%] md:bottom-[2%] w-[34%] max-w-[170px] rotate-[5deg] bg-[#f7c6d0] text-[#5a1f2c]" },
  { key: "home.problem.sticky7", pin: "yellow", className: "hidden md:block left-[2%] bottom-[30%] w-[28%] max-w-[140px] -rotate-[10deg] bg-[#cfe4f7] text-[#16324f]" },
];

/** The "papers" a plant really runs on today: a handwritten log, a broken spreadsheet, a sticky note. */
function PaperPile() {
  const { t } = useLanguage();
  return (
    <div className="relative mx-auto h-[440px] w-full max-w-[520px] md:h-[540px]" aria-hidden>
      {/* Corkboard behind the notes: wood frame, cork texture, inner shadow */}
      <div
        className={`absolute -inset-3 rounded-xl border-[10px] border-[#8a5a33] shadow-[0_24px_50px_rgba(0,0,0,0.35),inset_0_2px_10px_rgba(60,30,8,0.45)] md:-inset-6 md:border-[12px] ${CORK}`}
      />
      {/* Mobile positions first (narrow pile, papers spread so stickies never cover their text); md+ is the original collage */}
      <div
        className={`absolute left-0 top-0 w-[58%] max-w-[300px] -rotate-3 rounded bg-[#fbf8ef] px-4 py-3 text-[#2b2b2b] md:left-[2%] md:top-[4%] md:w-[62%] md:-rotate-6 md:px-6 md:py-5 ${PAPER_SHADOW}`}
      >
        <Pin color="red" />
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
        <Pin color="blue" className="left-4" />
        <Pin color="blue" className="right-4" />
        {/* A spreadsheet printed on office paper: print header, column letters, row numbers, gridlines, page footer */}
        <div className="font-['Arial',sans-serif] text-[#222]">
          <p className="mb-1.5 flex justify-between gap-2 text-[9px] text-[#777]">
            <span className="truncate">Lotes_2026_FINAL_v3.xlsx</span>
            <span className="shrink-0">{t("home.problem.note2.sheet")}</span>
          </p>
          <table className="w-full table-fixed border-collapse text-[11px] leading-tight md:text-xs">
            <colgroup>
              <col className="w-[14px]" />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr className="bg-[#efefef] text-[9px] font-normal text-[#666]">
                <th className="border border-[#c6c6c6]" />
                <th className="border border-[#c6c6c6] py-px font-normal">A</th>
                <th className="border border-[#c6c6c6] py-px font-normal">B</th>
                <th className="border border-[#c6c6c6] py-px font-normal">C</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#c6c6c6] bg-[#efefef] text-center text-[9px] text-[#666]">1</td>
                <td className="border border-[#c6c6c6] px-1 py-1 font-bold">{t("home.problem.note2.lot")}</td>
                <td className="border border-[#c6c6c6] px-1 py-1 font-bold">{t("home.problem.note2.date")}</td>
                <td className="truncate border border-[#c6c6c6] px-1 py-1 font-bold">{t("home.problem.note2.supplier")}</td>
              </tr>
              <tr>
                <td className="border border-[#c6c6c6] bg-[#efefef] text-center text-[9px] text-[#666]">2</td>
                <td className="border border-[#c6c6c6] px-1 py-1">A-112</td>
                <td className="border border-[#c6c6c6] px-1 py-1 text-right">3/10</td>
                <td className="border border-[#c6c6c6] px-1 py-1">—</td>
              </tr>
              <tr>
                <td className="border border-[#c6c6c6] bg-[#efefef] text-center text-[9px] text-[#666]">3</td>
                <td className="border border-[#c6c6c6] px-1 py-1">A-113</td>
                <td className="border border-[#c6c6c6] px-1 py-1 text-[#b3261e]">#REF!</td>
                <td className="border border-[#c6c6c6] px-1 py-1">?</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-1.5 text-center text-[8px] text-[#999]">{t("home.problem.note2.page")}</p>
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-[6%] w-[54%] max-w-[250px] -rotate-2 rounded-sm bg-[#f6e98f] px-4 py-3 text-[#3a3410] md:bottom-[3%] md:left-[16%] md:w-[50%] md:px-5 md:py-4 ${PAPER_SHADOW}`}
      >
        <Pin color="green" />
        <p className="font-['Caveat',cursive] text-[22px] leading-tight md:text-[26px]">{t("home.problem.note3")}</p>
      </div>
      {STICKIES.map(({ key, pin, className }) => (
        <div key={key} className={`absolute rounded-sm px-3.5 py-2.5 ${PAPER_SHADOW} ${className}`}>
          <Pin color={pin} />
          <p className="font-['Caveat',cursive] text-lg leading-tight md:text-xl">{t(key)}</p>
        </div>
      ))}
    </div>
  );
}

/** "Si te suena familiar…" answer to the section's question, leading into the self-check. */
function AnswerStrip({ stacked = false }: { stacked?: boolean }) {
  const { t } = useLanguage();
  return (
    <div
      className={`flex flex-col gap-5 rounded-2xl bg-[#141d5c] px-5 py-5 ${
        stacked ? "items-start sm:px-6 sm:py-6" : "sm:flex-row sm:items-center sm:justify-between sm:px-7"
      }`}
    >
      <p className="font-telegraf text-lg leading-snug text-white md:text-xl">
        {t("home.problem.answer.lead")}{" "}
        <span className="rounded-md bg-[#E6E09E] px-2 font-semibold text-[#141d5c] [box-decoration-break:clone]">
          {t("home.problem.answer.highlight")}
        </span>
      </p>
      <Link
        to="/autoevaluacion"
        className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#E6E09E] px-6 font-telegraf text-base font-bold text-[#141d5c] transition-colors hover:bg-white"
      >
        {t("home.problem.answer.cta")}
        <ArrowRight className="h-5 w-5" aria-hidden />
      </Link>
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
          <h2
            id="problem-heading"
            className="mb-9 font-telegraf text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.025em] [text-wrap:balance]"
          >
            {t("home.problem.title")}
          </h2>
          <p className="border-y border-white/20 py-4 font-telegraf text-base leading-relaxed text-[#e6e9f5] md:py-5 md:text-lg">
            {t("home.problem.body")}
          </p>
        </div>
      </div>

      {/* Answer to the question above, full width under the corkboard */}
      <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6 md:mt-16 lg:px-8">
        <AnswerStrip />
      </div>
    </section>
  );
}
