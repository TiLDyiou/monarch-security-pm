import * as React from 'react';
import { cn } from '@/lib/utils';
import { formatNumber, getFormatLanguage } from '@/utils/format';

export const chartAxisProps = {
  axisLine: false,
  tickLine: false,
  tick: { fontSize: 11, fill: '#64748b' },
};

export const chartGridProps = {
  strokeDasharray: '3 3',
  stroke: '#f1f5f9',
  vertical: false,
};

export type ChartValueFormatter = (value: number) => string;

// Values are in millions of VND
export const formatCompact = (val: number): string => {
  const en = getFormatLanguage() === 'en';
  if (Math.abs(val) >= 1_000) {
    return en ? `${formatNumber(val / 1000, 2)}B` : `${formatNumber(val / 1000, 2)} tỷ`;
  }
  return en ? `${formatNumber(val)}M` : `${formatNumber(val)} tr`;
};

export const ChartPanelKey: React.FC<{ color: string; className?: string }> = ({
  color,
  className,
}) => {
  return (
    <span
      className={cn('inline-block size-2.5 rounded-full shrink-0', className)}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  );
};

export interface ChartPanelFigureProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ChartPanelFigure: React.FC<ChartPanelFigureProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('relative w-full', className)} {...props}>
      {children}
    </div>
  );
};

export interface ChartPanelTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  valueFormatter?: (value: number) => string;
}

export const ChartPanelTooltip: React.FC<ChartPanelTooltipProps> = ({
  active,
  payload,
  label,
  valueFormatter,
}) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  const formatted = valueFormatter ? valueFormatter(item.value) : item.value;
  const displayName = item.name || label || item.payload?.label || item.payload?.x;

  return (
    <div className="rounded-lg bg-popover/95 backdrop-blur-sm px-3 py-2 text-xs shadow-md border-0 text-popover-foreground">
      <div className="font-medium text-muted-foreground">{displayName}</div>
      <div className="text-sm font-semibold text-foreground mt-0.5">
        {formatted}
      </div>
    </div>
  );
};

export interface ChartPanelTableProps {
  caption?: string;
  columns: { key: string; label: string; format?: (v: any) => string }[];
  rows: any[];
  className?: string;
}

export const ChartPanelTable: React.FC<ChartPanelTableProps> = ({
  caption,
  columns,
  rows,
  className,
}) => {
  // Visually clean summary footer or hidden screen-reader table
  return (
    <div className={cn('sr-only', className)}>
      <table>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.format ? col.format(row[col.key]) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

