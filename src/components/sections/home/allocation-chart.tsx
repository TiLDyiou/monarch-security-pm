import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";

type AssetKey = "stocks" | "funds" | "bonds" | "gold" | "cash";

const ActiveSector = (props: PieSectorDataItem) => (
  <Sector {...props} outerRadius={(props.outerRadius ?? 0) + 8} />
);

const AllocationChart = () => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState("growth");
  const [hovered, setHovered] = useState<AssetKey | null>(null);

  const ASSETS = useMemo(() => [
    { key: "stocks" as const, label: t.landing.allocation.assets.stocks, color: "#2a78d6" },
    { key: "funds" as const, label: t.landing.allocation.assets.funds, color: "#eb6834" },
    { key: "bonds" as const, label: t.landing.allocation.assets.bonds, color: "#1baf7a" },
    { key: "gold" as const, label: t.landing.allocation.assets.gold, color: "#eda100" },
    { key: "cash" as const, label: t.landing.allocation.assets.cash, color: "#e87ba4" },
  ], [t]);

  const PORTFOLIOS = useMemo(() => [
    {
      id: "growth",
      name: t.landing.allocation.portfolios.growth.name,
      tag: t.landing.allocation.portfolios.growth.tag,
      allocation: { stocks: 60, funds: 20, bonds: 10, gold: 5, cash: 5 },
      stats: [
        { label: t.landing.allocation.stats.riskLevel, value: t.landing.allocation.portfolios.growth.riskLevel },
        { label: t.landing.allocation.stats.timeHorizon, value: t.landing.allocation.portfolios.growth.timeHorizon },
      ],
    },
    {
      id: "balanced",
      name: t.landing.allocation.portfolios.balanced.name,
      tag: t.landing.allocation.portfolios.balanced.tag,
      allocation: { stocks: 35, funds: 20, bonds: 30, gold: 10, cash: 5 },
      stats: [
        { label: t.landing.allocation.stats.riskLevel, value: t.landing.allocation.portfolios.balanced.riskLevel },
        { label: t.landing.allocation.stats.timeHorizon, value: t.landing.allocation.portfolios.balanced.timeHorizon },
      ],
    },
    {
      id: "defensive",
      name: t.landing.allocation.portfolios.defensive.name,
      tag: t.landing.allocation.portfolios.defensive.tag,
      allocation: { stocks: 10, funds: 10, bonds: 50, gold: 15, cash: 15 },
      stats: [
        { label: t.landing.allocation.stats.riskLevel, value: t.landing.allocation.portfolios.defensive.riskLevel },
        { label: t.landing.allocation.stats.timeHorizon, value: t.landing.allocation.portfolios.defensive.timeHorizon },
      ],
    },
  ], [t]);

  // The landing page stays qualitative: weights only drive the shapes, the copy shows a tier instead of a figure
  const tierOf = (weight: number) => {
    const w = t.landing.allocation.weights;
    if (weight >= 40) return w.core;
    if (weight >= 20) return w.significant;
    if (weight >= 10) return w.moderate;
    return w.supporting;
  };

  const chartConfig = useMemo(() => {
    return Object.fromEntries(
      ASSETS.map((a) => [a.key, { label: a.label, color: a.color }]),
    ) as ChartConfig;
  }, [ASSETS]);

  const portfolio = PORTFOLIOS.find((p) => p.id === activeId) ?? PORTFOLIOS[0];
  const data = ASSETS.map((a) => ({ key: a.key, label: a.label, value: portfolio.allocation[a.key], fill: a.color }));
  const hoveredIndex = hovered ? ASSETS.findIndex((a) => a.key === hovered) : -1;
  const focus = hovered ? data[hoveredIndex] : null;

  return (
    <div className="w-full rounded-3xl border border-slate-200/80 bg-white/85 backdrop-blur-md shadow-card p-5 md:p-8 text-left">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">{t.landing.allocation.tag}</p>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">{t.landing.allocation.title}</h3>
        </div>
        <Tabs value={activeId} onValueChange={setActiveId}>
          <TabsList className="h-auto rounded-full bg-slate-100 p-1">
            {PORTFOLIOS.map((p) => (
              <TabsTrigger
                key={p.id}
                value={p.id}
                className="rounded-full px-3 md:px-4 py-1.5 text-xs md:text-sm cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                {p.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-6 md:gap-10 items-center">
        {/* Donut of the active portfolio */}
        <div className="relative mx-auto w-full max-w-[280px]">
          <ChartContainer config={chartConfig} className="aspect-square w-full">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel nameKey="key" formatter={(value, name) => (
                  <div className="flex w-full items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: chartConfig[name as AssetKey]?.color }} />
                    <span className="text-muted-foreground">{chartConfig[name as AssetKey]?.label}</span>
                    <span className="ml-auto font-semibold text-foreground">{tierOf(Number(value))}</span>
                  </div>
                )} />}
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="key"
                startAngle={90}
                endAngle={-270}
                innerRadius="58%"
                outerRadius="82%"
                cornerRadius={4}
                paddingAngle={1}
                stroke="#fff"
                strokeWidth={2}
                activeIndex={hoveredIndex >= 0 ? hoveredIndex : undefined}
                activeShape={ActiveSector}
                onMouseEnter={(_, i) => setHovered(ASSETS[i].key)}
                onMouseLeave={() => setHovered(null)}
                animationDuration={600}
              >
                {data.map((d) => (
                  <Cell
                    key={d.key}
                    fill={d.fill}
                    opacity={hovered && hovered !== d.key ? 0.35 : 1}
                    className="transition-opacity duration-200 outline-none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            {focus ? (
              <>
                <span className="text-xs text-muted-foreground">{focus.label}</span>
                <span className="text-lg md:text-xl font-bold text-foreground mt-0.5">{tierOf(focus.value)}</span>
              </>
            ) : (
              <>
                <span className="text-xs text-muted-foreground">{t.landing.allocation.portfolioLabel}</span>
                <span className="text-lg md:text-xl font-bold text-foreground mt-0.5">{portfolio.name}</span>
              </>
            )}
          </div>
        </div>

        {/* Breakdown list doubles as legend and table view */}
        <div>
          <p className="text-sm text-muted-foreground mb-4">{portfolio.tag}</p>
          <ul className="space-y-1">
            {data.map((d) => (
              <li
                key={d.key}
                onMouseEnter={() => setHovered(d.key)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1.5 rounded-lg px-2 py-1.5 transition-colors",
                  hovered === d.key && "bg-slate-100",
                )}
              >
                <span className="h-3 w-3 rounded-[3px]" style={{ background: d.fill }} />
                <span className="text-sm font-medium text-foreground">{d.label}</span>
                <span className="text-xs font-medium text-muted-foreground">{tierOf(d.value)}</span>
                <div className="col-start-2 col-span-2 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-[width] duration-500 ease-out"
                    style={{ width: `${d.value}%`, background: d.fill }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {portfolio.stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-sm font-semibold text-foreground">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All three portfolios side by side so the differences are visible at a glance */}
      <div className="mt-8 border-t border-slate-200 pt-5 space-y-2.5">
        {PORTFOLIOS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActiveId(p.id)}
            aria-label={`${p.name}: ${ASSETS.map((a) => `${a.label} ${tierOf(p.allocation[a.key])}`).join(", ")}`}
            className={cn(
              "grid w-full grid-cols-[84px_1fr] md:grid-cols-[100px_1fr] items-center gap-3 cursor-pointer transition-opacity",
              p.id === activeId ? "opacity-100" : "opacity-45 hover:opacity-80",
            )}
          >
            <span className={cn("text-xs md:text-sm text-left", p.id === activeId ? "font-semibold text-foreground" : "text-muted-foreground")}>
              {p.name}
            </span>
            <span className="flex h-3 w-full gap-[2px]">
              {ASSETS.map((a) => (
                <span
                  key={a.key}
                  onMouseEnter={() => p.id === activeId && setHovered(a.key)}
                  onMouseLeave={() => setHovered(null)}
                  className="h-full first:rounded-l-[4px] last:rounded-r-[4px] transition-[width] duration-500"
                  style={{ width: `${p.allocation[a.key]}%`, background: a.color }}
                />
              ))}
            </span>
          </button>
        ))}
        <p className="pt-1 text-[11px] text-muted-foreground">
          {t.landing.allocation.note}
        </p>
      </div>
    </div>
  );
};

export default AllocationChart;
