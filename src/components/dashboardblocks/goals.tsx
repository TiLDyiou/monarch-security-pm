'use client';

import * as React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartPanelFigure,
  ChartPanelTable,
  ChartPanelTooltip,
  chartAxisProps,
  chartGridProps,
  formatCompact,
} from '@/components/dashboardblocks/chart-panel';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PALETTE } from '@/constants/palette';
import { cn } from '@/lib/utils';

export type PaceStatus = 'ahead' | 'on-track' | 'behind' | 'at-risk' | 'met';

export interface PaceResult {
  expected: number;
  elapsed: number;
  projected: number;
  status: PaceStatus;
  percentage?: number;
}

export function getPace({
  current,
  elapsed,
  target,
  tolerance = 0.05,
}: {
  current: number;
  elapsed: number;
  target: number;
  tolerance?: number;
}): PaceResult {
  const clamped = Math.min(1, Math.max(0, elapsed));
  const expected = target * clamped;
  const projected = clamped > 0 ? current / clamped : current;
  let status: PaceStatus = 'on-track';
  if (current >= target) status = 'met';
  else if (current > expected * (1 + tolerance)) status = 'ahead';
  else if (current < expected * (1 - tolerance)) status = 'behind';
  return {
    elapsed: clamped,
    expected,
    projected,
    status,
    percentage: Math.round((current / (target || 1)) * 100),
  };
}

export const PaceBadge: React.FC<{ status: PaceStatus; className?: string }> = ({
  status,
  className,
}) => {
  const map: Record<PaceStatus, { label: string; bg: string; text: string }> = {
    met: {
      label: 'Đạt mục tiêu',
      bg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40',
      text: 'text-emerald-700 dark:text-emerald-400',
    },
    ahead: {
      label: 'Vượt tiến độ',
      bg: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400 border border-teal-200/50 dark:border-teal-800/40',
      text: 'text-teal-700 dark:text-teal-400',
    },
    'on-track': {
      label: 'Đúng kế hoạch',
      bg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/40',
      text: 'text-blue-700 dark:text-blue-400',
    },
    behind: {
      label: 'Chậm tiến độ',
      bg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/40',
      text: 'text-amber-700 dark:text-amber-400',
    },
    'at-risk': {
      label: 'Cần chú ý',
      bg: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200/50 dark:border-rose-800/40',
      text: 'text-rose-700 dark:text-rose-400',
    },
  };
  const config = map[status] || map['on-track'];
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tabular-nums',
        config.bg,
        className,
      )}
    >
      {config.label}
    </span>
  );
};

export interface GoalProgressProps {
  animated?: boolean;
  className?: string;
  color?: string;
  current: number;
  expected?: number;
  size?: 'sm' | 'md';
  target: number;
}

export const GoalProgress: React.FC<GoalProgressProps> = ({
  animated = true,
  className,
  color = 'var(--chart-2, #00a0b0)',
  current,
  expected,
  size = 'md',
  target,
}) => {
  const [revealed, setRevealed] = React.useState(!animated);

  React.useEffect(() => {
    if (!animated) return;
    const frame = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(frame);
  }, [animated]);

  const share = target > 0 ? Math.min(1, Math.max(0, current / target)) : 0;
  const marker =
    expected !== undefined && target > 0 ? Math.min(1, expected / target) : null;

  return (
    <div
      aria-hidden
      className={cn('relative w-full', size === 'md' ? 'h-2.5' : 'h-1.5', className)}
    >
      <div className="bg-muted dark:bg-muted/40 h-full w-full overflow-hidden rounded-full">
        <div
          className="h-full rounded-full transition-[width] duration-1000 ease-out motion-reduce:transition-none"
          style={{ backgroundColor: color, width: `${(revealed ? share : 0) * 100}%` }}
        />
      </div>
      {marker !== null && (
        <span
          className="bg-foreground ring-card absolute top-1/2 h-[calc(100%+8px)] w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2"
          style={{ left: `${marker * 100}%` }}
        />
      )}
    </div>
  );
};

