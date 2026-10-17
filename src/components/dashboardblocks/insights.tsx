'use client';

import * as React from 'react';
import {
  ArrowRightIcon,
  Info,
  TrendingDown,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type InsightKind = 'positive' | 'negative' | 'neutral' | 'anomaly';

export interface InsightKindDetail {
  label: string;
  text: string;
  bg: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const insightKindConfig: Record<InsightKind, InsightKindDetail> = {
  positive: {
    label: 'Tích cực',
    text: 'text-emerald-700 dark:text-emerald-400',
    bg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
    icon: TrendingUp,
  },
  negative: {
    label: 'Tiêu cực',
    text: 'text-rose-700 dark:text-rose-400',
    bg: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400',
    icon: TrendingDown,
  },
  anomaly: {
    label: 'Biến động mạnh',
    text: 'text-amber-700 dark:text-amber-400',
    bg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
    icon: Zap,
  },
  neutral: {
    label: 'Tổng quan',
    text: 'text-blue-700 dark:text-blue-400',
    bg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
    icon: Info,
  },
};

export const InsightIcon: React.FC<{ kind: InsightKind; className?: string }> = ({
  kind,
  className,
}) => {
  const config = insightKindConfig[kind] || insightKindConfig.neutral;
  const IconComp = config.icon;
  return (
    <div
      className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-lg',
        config.bg,
        className,
      )}
    >
      <IconComp className="size-4" />
    </div>
  );
};

export type InsightSegment =
  | string
  | { text: string; tone?: 'positive' | 'negative' | 'neutral' };

export function insightToString(segments: InsightSegment[]): string {
  return segments
    .map((s) => (typeof s === 'string' ? s : s.text))
    .join('');
}

export const InsightText: React.FC<{
  segments: InsightSegment[];
  className?: string;
}> = ({ segments, className }) => {
  return (
    <p className={cn('text-sm text-foreground leading-relaxed m-0', className)}>
      {segments.map((seg, idx) => {
        if (typeof seg === 'string') return <span key={idx}>{seg}</span>;
        const toneClass =
          seg.tone === 'positive'
            ? 'font-semibold text-emerald-700 dark:text-emerald-400'
            : seg.tone === 'negative'
              ? 'font-semibold text-rose-700 dark:text-rose-400'
              : 'font-semibold text-foreground';
        return (
          <span key={idx} className={toneClass}>
            {seg.text}
          </span>
        );
      })}
    </p>
  );
};

export interface InsightDriver {
  label: string;
  tone?: 'positive' | 'negative' | 'neutral';
  value: string;
}

export const InsightDrivers: React.FC<{
  drivers: InsightDriver[];
  className?: string;
}> = ({ drivers, className }) => {
  return (
    <div className={cn('flex flex-wrap items-center gap-1.5 pt-1 text-xs', className)}>
      {drivers.map((d, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground border border-border/40 text-[11px]"
        >
          <span>{d.label}:</span>
          <span
            className={cn(
              'font-semibold tabular-nums',
              d.tone === 'positive'
                ? 'text-emerald-700 dark:text-emerald-400'
                : d.tone === 'negative'
                  ? 'text-rose-700 dark:text-rose-400'
                  : 'text-foreground',
            )}
          >
            {d.value}
          </span>
        </span>
      ))}
    </div>
  );
};

export interface InsightItem {
  actionLabel?: string;
  drivers?: InsightDriver[];
  href?: string;
  id: string;
  kind: InsightKind;
  segments: InsightSegment[];
  topic: string;
}

export interface Insights1Props {
  title: string;
  description: string;
  insights: InsightItem[];
  className?: string;
  headerAction?: React.ReactNode;
}

export const Insights1: React.FC<Insights1Props> = ({
  title,
  description,
  insights,
  className,
  headerAction,
}) => {
  return (
    <Card className={cn('@container gap-0 pb-0 rounded-xl border border-border/60 bg-card text-card-foreground shadow-xs', className)}>
      <CardHeader className="border-b px-5 py-4 flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-base font-semibold tracking-tight">{title}</CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">{description}</CardDescription>
        </div>
        {headerAction}
      </CardHeader>
      <CardContent className="px-0 py-0">
        <ul className="divide-y divide-border/40 m-0 p-0 list-none">
          {insights.map((insight) => {
            const config = insightKindConfig[insight.kind] || insightKindConfig.neutral;
            return (
              <li
                key={insight.id}
                className="flex flex-col gap-3 px-5 sm:px-6 py-4 transition-colors hover:bg-muted/15 @lg:flex-row @lg:items-start"
              >
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <InsightIcon kind={insight.kind} />
                  <div className="flex min-w-0 flex-col gap-1.5 flex-1">
                    <p className="text-xs m-0">
                      <span className={cn('font-semibold', config.text)}>
                        {config.label}
                      </span>
                      <span className="text-muted-foreground"> · {insight.topic}</span>
                    </p>
                    <InsightText segments={insight.segments} />
                    {insight.drivers && <InsightDrivers drivers={insight.drivers} />}
                  </div>
                </div>
                {insight.href && (
                  <div className="pl-11 @lg:pl-0 shrink-0">
                    <a
                      href={insight.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${insight.actionLabel ?? 'Chi tiết'}: ${insightToString(insight.segments)}`}
                      className={cn(buttonVariants({ size: 'sm', variant: 'outline' }), 'text-xs h-8 px-3')}
                    >
                      {insight.actionLabel ?? 'Chi tiết'}
                      <ArrowRightIcon className="size-3.5 ml-1" />
                    </a>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

