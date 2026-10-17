'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface StatMetric {
  key: string;
  label: string;
  value: number | string;
  previous?: number;
  changeType?: 'points' | 'percent';
  formatter?: (value: any) => string;
  goodDirection?: 'up' | 'down';
}

export interface StatGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const StatGroup: React.FC<StatGroupProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'grid divide-y sm:divide-y-0 sm:divide-x divide-border/40',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Stat: React.FC<StatProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('flex flex-col gap-1 p-4 sm:p-5 min-w-0', className)} {...props}>
      {children}
    </div>
  );
};

export interface StatLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const StatLabel: React.FC<StatLabelProps> = ({ className, children, ...props }) => {
  return (
    <span
      className={cn('text-xs font-medium text-muted-foreground truncate', className)}
      {...props}
    >
      {children}
    </span>
  );
};

export interface StatValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  metric?: StatMetric;
}

export const StatValue: React.FC<StatValueProps> = ({
  className,
  children,
  metric,
  ...props
}) => {
  let displayValue = children;
  if (metric && children === undefined) {
    displayValue = metric.formatter
      ? metric.formatter(metric.value)
      : typeof metric.value === 'number'
        ? metric.value.toLocaleString('vi-VN')
        : String(metric.value);
  }

  return (
    <span
      className={cn(
        'text-2xl font-bold tracking-tight text-foreground tabular-nums truncate',
        className,
      )}
      {...props}
    >
      {displayValue}
    </span>
  );
};

export interface StatChangeProps extends React.HTMLAttributes<HTMLDivElement> {
  metric?: StatMetric;
  variant?: 'badge' | 'text';
}

export const StatChange: React.FC<StatChangeProps> = ({
  metric,
  variant = 'badge',
  className,
  ...props
}) => {
  if (!metric || metric.previous === undefined || typeof metric.value !== 'number') {
    return null;
  }
  const diff = metric.value - metric.previous;
  const pct = metric.previous !== 0 ? (diff / Math.abs(metric.previous)) * 100 : 0;
  const isUp = diff >= 0;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 text-xs font-semibold tabular-nums',
        variant === 'badge'
          ? cn(
              'px-2 py-0.5 rounded-full w-fit',
              isUp ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700',
            )
          : isUp
            ? 'text-emerald-600'
            : 'text-rose-600',
        className,
      )}
      {...props}
    >
      <span>
        {isUp ? '↑' : '↓'} {Math.abs(pct).toFixed(1)}%
      </span>
    </div>
  );
};
