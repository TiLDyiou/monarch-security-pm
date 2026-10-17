'use client';

import * as React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Segmented } from 'antd';
import {
  ChartPanelKey,
  ChartPanelTooltip,
  formatCompact,
} from '@/components/dashboardblocks/chart-panel';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PALETTE } from '@/constants/palette';
import { formatNumber } from '@/utils/format';
import type { DataItem } from '../data.d';
import type { SalesType } from '../index';
import { useLanguage } from '@/i18n/LanguageContext';

interface ProportionSalesProps {
  loading: boolean;
  salesType: SalesType;
  salesPieData: DataItem[];
  handleChangeSalesType?: (value: SalesType) => void;
}

// Strategic color mapping from the brand palette
const COLOR_MAP: Record<string, string> = {
  // Tài sản
  'Đất nền Bảo Lộc': PALETTE.teal,
  'Tiền mặt': PALETTE.blue,
  'Cho bạn bè mượn': PALETTE.slate,

  // Nguồn vốn
  'Giá trị tài sản ròng': PALETTE.teal,
  'Nợ vay ngân hàng': PALETTE.navy,

  // Tiền mặt
  'Quỹ dự phòng': PALETTE.teal,
  'Vốn đầu tư ban đầu': PALETTE.blue,

  // Danh mục OCP
  'TPCP 10 năm': PALETTE.teal,
  'TPCP 10 năm (rf)': PALETTE.teal,
  'BID': PALETTE.blue,
  'BID (Ngân hàng)': PALETTE.blue,
  'HAH': PALETTE.sky,
  'HAH (Logistics)': PALETTE.sky,
  'SSI': PALETTE.slate,
  'SSI (Chứng khoán)': PALETTE.slate,
  'MSN': PALETTE.navy,
  'MSN (Tiêu dùng)': PALETTE.navy,
};

const PALETTE_FALLBACK = [
  PALETTE.teal,
  PALETTE.blue,
  PALETTE.sky,
  PALETTE.slate,
  PALETTE.navy,
  PALETTE.aqua,
];

const ProportionSales: React.FC<ProportionSalesProps> = ({
  loading,
  salesType,
  salesPieData,
  handleChangeSalesType,
}) => {
  const { language, t } = useLanguage();
  const proportionTexts = t.dashboard.analysis.proportion;

  const getLabel = (cleanLabel: string) =>
    proportionTexts.labels[cleanLabel] || cleanLabel;

  const segments = React.useMemo(() => {
    return (salesPieData || []).map((item, idx) => {
      // Strip any parentheses and their content from labels, e.g. "TPCP 10 năm (rf)" -> "TPCP 10 năm", "BID (Ngân hàng)" -> "BID"
      const cleanLabel = (item.x || '').replace(/\s*\([^)]*\)/g, '').trim();
      return {
        rawKey: cleanLabel,
        label: getLabel(cleanLabel),
        value: Number(item.y) || 0,
        color: COLOR_MAP[cleanLabel] || COLOR_MAP[item.x] || PALETTE_FALLBACK[idx % PALETTE_FALLBACK.length],
      };
    });
  }, [salesPieData, proportionTexts]);

  // The tooltip sits just right of the ring, level with the hovered slice, so it never covers the centre total
  const [tipAt, setTipAt] = React.useState<{ x: number; y: number } | null>(null);
  const placeTip = (sector: { cx: number; cy: number; midAngle: number; outerRadius: number }) => {
    const angle = (-sector.midAngle * Math.PI) / 180;
    setTipAt({
      x: sector.cx + sector.outerRadius + 12,
      y: sector.cy + sector.outerRadius * Math.sin(angle),
    });
  };

  const total = React.useMemo(
    () => segments.reduce((sum, seg) => sum + seg.value, 0),
    [segments],
  );

  const percent = (val: number) => (total === 0 ? 0 : (val / total) * 100);
  const formatter = (val: number) => `${formatNumber(val)} ${t.common.millionVnd}`;

  if (loading) {
    return (
      <Card className="rounded-xl border-0 bg-card p-8 shadow-sm">
        <div className="h-60 flex items-center justify-center text-muted-foreground text-sm">
          {t.common.loading}
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border-0 bg-card text-card-foreground shadow-sm overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/40 pb-4 pt-5 px-6">
        <div>
          <CardTitle className="text-base font-semibold text-foreground">
            {proportionTexts.title}
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            {proportionTexts.subtitles[salesType]}
          </CardDescription>
        </div>
        <div className="shrink-0">
          <Segmented
            value={salesType}
            onChange={(val) => handleChangeSalesType?.(val as SalesType)}
            options={[
              { label: proportionTexts.tabs.assets, value: 'assets' },
              { label: proportionTexts.tabs.capital, value: 'capital' },
              { label: proportionTexts.tabs.cash, value: 'cash' },
              { label: proportionTexts.tabs.portfolio, value: 'portfolio' },
            ]}
            size="middle"
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col md:flex-row items-center gap-8 lg:gap-14 px-6 lg:px-8 py-6">
        {/* Donut Chart with center total and label */}
        <div className="relative size-48 sm:size-52 shrink-0 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                position={tipAt ?? undefined}
                allowEscapeViewBox={{ x: true, y: true }}
                isAnimationActive={false}
                wrapperStyle={{ zIndex: 20, pointerEvents: 'none' }}
                content={(tooltipProps) => (
                  <div className="-translate-y-1/2">
                    <ChartPanelTooltip {...tooltipProps} valueFormatter={formatter} />
                  </div>
                )}
              />
              <Pie
                cornerRadius={4}
                data={segments}
                dataKey="value"
                innerRadius="72%"
                nameKey="label"
                outerRadius="100%"
                startAngle={90}
                endAngle={-270}
                stroke="var(--color-card, #ffffff)"
                strokeWidth={2}
                onMouseEnter={placeTip}
                onMouseLeave={() => setTipAt(null)}
              >
                {segments.map((segment) => (
                  <Cell key={segment.rawKey} fill={segment.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold tracking-tight text-foreground tabular-nums">
              {formatCompact(total)}
            </span>
            <span className="text-muted-foreground text-xs font-medium mt-0.5">
              {proportionTexts.totalLabels[salesType]}
            </span>
          </div>
        </div>

        {/* Breakdown Table */}
        <div className="w-full min-w-0">
          <table className="w-full text-sm">
            <caption className="sr-only">{`${proportionTexts.title}: ${proportionTexts.subtitles[salesType]}`}</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">{language === 'en' ? 'Category' : 'Hạng mục'}</th>
                <th scope="col">{proportionTexts.totalLabels[salesType]}</th>
                <th scope="col">{language === 'en' ? 'Weight' : 'Tỷ trọng'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {segments.map((segment) => (
                <tr key={segment.rawKey} className="transition-colors hover:bg-muted/20">
                  <th scope="row" className="py-2.5 pr-3 text-left font-normal text-foreground">
                    <span className="flex items-center gap-2.5">
                      <ChartPanelKey color={segment.color} />
                      <span className="truncate">{segment.label}</span>
                    </span>
                  </th>
                  <td className="py-2.5 pr-4 text-right font-semibold tabular-nums text-foreground">
                    {formatter(segment.value)}
                  </td>
                  <td className="text-muted-foreground w-16 py-2.5 text-right font-medium tabular-nums">
                    {percent(segment.value).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProportionSales;
