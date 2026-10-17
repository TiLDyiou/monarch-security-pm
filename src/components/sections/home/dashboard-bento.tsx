import MagicBento, { type MagicBentoItem } from "@/components/MagicBento";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Banknote,
  BriefcaseBusiness,
  Check,
  Gauge,
  Landmark,
  PieChart,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useNavigate } from "react-router-dom";

// Each tile previews a real module of the dashboard. The shapes are illustrative only: no figures are shown on the landing page.

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const vars = (values: Record<string, string | number>) => values as CSSProperties;

const PRICE_SHAPE = [3.1, 3.8, 3.5, 4.9, 4.4, 5.8, 5.3, 6.9, 6.5, 8.2, 9.4, 12.4];
const BAR_SHAPE = [42, 58, 49, 71, 63, 88, 76];

// Monotone cubic curve through the shape, with samples for the hover scrubber
const curve = (values: number[], width: number, height: number) => {
  const top = 6;
  const bottom = 2;
  const low = Math.min(...values) * 0.7;
  const high = Math.max(...values);
  const points = values.map((value, index) => [
    (index / (values.length - 1)) * width,
    top + (1 - (value - low) / (high - low)) * (height - top - bottom),
  ]);
  const count = points.length;
  const slopes: number[] = [];
  for (let i = 0; i < count - 1; i++) {
    slopes.push((points[i + 1][1] - points[i][1]) / (points[i + 1][0] - points[i][0]));
  }
  const tangents = points.map((_, i) => {
    if (i === 0) return slopes[0];
    if (i === count - 1) return slopes[count - 2];
    return slopes[i - 1] * slopes[i] > 0 ? (slopes[i - 1] + slopes[i]) / 2 : 0;
  });
  let line = `M${points[0][0].toFixed(2)},${points[0][1].toFixed(2)}`;
  const samples: number[][] = [];
  for (let i = 0; i < count - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const third = (x1 - x0) / 3;
    const c1 = [x0 + third, y0 + tangents[i] * third];
    const c2 = [x1 - third, y1 - tangents[i + 1] * third];
    line += ` C${c1[0].toFixed(2)},${c1[1].toFixed(2)} ${c2[0].toFixed(2)},${c2[1].toFixed(2)} ${x1.toFixed(2)},${y1.toFixed(2)}`;
    for (let step = 0; step < 12; step++) {
      const t = step / 12;
      const u = 1 - t;
      samples.push([
        u * u * u * x0 + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * x1,
        u * u * u * y0 + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * y1,
      ]);
    }
  }
  samples.push(points[count - 1]);
  const area = `${line} L${width.toFixed(2)},${height.toFixed(2)} L0,${height.toFixed(2)} Z`;
  return { line, area, samples };
};

const sampleAt = (samples: number[][], x: number) => {
  let index = 1;
  while (index < samples.length - 1 && samples[index][0] < x) index++;
  const [x0, y0] = samples[index - 1];
  const [x1, y1] = samples[index];
  const t = x1 === x0 ? 0 : clamp((x - x0) / (x1 - x0), 0, 1);
  return y0 + (y1 - y0) * t;
};

const PriceVisual = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  useLayoutEffect(() => {
    const plot = plotRef.current;
    if (!plot) return;
    const update = () => {
      const next = { width: plot.clientWidth, height: plot.clientHeight };
      setSize((previous) =>
        previous && previous.width === next.width && previous.height === next.height ? previous : next,
      );
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(plot);
    return () => observer.disconnect();
  }, []);

  const shape = useMemo(
    () => (size && size.width > 4 && size.height > 4 ? curve(PRICE_SHAPE, size.width, size.height) : null),
    [size],
  );

  const scrub = (event: ReactPointerEvent<HTMLDivElement>) => {
    const plot = plotRef.current;
    const chart = chartRef.current;
    if (!shape || !plot || !chart || !scrubRef.current || !dotRef.current) return;
    const rect = plot.getBoundingClientRect();
    const x = clamp(event.clientX - rect.left, 0, rect.width);
    chart.dataset.scrub = "";
    scrubRef.current.style.transform = `translateX(${x.toFixed(1)}px)`;
    dotRef.current.style.transform = `translateY(${sampleAt(shape.samples, x).toFixed(1)}px)`;
  };

  const rest = () => {
    if (chartRef.current) delete chartRef.current.dataset.scrub;
  };

  return (
    <div ref={chartRef} className="magic-bento__chart" onPointerMove={scrub} onPointerDown={scrub} onPointerLeave={rest}>
      <div ref={plotRef} className="magic-bento__plot">
        {shape && size && (
          <svg viewBox={`0 0 ${size.width} ${size.height}`}>
            <path className="magic-bento__chart-area" d={shape.area} />
            <path className="magic-bento__chart-line" d={shape.line} pathLength="1" />
          </svg>
        )}
        <span ref={scrubRef} className="magic-bento__scrub">
          <span ref={dotRef} className="magic-bento__scrub-dot" />
        </span>
      </div>
    </div>
  );
};

