import * as React from 'react';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatNumber, formatVND, getFormatLanguage } from '@/utils/format';

export interface Metric {
  key: string;
  label: string;
  value: number;
  previous?: number;
  format?: 'currency' | 'currency-compact' | 'percent' | 'compact' | 'number' | 'milliseconds' | 'vnd';
  changeType?: 'percent' | 'points';
  goodDirection?: 'up' | 'down';
  sector?: string;
  role?: string;
  refPrice?: number;
  weightInP?: number;
  weightInC?: number;
  initialValue?: number;
  expectedReturnAnnual?: number;
  riskAnnual?: number;
}

const formatCurrencyCompact = (val: number) => {
  if (val < 1_000_000) return formatVND(val);
  const millions = formatNumber(val / 1_000_000, 1);
  return getFormatLanguage() === 'en' ? `${millions}M VND` : `${millions} tr ₫`;
};

export function formatMetricValue(metric: Metric, value: number): string {
  const format = metric.format ?? 'vnd';
  if (format === 'vnd' || format === 'currency') {
    return formatVND(value);
  }
  if (format === 'percent') {
    return `${formatNumber(value, 2)}%`;
  }
  if (format === 'currency-compact') {
    return formatCurrencyCompact(value);
  }
  if (format === 'compact') {
    return value >= 1_000 ? `${formatNumber(value / 1_000, 1)}k` : formatNumber(value);
  }
  return formatNumber(value);
}

export function getMetricFormatter(format?: string): (value: number) => string {
  if (format === 'percent') {
    return (val: number) => `${formatNumber(val, 2)}%`;
  }
  if (format === 'currency-compact') {
    return formatCurrencyCompact;
  }
  if (format === 'compact') {
    return (val: number) => (val >= 1_000 ? `${formatNumber(val / 1_000, 1)}k` : formatNumber(val));
  }
  return formatVND;
}

export function describeHistory(metric: Metric): string {
  return getFormatLanguage() === 'en'
    ? `Price history chart for ${metric.label}`
    : `Biểu đồ biến động giá của ${metric.label}`;
}

export interface MetricSparklineProps {
  data: number[];
  color?: string;
  className?: string;
  animated?: boolean;
  label?: string;
}

export const MetricSparkline: React.FC<MetricSparklineProps> = ({
  data,
  color,
  className,
}) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 64;
  const height = 24;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const isUp = data[data.length - 1] >= data[0];
  const strokeColor = color || (isUp ? '#089981' : '#f23645');

  return (
    <svg
      width={width}
      height={height}
      className={cn('inline-block overflow-visible', className)}
      viewBox={`0 0 ${width} ${height}`}
    >
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

export interface MetricChangeProps {
  metric: Metric;
  comparison?: string;
  className?: string;
}

export const MetricChange: React.FC<MetricChangeProps> = ({
  metric,
  className,
}) => {
  const previous = metric.previous ?? metric.refPrice ?? metric.value;
  const diff = metric.value - previous;
  const pct = previous > 0 ? (diff / previous) * 100 : 0;
  const isPositive = diff > 0;
  const isNeutral = Math.abs(diff) < 0.0001;

  const isGood = metric.goodDirection === 'down' ? !isPositive : isPositive;

  const Icon = isNeutral ? Minus : isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-xs font-semibold tabular-nums border-0',
        isNeutral
          ? 'text-muted-foreground bg-muted/60'
          : isGood
          ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300'
          : 'text-rose-700 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-300',
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {isPositive && !isNeutral ? '+' : ''}
      {pct.toFixed(2)}%
    </span>
  );
};

