'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface RingProps extends React.HTMLAttributes<HTMLDivElement> {
  percentage: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
}

export const Ring: React.FC<RingProps> = ({
  percentage = 0,
  strokeWidth = 8,
  color = 'var(--chart-2, #00a0b0)',
  trackColor,
  ariaLabel,
  className,
  children,
  ...props
}) => {
  const clamped = Math.min(100, Math.max(0, percentage));
  const size = 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * clamped) / 100;

  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('relative inline-flex items-center justify-center shrink-0', className)}
      {...props}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="size-full -rotate-90 overflow-visible"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={cn('text-muted/40 dark:text-muted/30', trackColor)}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};
