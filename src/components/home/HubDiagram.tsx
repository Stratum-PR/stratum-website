import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import "./hub-diagram.css";

// Each node starts grey and scattered, labelled with the tool it replaces ("before"), then
// settles into the ring, connects to the hub and shows its module name ("after").
const ICONS = {
  users: '<path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1"/><path d="M16 4.5a3 3 0 0 1 0 5.8M21 20v-1a4 4 0 0 0-3-3.9"/>',
  truck: '<path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  box: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>',
  thermo: '<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 11v6"/>',
  capa: '<path d="M9 3h6v3H9z"/><path d="M9 4.5H7a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6.5a2 2 0 0 0-2-2h-2"/><path d="M12 10v4M12 17.5h.01"/>',
  file: '<path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/><path d="M9 13h6M9 17h6"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
};

const NODES = [
  { icon: "users", es: "Suplidores", en: "Suppliers", oldEs: "COAs por correo", oldEn: "COAs by email" },
  { icon: "truck", es: "Recibo", en: "Receiving", oldEs: "Recibo en papel", oldEn: "Paper receiving" },
  { icon: "box", es: "Lotes", en: "Lots", oldEs: "Excel de lotes", oldEn: "Lots in Excel" },
  { icon: "thermo", es: "Temperaturas", en: "Temperatures", oldEs: "Libreta de temperaturas", oldEn: "Temperature notebook" },
  { icon: "capa", es: "Correctivas", en: "Corrective actions", oldEs: "Hallazgos en Excel", oldEn: "Findings in Excel" },
  { icon: "file", es: "Documentos", en: "Documents", oldEs: "Documentos en Drive", oldEn: "Documents in Drive" },
  { icon: "shield", es: "Auditorías", en: "Audits", oldEs: "Carpeta de auditoría", oldEn: "Audit binder" },
] as const;

const TONES = ["#1E2B7E", "#266AB2", "#5FA3DA", "#D9CF6E"]; // navy, blue, sky, sand
const R = 40; // ring radius, % of the square stage
const CUT = 0.42; // how far along node→center the broken "before" cable reaches
const CYCLE_MS = 11000;
const FADE_MS = 450;

const POS = NODES.map((_, i) => {
  const a = ((-90 + (360 / NODES.length) * i) * Math.PI) / 180;
  return { x: 50 + Math.cos(a) * R, y: 50 + Math.sin(a) * R, a };
});
const CUTS = POS.map((p) => ({ x: p.x + (50 - p.x) * CUT, y: p.y + (50 - p.y) * CUT }));
// Scattered "before" offsets follow each node's own direction so tiles look messy without overlapping
const RADIAL = [-24, 20, -16, -20, -20, 18, -16];
const SIDE = [10, -12, 12, -10, 10, -12, 10];
const ROT = [-8, 7, -6, 9, -7, 6, -9];

export function HubDiagram() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const en = language === "en";

  // Loop the before → after story while on screen; no loop for reduced motion (CSS shows the final state)
  useEffect(() => {
    const box = ref.current;
    if (!box || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let timer: number | undefined;
    let fadeTimer: number | undefined;
    const play = () => {
      box.classList.remove("hub-fading", "play");
      void box.offsetWidth; // restart CSS animations
      box.classList.add("play");
      fadeTimer = window.setTimeout(() => box.classList.add("hub-fading"), CYCLE_MS - FADE_MS);
      timer = window.setTimeout(play, CYCLE_MS);
    };
    const stop = () => {
      window.clearTimeout(timer);
      window.clearTimeout(fadeTimer);
      timer = undefined;
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!timer) play();
        } else {
          stop();
          box.classList.remove("hub-fading");
        }
      },
      { threshold: 0.35 }
    );
    io.observe(box);
    return () => {
      io.disconnect();
      stop();
    };
  }, []);

  return (
    <div ref={ref} className="hub-diagram font-telegraf" role="img" aria-label={t("home.result.hubLabel")}>
      <div className="hub-stage">
        <svg className="hub-lines" viewBox="0 0 100 100" aria-hidden>
          <circle className="hub-orbit" cx="50" cy="50" r={R} />
          {POS.map((p, i) => (
            <g key={i} style={{ ["--i" as string]: i }}>
              <line className="hub-stub" style={{ ["--i" as string]: i }} x1={p.x} y1={p.y} x2={CUTS[i].x} y2={CUTS[i].y} />
              <g className="hub-cut" style={{ ["--i" as string]: i }} transform={`translate(${CUTS[i].x} ${CUTS[i].y})`}>
                <circle r="2.1" />
                <path d="M-.9 -.9 L.9 .9 M.9 -.9 L-.9 .9" />
              </g>
              <line className="hub-spoke" style={{ ["--i" as string]: i }} pathLength={1} x1="50" y1="50" x2={p.x} y2={p.y} />
              <line className="hub-flow" style={{ ["--i" as string]: i }} x1={p.x} y1={p.y} x2="50" y2="50" />
            </g>
          ))}
          <circle className="hub-gear" cx="50" cy="50" r="14.5" />
        </svg>
        <div className="hub-core" aria-hidden>
          <img src="/img/stratum-logo-white.png" alt="" width={640} height={120} />
        </div>
        {NODES.map((nd, i) => {
          const { a } = POS[i];
          const dx = Math.round(Math.cos(a) * RADIAL[i] - Math.sin(a) * SIDE[i]);
          const dy = Math.round(Math.sin(a) * RADIAL[i] + Math.cos(a) * SIDE[i]);
          const style = {
            left: `${POS[i].x}%`,
            top: `${POS[i].y}%`,
            "--i": i,
            "--c": TONES[i % 4],
            "--ic": i % 4 === 3 ? "#1E2B7E" : "#fff",
            "--dx": `${dx}px`,
            "--dy": `${dy}px`,
            "--rot": `${ROT[i]}deg`,
          } as React.CSSProperties;
          return (
            <div key={nd.icon} className="hub-node" aria-hidden style={style}>
              <span className="hub-tile">
                <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICONS[nd.icon] }} />
              </span>
              <span className="hub-label">
                <b className="hub-new">{en ? nd.en : nd.es}</b>
                <span className="hub-old">{en ? nd.oldEn : nd.oldEs}</span>
              </span>
            </div>
          );
        })}
      </div>
      <p className="hub-caption" aria-hidden>
        <span className="hub-cap-before">{t("home.result.hubBefore")}</span>
        <span className="hub-cap-after">{t("home.result.hubAfter")}</span>
      </p>
    </div>
  );
}
