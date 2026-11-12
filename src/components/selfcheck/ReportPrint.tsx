import { createPortal } from "react-dom";
import { ITEMS, TIERS, type Tier } from "@/content/selfcheck";
import { CALENDLY_URL } from "@/constants/links";
import "./report-print.css";

/**
 * The self-check report laid out for a US Letter PDF. It lives outside #root (portal) and is
 * hidden on screen; "Descargar PDF" adds body.printing-report and calls window.print(), so only
 * this report prints. Links stay clickable in the saved PDF.
 */
interface Props {
  lang: "es" | "en";
  t: (key: string) => string;
  business: string;
  name: string;
  folio: string;
  issuedLong: string;
  issuedShort: string;
  result: { pct: number; points: number; max: number; tier: Tier; pending: string[] };
  priorities: number;
  stamps: { title: string; ok: number; n: number; done: boolean }[];
}

const RING_C = 2 * Math.PI * 52;
const TIER_CLASS: Record<Tier, string> = { ready: "is-ready", close: "is-close", gaps: "is-gaps" };

/** A CSS string literal (quotes and backslashes escaped) for @page margin-box content. */
const cssString = (text: string) => JSON.stringify(text);

const shortUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

const ReportPrint = ({ lang, t, business, name, folio, issuedLong, issuedShort, result, priorities, stamps }: Props) =>
  createPortal(
    <div className="report-print font-telegraf" aria-hidden>
      <header className="rp-top">
        <img src="/img/stratum-logo-color.svg" alt="Stratum" width={958} height={180} className="rp-logo" />
        <div className="rp-meta">
          <b>{t("selfcheck.passport.title")}</b>
          <span>
            {t("selfcheck.passport.no")} {folio}
          </span>
          <span>{issuedLong}</span>
        </div>
      </header>

      <h1 className="rp-business">{business || "—"}</h1>
      <p className="rp-sub">
        {t("selfcheck.pdf.subtitle")}
        {name ? ` · ${t("selfcheck.pdf.preparedFor")} ${name}` : ""}
      </p>

      <section className="rp-hero">
        <div className="rp-ring">
          <svg viewBox="0 0 120 120" width="130" height="130" aria-hidden>
            <circle cx="60" cy="60" r="52" fill="none" stroke="#E2E5EC" strokeWidth="11" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="#1e2b7e"
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray={RING_C}
              strokeDashoffset={RING_C * (1 - result.points / result.max)}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div>
            <b>{result.pct}%</b>
            <small>
              {result.points}/{result.max} {t("selfcheck.points")}
            </small>
          </div>
        </div>
        <div>
          <span className={`rp-tier ${TIER_CLASS[result.tier]}`}>{TIERS[result.tier].label[lang]}</span>
          <p className="rp-tier-body">{TIERS[result.tier].body[lang]}</p>
          <div className="rp-stats">
            <div>
              <small>{t("selfcheck.passport.pending")}</small>
              <b>{result.pending.length}</b>
            </div>
            <div>
              <small>{t("selfcheck.passport.priorities")}</small>
              <b>{priorities}</b>
            </div>
            <div>
              <small>{t("selfcheck.passport.issued")}</small>
              <b>{issuedShort}</b>
            </div>
          </div>
        </div>
      </section>

      <h2 className="rp-h2">{t("selfcheck.passport.stamps")}</h2>
      <div className="rp-seals">
        {stamps.map((st) => (
          <div key={st.title} className={`rp-seal ${st.done ? "is-done" : ""}`}>
            <span>{st.done ? "✓" : `${st.ok}/${st.n}`}</span>
            <small>{st.title}</small>
          </div>
        ))}
      </div>

      {result.pending.length > 0 && (
        <>
          <h2 className="rp-h2">
            {t("selfcheck.todo")} ({result.pending.length})
          </h2>
          <ol className="rp-list">
            {result.pending.map((k, i) => {
              const it = ITEMS[k];
              return (
                <li key={k}>
                  <span className="rp-num">{i + 1}</span>
                  <div>
                    <p className="rp-item-title">
                      {it.title[lang]}
                      {it.block && <span className="rp-badge">{t("selfcheck.priority")}</span>}
                    </p>
                    <p className="rp-item-todo">{it.todo[lang]}</p>
                    {it.url && (
                      <p className="rp-src">
                        {t("selfcheck.officialSource")}: <a href={it.url}>{shortUrl(it.url)}</a>
                      </p>
                    )}
                    <p className="rp-work">
                      ☐ {t("selfcheck.pdf.done")} &nbsp;&nbsp; {t("selfcheck.pdf.owner")}: ______________ &nbsp;&nbsp;{" "}
                      {t("selfcheck.pdf.due")}: __________
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </>
      )}

      <section className="rp-cta">
        <div>
          <b>{t("selfcheck.cta.title")}</b>
          <p>{t("selfcheck.cta.body")}</p>
        </div>
        <a href={CALENDLY_URL}>{shortUrl(CALENDLY_URL)}</a>
      </section>

      {/* Footer on every page, in the page margin (Chromium; other browsers skip it) */}
      <style>{`@media print { @page {
        @bottom-left { content: ${cssString(t("selfcheck.pdf.footer"))}; font: 9px "PP Telegraf", system-ui, sans-serif; color: #8a8a8a; }
        @bottom-right { content: ${cssString(`${t("selfcheck.passport.no")} ${folio} · ${t("selfcheck.pdf.page")} `)} counter(page) ${cssString(` ${t("selfcheck.pdf.of")} `)} counter(pages); font: 9px "PP Telegraf", system-ui, sans-serif; color: #8a8a8a; }
      } }`}</style>
    </div>,
    document.body
  );

export default ReportPrint;
