import { cn } from "@/lib/utils";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, GraduationCap, Home, Palmtree, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const TEAL = "#00a0b0";
// Same entity colors as the hero allocation chart
const STOCKS = "#2a78d6";
const BONDS = "#1baf7a";

// Runs animations only while the illustration is on screen, and never when the user prefers reduced motion
const useLive = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  return { ref, live: inView && !reduce, reduce: !!reduce };
};

const Stage = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div
    className={cn(
      "relative h-full w-full overflow-hidden border-b border-slate-200/70 bg-gradient-to-br from-[#eef9fb] via-white to-[#eef2ff]",
      className,
    )}
  >
    {children}
  </div>
);

/* ---------- 1. Risk profile gauge + family goals ---------- */

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy - r * Math.sin(rad)];
};

const arc = (from: number, to: number, r = 78) => {
  const [x1, y1] = polar(100, 100, r, from);
  const [x2, y2] = polar(100, 100, r, to);
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
};

export const RiskProfileIllustration = () => {
  const { t } = useLanguage();
  const { ref, live, reduce } = useLive();
  const loop = { duration: 5, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" as const };

  const goals = useMemo(() => [
    { icon: ShieldCheck, label: t.landing.process.illustrations.riskGauge.goals.emergency, value: 100 },
    { icon: Home, label: t.landing.process.illustrations.riskGauge.goals.home, value: 64 },
    { icon: GraduationCap, label: t.landing.process.illustrations.riskGauge.goals.education, value: 45 },
    { icon: Palmtree, label: t.landing.process.illustrations.riskGauge.goals.retirement, value: 28 },
  ], [t]);

  return (
    <Stage>
      <div ref={ref} className="relative grid h-full grid-cols-[1.05fr_1fr] items-center gap-3 p-5 md:p-7">
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 200 118" className="w-full max-w-[220px]" aria-hidden>
            <path d={arc(180, 0)} stroke="#e2e8f0" strokeWidth="16" fill="none" strokeLinecap="round" />
            <path d={arc(178, 122)} stroke="#bfe9ee" strokeWidth="16" fill="none" strokeLinecap="round" />
            <path d={arc(58, 2)} stroke={TEAL} strokeWidth="16" fill="none" strokeLinecap="round" />
            <path d={arc(122, 58)} stroke="#5cc4cf" strokeWidth="16" fill="none" />
            <motion.g
              initial={false}
              animate={live ? { rotate: [-75, 62, -38, 30, 18, 18] } : { rotate: 18 }}
              transition={live ? { ...loop, times: [0, 0.22, 0.42, 0.58, 0.7, 1] } : { duration: 0 }}
            >
              <line x1="100" y1="100" x2="100" y2="34" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
              <line x1="100" y1="100" x2="100" y2="166" stroke="transparent" strokeWidth="4" />
            </motion.g>
            <circle cx="100" cy="100" r="9" fill="#0f172a" />
            <circle cx="100" cy="100" r="3.5" fill="#fff" />
          </svg>
          <p className="mt-1 text-center text-balance text-[11px] uppercase leading-snug tracking-wider text-muted-foreground">{t.landing.process.illustrations.riskGauge.label}</p>
          <motion.p
            className="text-base md:text-lg font-bold text-foreground"
            initial={false}
            animate={live ? { opacity: [0, 0, 1, 1] } : { opacity: 1 }}
            transition={live ? { ...loop, times: [0, 0.62, 0.72, 1] } : { duration: 0 }}
          >
            {t.landing.process.illustrations.riskGauge.balanced}
          </motion.p>
        </div>

        <ul className="space-y-2 sm:space-y-2.5">
          {goals.map((g, i) => (
            <motion.li
              key={g.label}
              className={cn("py-1.5", i === goals.length - 1 && "max-sm:hidden")}
              initial={reduce ? false : { opacity: 0, x: 16 }}
              animate={live || reduce ? { opacity: 1, x: 0 } : undefined}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.45 }}
            >
              <div className="flex items-center gap-2">
                <g.icon className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                <span className="truncate text-[11px] md:text-xs font-medium text-foreground">{g.label}</span>
                {g.value === 100 && <Check className="ml-auto h-3.5 w-3.5 text-primary" aria-label={t.landing.process.illustrations.riskGauge.completed} />}
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200/70">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, #5cc4cf, ${TEAL})` }}
                  initial={false}
                  animate={live ? { width: ["0%", `${g.value}%`, `${g.value}%`] } : { width: `${g.value}%` }}
                  transition={live ? { ...loop, times: [0, 0.35 + i * 0.06, 1], ease: "easeOut" } : { duration: 0 }}
                />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Stage>
  );
};

/* ---------- 2. Markowitz efficient frontier ---------- */

const FRONTIER = "M 70 176 C 82 120, 120 78, 190 60 S 310 40, 360 34";
const OPTIMAL = { x: 190, y: 60 };
const DOTS = [
  [96, 170], [118, 150], [140, 162], [150, 128], [172, 140], [188, 112], [205, 150], [214, 96],
  [232, 124], [246, 84], [258, 140], [270, 104], [288, 72], [300, 118], [318, 92], [334, 60],
  [342, 132], [128, 186], [226, 176], [276, 160],
];

export const FrontierIllustration = () => {
  const { t } = useLanguage();
  const { ref, live } = useLive();
  const loop = { duration: 6, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" as const };

  return (
    <Stage>
      <div ref={ref} className="relative flex h-full flex-col p-5 md:p-6">
        <div className="mb-1 flex items-center justify-between text-[11px] md:text-xs">
          <span className="font-semibold text-foreground">{t.landing.process.illustrations.frontier.title}</span>
          <span className="flex items-center gap-3 text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#97b5ff]" />{t.landing.process.illustrations.frontier.feasible}</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: TEAL }} />{t.landing.process.illustrations.frontier.optimal}</span>
          </span>
        </div>
        <svg viewBox="0 0 380 222" className="h-full w-full flex-1" aria-hidden>
          {[60, 100, 140, 180].map((y) => (
            <line key={y} x1="40" x2="370" y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="3 5" />
          ))}
          <line x1="40" y1="200" x2="370" y2="200" stroke="#cbd5e1" />
          <line x1="40" y1="20" x2="40" y2="200" stroke="#cbd5e1" />
          <text x="370" y="216" textAnchor="end" fontSize="10" fill="#64748b">{t.landing.process.illustrations.frontier.riskAxis}</text>
          <text x="46" y="16" fontSize="10" fill="#64748b">{t.landing.process.illustrations.frontier.returnAxis}</text>

          {DOTS.map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="4.5"
              fill="#97b5ff"
              stroke="#fff"
              strokeWidth="1.5"
              initial={false}
              animate={live ? { opacity: [0, 0.85, 0.85, 0.35, 0.35] } : { opacity: 0.35 }}
              transition={live ? { ...loop, times: [0, 0.08 + i * 0.012, 0.4, 0.55, 1] } : { duration: 0 }}
            />
          ))}

          <motion.path
            d={FRONTIER}
            fill="none"
            stroke={TEAL}
            strokeWidth="3"
            strokeLinecap="round"
            initial={false}
            animate={live ? { pathLength: [0, 0, 1, 1] } : { pathLength: 1 }}
            transition={live ? { ...loop, times: [0, 0.3, 0.6, 1] } : { duration: 0 }}
          />

          <motion.circle
            cx={OPTIMAL.x}
            cy={OPTIMAL.y}
            r="8"
            fill="none"
            stroke={TEAL}
            strokeWidth="2"
            initial={false}
            animate={live ? { scale: [0, 0, 1, 2.6], opacity: [0, 0, 0.6, 0] } : { scale: 0, opacity: 0 }}
            transition={live ? { ...loop, times: [0, 0.66, 0.7, 0.95] } : { duration: 0 }}
          />
          <motion.g
            initial={false}
            animate={live ? { scale: [0, 0, 1.25, 1, 1], opacity: [0, 0, 1, 1, 1] } : { scale: 1, opacity: 1 }}
            transition={live ? { ...loop, times: [0, 0.62, 0.7, 0.76, 1] } : { duration: 0 }}
          >
            <circle cx={OPTIMAL.x} cy={OPTIMAL.y} r="7" fill={TEAL} stroke="#fff" strokeWidth="2.5" />
          </motion.g>
          <motion.g
            initial={false}
            animate={live ? { opacity: [0, 0, 1, 1], y: [6, 6, 0, 0] } : { opacity: 1, y: 0 }}
            transition={live ? { ...loop, times: [0, 0.7, 0.78, 1] } : { duration: 0 }}
          >
            <rect x={OPTIMAL.x - 58} y={OPTIMAL.y + 14} width="116" height="24" rx="12" fill="#0f172a" />
            <text x={OPTIMAL.x} y={OPTIMAL.y + 30} textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">
              {t.landing.process.illustrations.frontier.optimalTag}
            </text>
          </motion.g>
        </svg>
      </div>
    </Stage>
  );
};