export const GoalProgressKey: React.FC<{
  className?: string;
  label?: string;
}> = ({ className, label = 'Tiến độ kỳ vọng hiện tại' }) => {
  return (
    <div
      className={cn(
        'text-muted-foreground flex items-center justify-between text-xs',
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <span aria-hidden className="bg-foreground h-3 w-0.5 rounded-full" />
        {label}
      </span>
      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <span aria-hidden="true" className="w-2.5 h-2.5 rounded-sm bg-teal-600 dark:bg-teal-400" />
        Vốn khả dụng hiện có
      </span>
    </div>
  );
};

export interface GoalItem {
  current: number;
  formatter?: (value: number) => string;
  label: string;
  owner: string;
  target: number;
  elapsed?: number;
}

export interface Goals2Props {
  description: string;
  elapsed: number;
  goals: GoalItem[];
  title: string;
  extraFooter?: React.ReactNode;
  className?: string;
}

export const Goals2: React.FC<Goals2Props> = (props) => {
  const { description, elapsed, goals, title, extraFooter, className } = props;

  return (
    <Card className={cn('shadow-xs border border-border/60', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ul className="flex flex-col">
          {goals.map((goal) => {
            const format =
              goal.formatter ?? ((value: number) => Math.round(value).toLocaleString());
            const itemElapsed = goal.elapsed ?? elapsed;
            const pace = getPace({ current: goal.current, elapsed: itemElapsed, target: goal.target });
            return (
              <li
                key={goal.label}
                className="flex flex-col gap-2.5 border-b border-border/50 py-4 first:pt-0 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-foreground">{goal.label}</span>
                    <span className="text-muted-foreground text-xs">{goal.owner}</span>
                  </div>
                  <PaceBadge status={pace.status} />
                </div>
                <GoalProgress
                  current={goal.current}
                  expected={pace.status === 'met' ? undefined : pace.expected}
                  size="sm"
                  target={goal.target}
                />
                <p className="text-muted-foreground flex justify-between gap-3 text-xs tabular-nums">
                  <span>
                    <span className="text-foreground font-medium">
                      {format(goal.current)}
                    </span>{' '}
                    trên {format(goal.target)}
                  </span>
                  <span className="font-medium text-foreground">{Math.round((goal.current / goal.target) * 100)}%</span>
                </p>
              </li>
            );
          })}
        </ul>
        <GoalProgressKey className="border-t border-border/50 pt-4" />
        {extraFooter}
      </CardContent>
    </Card>
  );
};

export const LegendLine: React.FC<{ color: string; dash?: string; className?: string }> = ({
  color,
  dash,
  className,
}) => {
  return (
    <svg aria-hidden width="16" height="2" className={cn('shrink-0 overflow-visible', className)}>
      <line
        x1="0"
        y1="1"
        x2="16"
        y2="1"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={dash}
      />
    </svg>
  );
};

export interface Goals3Props {
  title: string;
  description?: string;
  days: string[];
  daily?: number[];
  projectedData?: number[];
  target: number;
  formatter?: (value: number) => string;
  className?: string;
}

export const Goals3: React.FC<Goals3Props> = ({
  title,
  description,
  days,
  daily,
  projectedData,
  target,
  formatter = (val) => `${Math.round(val).toLocaleString('vi-VN')} tr ₫`,
  className,
}) => {
  // Support both cumulative daily or directly provided projected curve
  const rows = React.useMemo(() => {
    if (projectedData && projectedData.length) {
      return days.map((label, idx) => ({
        label,
        projected: projectedData[idx] ?? null,
        actual: idx === 0 ? projectedData[0] : null,
      }));
    }
    const safeDaily = daily || [];
    const actualCumulative = safeDaily.map((_, index) =>
      safeDaily.slice(0, index + 1).reduce((sum, value) => sum + value, 0),
    );
    const current = actualCumulative[actualCumulative.length - 1] ?? 0;
    const rate = safeDaily.length > 0 ? current / safeDaily.length : 0;

    return days.map((label, index) => {
      const isActual = index < actualCumulative.length;
      const isProjected = index >= actualCumulative.length - 1;
      return {
        label,
        actual: isActual ? actualCumulative[index] : null,
        projected: isProjected
          ? Math.round(current + rate * (index - (actualCumulative.length - 1)))
          : null,
      };
    });
  }, [days, daily, projectedData]);

  const current = rows[0]?.projected ?? 0;
  const finalProjected = rows[rows.length - 1]?.projected ?? current;
  const status: PaceStatus = finalProjected >= target ? 'ahead' : 'at-risk';
  const yMax = Math.ceil((Math.max(target, finalProjected) * 1.08) / 1000) * 1000;

  const PROJECTED_COLOR = PALETTE.blue;
  const TARGET_COLOR = PALETTE.slate;

  return (
    <Card className={cn('@container border-0 bg-transparent shadow-none p-0', className)}>
      {(title || description) && (
        <CardHeader className="p-0 pb-3 flex-row items-start justify-between space-y-0 gap-2">
          <div className="flex flex-col gap-0.5">
            {title && <CardTitle className="text-sm font-semibold text-slate-800">{title}</CardTitle>}
            {description && (
              <CardDescription className="text-xs text-muted-foreground">{description}</CardDescription>
            )}
          </div>
          <CardAction>
            <PaceBadge status={status} />
          </CardAction>
        </CardHeader>
      )}

      <CardContent className="p-0 flex flex-col gap-3.5">
        {/* Top 3 Metric Stat Blocks */}
        <dl className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-0.5">
            <dt className="text-muted-foreground text-[11px] font-medium">Khởi đầu</dt>
            <dd className="text-base sm:text-lg font-bold tracking-tight text-foreground tabular-nums">
              {formatter(current)}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-muted-foreground text-[11px] font-medium">Dự phóng năm 10</dt>
            <dd className="text-base sm:text-lg font-bold tracking-tight text-foreground tabular-nums">
              {formatter(finalProjected)}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-muted-foreground text-[11px] font-medium">Mục tiêu mua nhà</dt>
            <dd className="text-base sm:text-lg font-bold tracking-tight text-foreground tabular-nums">
              {formatter(target)}
            </dd>
          </div>
        </dl>

        {/* Legend */}
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-muted-foreground">
          <ul className="flex items-center gap-x-4 gap-y-1">
            <li className="flex items-center gap-1.5">
              <LegendLine color={PROJECTED_COLOR} />
              <span>Dự phóng tích lũy</span>
            </li>
            <li className="flex items-center gap-1.5">
              <LegendLine color={TARGET_COLOR} dash="3 3" />
              <span>Mục tiêu mua nhà</span>
            </li>
          </ul>
          {!title && <PaceBadge status={status} />}
        </div>

        {/* Chart Canvas */}
        <ChartPanelFigure className="h-44 sm:h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rows} margin={{ top: 8, right: 8, bottom: 0, left: -6 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis
                {...chartAxisProps}
                dataKey="label"
                interval="preserveStartEnd"
                minTickGap={30}
                tick={{ fontSize: 10, fill: '#64748b' }}
              />
              <YAxis
                {...chartAxisProps}
                domain={[0, yMax]}
                tickFormatter={(value: number) => formatCompact(value)}
                width={38}
                tick={{ fontSize: 10, fill: '#64748b' }}
              />
              <ReferenceLine
                y={target}
                stroke={TARGET_COLOR}
                strokeDasharray="3 3"
                strokeWidth={1.5}
              />
              <RechartsTooltip
                content={(tooltipProps) => (
                  <ChartPanelTooltip {...tooltipProps} valueFormatter={formatter} />
                )}
                cursor={{ stroke: '#cbd5e1', strokeDasharray: '3 3' }}
              />
              <Line
                activeDot={{ r: 4, stroke: '#ffffff', strokeWidth: 2 }}
                connectNulls
                dataKey="projected"
                dot={{ r: 2.5, fill: PROJECTED_COLOR }}
                name="Dự phóng tích lũy"
                stroke={PROJECTED_COLOR}
                strokeWidth={2}
                type="monotone"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanelFigure>

        <ChartPanelTable
          caption={`${title ?? 'Dự phóng'}: ${description ?? ''}`}
          columns={[
            { key: 'label', label: 'Mốc thời gian' },
            { format: formatter, key: 'projected', label: 'Tài sản tích lũy' },
          ]}
          rows={rows.map((row) => ({
            label: row.label,
            projected: row.projected ?? '—',
          }))}
        />
      </CardContent>
    </Card>
  );
};
