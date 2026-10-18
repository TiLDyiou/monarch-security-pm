import * as React from 'react';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import CountUp from 'react-countup';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/LanguageContext';
import { formatNumber } from '@/utils/format';

export type KPIFormat = 'currency' | 'percent' | 'number';

export interface KPIProps extends React.HTMLAttributes<HTMLDivElement> {
  colorScheme?: 'default' | 'emerald' | 'indigo' | 'blue';
}

export const KPI = React.forwardRef<HTMLDivElement, KPIProps>(
  ({ className, colorScheme = 'default', children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative rounded-xl bg-card p-5 text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md border-0',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
KPI.displayName = 'KPI';

export const KPIContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-1', className)} {...props} />
));
KPIContent.displayName = 'KPIContent';

export interface KPIValueProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  format?: KPIFormat;
  animated?: boolean;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const KPIValue: React.FC<KPIValueProps> = ({
  value,
  format = 'number',
  animated = true,
  prefix = '',
  suffix = '',
  decimals,
  className,
  ...props
}) => {
  const { language, t } = useLanguage();
  let activeDecimals = decimals;
  let activeSuffix = suffix;
  let activePrefix = prefix;

  if (format === 'percent') {
    activeSuffix = activeSuffix || '%';
    activeDecimals = activeDecimals ?? 2;
  } else if (format === 'currency') {
    activePrefix = activePrefix || '';
    activeSuffix = activeSuffix || ` ${t.common.vnd}`;
    activeDecimals = activeDecimals ?? 0;
  }

  return (
    <div
      className={cn(
        'text-2xl font-bold tracking-tight text-foreground sm:text-3xl',
        className,
      )}
      {...props}
    >
      {animated ? (
        <CountUp
          // CountUp only picks up a new separator on remount
          key={language}
          start={0}
          end={value}
          duration={1.2}
          separator={language === 'en' ? ',' : '.'}
          decimal={language === 'en' ? '.' : ','}
          decimals={activeDecimals ?? (value % 1 === 0 ? 0 : 2)}
          prefix={activePrefix}
          suffix={activeSuffix}
        />
      ) : (
        `${activePrefix}${formatNumber(value)}${activeSuffix}`
      )}
    </div>
  );
};

export interface KPIChangeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  previous: number;
  comparison?: string;
  variant?:
    | 'default'
    | 'emerald'
    | 'indigo'
    | 'blue'
    | 'teal'
    | 'sky'
    | 'navy'
    | 'slate'
    | 'aqua'
    | 'success'
    | 'danger';
  showComparison?: boolean;
  reverseColor?: boolean;
  customDiff?: number;
}

export const KPIChange: React.FC<KPIChangeProps> = ({
  value,
  previous,
  comparison,
  variant = 'default',
  showComparison = true,
  reverseColor = false,
  customDiff,
  className,
  ...props
}) => {
  const diff = customDiff !== undefined ? customDiff : value - previous;
  const isPositive = diff > 0;
  const isNeutral = Math.abs(diff) < 0.0001;

  // For positive metrics (return), positive is good (green).
  // For risk, lower diff is good (green or highlighted).
  let isGood = isPositive;
  if (reverseColor) {
    isGood = !isPositive;
  }

  // Variant styling without borders
  const variantStyles = {
    default: isNeutral
      ? 'text-muted-foreground bg-muted/60'
      : isGood
      ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300'
      : 'text-rose-700 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-300',
    emerald:
      'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300',
    indigo:
      'text-indigo-700 bg-indigo-50 dark:bg-indigo-950/50 dark:text-indigo-300',
    blue:
      'text-blue-700 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-300',
    teal:
      'text-[#00A0B0] bg-[#00A0B0]/10 dark:bg-[#00A0B0]/20 dark:text-[#BFEFF3]',
    sky:
      'text-[#2F6BFF] bg-[#97B5FF]/25 dark:text-[#97B5FF] dark:bg-[#97B5FF]/20',
    navy:
      'text-[#11285F] bg-[#11285F]/10 dark:text-[#97B5FF] dark:bg-blue-950/50',
    slate:
      'text-[#848FB6] bg-[#848FB6]/15 dark:text-slate-300 dark:bg-slate-800/50',
    aqua:
      'text-[#00A0B0] bg-[#BFEFF3]/40 dark:text-[#BFEFF3] dark:bg-[#00A0B0]/20',
    success:
      'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300',
    danger:
      'text-rose-700 bg-rose-50 dark:bg-rose-950/50 dark:text-rose-300',
  };

  const badgeClass = variantStyles[variant] || variantStyles.default;

  const Icon = isNeutral ? Minus : isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-medium',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-semibold',
          badgeClass,
        )}
      >
        <Icon className="h-3.5 w-3.5" />
        {isPositive && !isNeutral ? '+' : ''}
        {diff.toFixed(2)}%
      </span>
      {showComparison && comparison && (
        <span className="text-xs text-muted-foreground">{comparison}</span>
      )}
    </div>
  );
};

export interface KPI1Props {
  comparison: string;
  format?: KPIFormat;
  previous: number;
  title: string;
  value: number;
  colorScheme?: 'default' | 'emerald' | 'indigo' | 'blue' | 'teal' | 'sky' | 'navy' | 'slate' | 'aqua';
  variant?:
    | 'default'
    | 'emerald'
    | 'indigo'
    | 'blue'
    | 'teal'
    | 'sky'
    | 'navy'
    | 'slate'
    | 'aqua'
    | 'success'
    | 'danger';
  reverseColor?: boolean;
  customDiff?: number;
  subInfo?: React.ReactNode;
}

export const KPI1: React.FC<KPI1Props> = (props) => {
  const {
    comparison,
    format,
    previous,
    title,
    value,
    colorScheme = 'default',
    variant,
    reverseColor,
    customDiff,
    subInfo,
  } = props;

  return (
    <KPI colorScheme={colorScheme}>
      <KPIContent className="gap-1.5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
            {title}
          </p>
        </div>
        <KPIValue value={value} format={format} animated />
        <KPIChange
          comparison={comparison}
          previous={previous}
          value={value}
          variant={variant ?? (colorScheme === 'default' ? 'default' : colorScheme)}
          reverseColor={reverseColor}
          customDiff={customDiff}
          showComparison
        />
        {subInfo && (
          <div className="mt-2 pt-1 text-[11px] text-muted-foreground flex items-center justify-between">
            {subInfo}
          </div>
        )}
      </KPIContent>
    </KPI>
  );
};