/* ---------- 3. Drift & disciplined rebalancing ---------- */

const TARGET = 60;

export const RebalanceIllustration = () => {
  const { t } = useLanguage();
  const { ref, live } = useLive();
  const [phase, setPhase] = useState(2);

  const phases = useMemo(() => [
    { step: t.landing.process.illustrations.rebalance.phases.p1.step, note: t.landing.process.illustrations.rebalance.phases.p1.note, stocks: 60, chip: t.landing.process.illustrations.rebalance.phases.p1.chip },
    { step: t.landing.process.illustrations.rebalance.phases.p2.step, note: t.landing.process.illustrations.rebalance.phases.p2.note, stocks: 72, chip: t.landing.process.illustrations.rebalance.phases.p2.chip },
    { step: t.landing.process.illustrations.rebalance.phases.p3.step, note: t.landing.process.illustrations.rebalance.phases.p3.note, stocks: 60, chip: t.landing.process.illustrations.rebalance.phases.p3.chip },
  ], [t]);

  useEffect(() => {
    if (!live) {
      setPhase(2);
      return;
    }
    setPhase(0);
    const id = window.setInterval(() => setPhase((p) => (p + 1) % phases.length), 2200);
    return () => window.clearInterval(id);
  }, [live, phases.length]);

  const current = phases[phase];
  const status = t.landing.process.illustrations.rebalance.status;
  const drifted = phase === 1;
  const rows = [
    { label: t.landing.process.illustrations.rebalance.stocksLabel, value: current.stocks, target: TARGET, color: STOCKS },
    { label: t.landing.process.illustrations.rebalance.bondsLabel, value: 100 - current.stocks, target: 100 - TARGET, color: BONDS },
  ];
  const spring = { type: "spring" as const, stiffness: 120, damping: 18 };

  return (
    <Stage>
      <div ref={ref} className="relative grid h-full items-center gap-5 p-5 md:grid-cols-[0.9fr_1.6fr] md:gap-10 md:p-10">
        {/* Timeline */}
        <ol className="hidden md:flex md:flex-col md:gap-3">
          {phases.map((p, i) => (
            <li key={p.step} className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors duration-300",
                  i === phase ? "border-primary bg-primary text-white" : i < phase ? "border-primary/40 bg-primary/10 text-primary" : "border-slate-200 bg-white text-muted-foreground",
                )}
              >
                {i === 2 && phase === 2 ? <Check className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
              </span>
              <div className={cn("transition-opacity duration-300", i === phase ? "opacity-100" : "opacity-50")}>
                <p className="text-sm font-semibold text-foreground">{p.step}</p>
                <p className="text-xs text-muted-foreground">{p.note}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Weights */}
        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs md:text-sm font-semibold text-foreground">
              {t.landing.process.illustrations.rebalance.title} <span className="font-normal text-muted-foreground md:hidden">· {current.step}</span>
            </p>
            <motion.span
              key={phase}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold",
                drifted ? "bg-slate-900 text-white" : "bg-primary/10 text-primary",
              )}
            >
              {!drifted && <Check className="h-3 w-3" aria-hidden />}
              {current.chip}
            </motion.span>
          </div>

          <div className="space-y-4">
            {rows.map((r) => (
              <div key={r.label}>
                <div className="mb-1.5 flex items-baseline justify-between text-xs">
                  <span className="flex items-center gap-2 font-medium text-foreground">
                    <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: r.color }} />
                    {r.label}
                  </span>
                  <span className={cn("font-medium", r.value === r.target ? "text-primary" : "text-foreground")}>
                    {r.value > r.target ? status.over : r.value < r.target ? status.under : status.onTarget}
                  </span>
                </div>
                <div className="relative h-3 rounded-full bg-slate-200/70">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: r.color }}
                    initial={false}
                    animate={{ width: `${r.value}%` }}
                    transition={spring}
                  />
                  <span
                    className="absolute -top-1 -bottom-1 w-0.5 rounded-full bg-slate-900/70"
                    style={{ left: `${r.target}%` }}
                    aria-hidden
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex h-2.5 w-full gap-[2px] overflow-hidden rounded-full">
            <motion.span className="h-full" style={{ background: STOCKS }} initial={false} animate={{ width: `${current.stocks}%` }} transition={spring} />
            <motion.span className="h-full flex-1" style={{ background: BONDS }} />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">{t.landing.process.illustrations.rebalance.targetWeightNote}</p>
        </div>
      </div>
    </Stage>
  );
};