const BarsVisual = () => {
  const peak = Math.max(...BAR_SHAPE);
  return (
    <div className="magic-bento__bars-plot">
      {BAR_SHAPE.map((height, index) => (
        <span
          key={index}
          className="magic-bento__bar"
          data-peak={height === peak ? "" : undefined}
          style={vars({ "--h": height / 100, "--i": index })}
        />
      ))}
    </div>
  );
};

const GoalsVisual = ({ steps }: { steps: string[] }) => (
  <ol className="magic-bento__timeline" style={vars({ "--n": steps.length })}>
    <span className="magic-bento__timeline-rail">
      <span className="magic-bento__timeline-fill" />
    </span>
    {steps.map((step, index) => (
      <li key={step} className="magic-bento__milestone" style={vars({ "--i": index })}>
        <span className="magic-bento__status">
          <span className="magic-bento__pending" />
          <span className="magic-bento__spinner" />
          <span className="magic-bento__done">
            <Check size={11} strokeWidth={2.6} />
          </span>
        </span>
        {step}
      </li>
    ))}
  </ol>
);

// Mirrors the four tabs of the dashboard's asset structure chart
const NODES = [
  { icon: Wallet, x: "17%", y: "24%" },
  { icon: Landmark, x: "83%", y: "24%" },
  { icon: Banknote, x: "17%", y: "78%" },
  { icon: PieChart, x: "83%", y: "78%" },
];

const StructureVisual = () => (
  <div className="magic-bento__hub">
    <svg className="magic-bento__hub-links" viewBox="0 0 100 100" preserveAspectRatio="none">
      {NODES.map((node) => (
        <line key={node.x + node.y} x1={parseFloat(node.x)} y1={parseFloat(node.y)} x2="50" y2="51" pathLength="1" />
      ))}
    </svg>
    {NODES.map((node, index) => (
      <span key={`packet-${index}`} className="magic-bento__packet" style={vars({ "--x": node.x, "--y": node.y, "--i": index })} />
    ))}
    {NODES.map((node, index) => (
      <span
        key={node.x + node.y}
        className="magic-bento__hub-node magic-bento__tile"
        style={vars({ "--x": node.x, "--y": node.y, "--s": "26px", "--i": index + 1 })}
      >
        <node.icon size={14} strokeWidth={1.8} />
      </span>
    ))}
    <span
      className="magic-bento__hub-node magic-bento__tile"
      style={vars({ "--x": "50%", "--y": "51%", "--s": "34px", "--i": 0 })}
    >
      <BriefcaseBusiness size={17} strokeWidth={1.8} />
    </span>
  </div>
);

const METRIC_ICONS = [TrendingUp, Gauge];

const MetricsVisual = ({ items }: { items: string[] }) => (
  <div className="magic-bento__metrics">
    {items.map((label, index) => {
      const Icon = METRIC_ICONS[index] ?? Gauge;
      return (
        <div key={label} className="magic-bento__metric magic-bento__tile">
          <Icon size={14} strokeWidth={1.8} />
          <span className="magic-bento__metric-label">{label}</span>
          <span className="magic-bento__metric-check" style={vars({ "--i": index })}>
            <Check size={10} strokeWidth={2.8} />
          </span>
        </div>
      );
    })}
  </div>
);

const DashboardBento = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const b = t.landing.bento;

  // Ten-column grid: 4 / 3 / 3 over 5 / 5, so the seams of the two rows never line up
  const items = useMemo<MagicBentoItem[]>(
    () => [
      { id: "price", ...b.price, visual: <PriceVisual />, colSpan: 4, onClick: () => navigate("/dashboard/monitor") },
      { id: "flows", ...b.flows, visual: <BarsVisual />, colSpan: 3, onClick: () => navigate("/dashboard/analysis") },
      {
        id: "structure",
        ...b.structure,
        visual: <StructureVisual />,
        colSpan: 3,
        onClick: () => navigate("/dashboard/analysis"),
      },
      {
        id: "goals",
        ...b.goals,
        visual: <GoalsVisual steps={b.goals.steps} />,
        colSpan: 5,
        onClick: () => navigate("/dashboard/workplace"),
      },
      {
        id: "metrics",
        ...b.metrics,
        visual: <MetricsVisual items={b.metrics.items} />,
        colSpan: 5,
        onClick: () => navigate("/dashboard/analysis"),
      },
    ],
    [b, navigate],
  );

  return (
    <MagicBento
      items={items}
      columns={10}
      minCellWidth={64}
      rowHeight={200}
      gap={12}
      radius={20}
      theme="light"
      glowColor="#00a0b0"
      enableBorderGlow
      enableSpotlight
      spotlightRadius={300}
      clickEffect
      enableStars={false}
      enableTilt={false}
      enableMagnetism={false}
      textAutoHide
      intro
      className="text-left"
    />
  );
};

export default DashboardBento;
