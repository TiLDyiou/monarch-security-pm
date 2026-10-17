import * as React from 'react';
import { useId, useMemo, useState, useEffect } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
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
} from '@/components/dashboardblocks/chart-panel';
import {
  type Metric,
  MetricChange,
  MetricSparkline,
  describeHistory,
  formatMetricValue,
  getMetricFormatter,
} from '@/components/dashboardblocks/metric-list';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { STOCKS } from '@/pages/dashboard/mock/client';
import { fetchStockHistory, generateFallbackData } from '@/pages/dashboard/services/stockService';
import { formatNumber } from '@/utils/format';
import type { SearchDataType } from '../data.d';

export interface WatchedMetric extends Metric {
  history: number[];
  dates: string[];
  highQuarter: number;
  lowQuarter: number;
}

interface TopSearchProps {
  loading?: boolean;
  searchData?: SearchDataType[];
}

const TopSearch: React.FC<TopSearchProps> = ({ loading = false }) => {
  const id = useId();
  const [selectedKey, setSelectedKey] = useState<string>('BID');
  const [stockHistories, setStockHistories] = useState<Record<string, { candles: { time: string; close: number }[] }>>(() => {
    // Initial deterministic data (65 trading sessions = 1 quarter)
    const init: Record<string, { candles: { time: string; close: number }[] }> = {};
    for (const s of STOCKS) {
      const fb = generateFallbackData(s.code);
      init[s.code] = { candles: fb.candles.slice(-65) };
    }
    return init;
  });

  // Fetch live quarter session histories in the background
  useEffect(() => {
    let mounted = true;
    for (const s of STOCKS) {
      fetchStockHistory(s.code)
        .then((data) => {
          if (!mounted) return;
          setStockHistories((prev) => ({
            ...prev,
            [s.code]: { candles: data.candles.slice(-65) },
          }));
        })
        .catch(() => {});
    }
    return () => {
      mounted = false;
    };
  }, []);

  // Build metrics list for the 4 stocks
  const metrics = useMemo<WatchedMetric[]>(() => {
    return STOCKS.map((s) => {
      const dataObj = stockHistories[s.code] || { candles: [] };
      const candles = dataObj.candles;
      const history = candles.map((c) => c.close);
      const dates = candles.map((c) => c.time);
      const value = history.length > 0 ? history[history.length - 1] : s.ref;
      const previous = history.length > 1 ? history[0] : s.ref;
      const highQuarter = history.length > 0 ? Math.max(...history) : value;
      const lowQuarter = history.length > 0 ? Math.min(...history) : value;

      return {
        key: s.code,
        label: s.code,
        value,
        previous,
        format: 'vnd',
        sector: s.sector,
        role: s.role,
        refPrice: s.ref,
        weightInP: s.weightInP,
        weightInC: s.weightInC,
        initialValue: s.initialValue,
        expectedReturnAnnual: s.expectedReturnAnnual,
        riskAnnual: s.riskAnnual,
        history,
        dates,
        highQuarter,
        lowQuarter,
      };
    });
  }, [stockHistories]);

  const activeMetric = useMemo(() => {
    return metrics.find((item) => item.key === selectedKey) || metrics[0];
  }, [metrics, selectedKey]);

  if (!activeMetric) return null;

  const format = getMetricFormatter(activeMetric.format);

  const chartData = activeMetric.history.map((val, idx) => ({
    label: activeMetric.dates[idx] || String(idx + 1),
    value: val,
  }));

  const isUp = activeMetric.value >= (activeMetric.previous ?? activeMetric.value);
  const strokeColor = isUp ? '#089981' : '#f23645';

  return (
    <Card className="rounded-xl border-0 bg-card text-card-foreground shadow-sm gap-0 py-0 overflow-hidden">
      <CardHeader className="pt-5 pb-4 px-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-foreground">
              Giá cổ phiếu trong danh mục
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Theo dõi biến động so với quý trước
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <div className="grid grid-cols-1 lg:grid-cols-[19.5rem_minmax(0,1fr)] xl:grid-cols-[21rem_minmax(0,1fr)]">
        {/* ── Left Master List: 4 Stocks ── */}
        <fieldset className="min-w-0 border-b lg:border-b-0 lg:border-r border-border/40">
          <legend className="sr-only">Danh sách cổ phiếu trong danh mục</legend>
          <ul className="divide-y divide-border/30">
            {metrics.map((item) => {
              const isSelected = item.key === activeMetric.key;
              const stockUp = item.value >= (item.previous ?? item.value);

              return (
                <li key={item.key}>
                  <label
                    className={cn(
                      'relative grid cursor-pointer grid-cols-[minmax(0,1fr)_3.5rem_5.5rem] items-center gap-x-2.5 px-4 py-3.5 transition-colors motion-reduce:transition-none',
                      isSelected ? 'bg-muted/50' : 'hover:bg-muted/30',
                    )}
                  >
                    <input
                      type="radio"
                      name={id}
                      value={item.key}
                      checked={isSelected}
                      onChange={() => setSelectedKey(item.key)}
                      className="sr-only"
                    />

                    {/* Active vertical indicator bar */}
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-y-0 left-0 w-1 rounded-r bg-primary transition-all',
                        !isSelected && 'hidden',
                      )}
                    />

                    <div className="flex flex-col min-w-0">
                      <span className={cn('text-sm font-semibold truncate', isSelected ? 'text-primary' : 'text-foreground')}>
                        {item.label}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {STOCKS.find((s) => s.code === item.key)?.name}
                      </span>
                    </div>

                    <span aria-hidden className="flex justify-center">
                      <MetricSparkline
                        className="w-full h-5"
                        color={stockUp ? '#00A0B0' : '#f23645'}
                        data={item.history}
                        label={describeHistory(item)}
                      />
                    </span>

                    <span className="flex flex-col items-end gap-0.5">
                      <span className="text-xs font-semibold tabular-nums text-foreground whitespace-nowrap">
                        {formatMetricValue(item, item.value)}
                      </span>
                      <MetricChange metric={item} comparison="vs quý trước" />
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        {/* ── Right Detail Panel: Interactive Chart & Key Info ── */}
        <section
          aria-labelledby={`${id}-heading`}
          className="flex min-w-0 flex-col gap-4 px-3.5 sm:px-5 lg:px-5 pt-5 pb-6"
        >
          {/* Header Info */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <h3 id={`${id}-heading`} className="text-base font-bold text-foreground">
                  {activeMetric.label}
                </h3>
                <span className="text-xs text-muted-foreground font-normal">
                  — {STOCKS.find((s) => s.code === activeMetric.key)?.name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-md border border-border/40 bg-muted/40 px-2 py-1 font-medium text-foreground">
                  ORP - Tối ưu rủi ro: <strong className="text-primary">{activeMetric.weightInP}%</strong>
                </span>
                <span className="rounded-md border border-border/40 bg-muted/40 px-2 py-1 font-medium text-foreground">
                  OCP - Tối ưu vốn: <strong className="text-foreground">{activeMetric.weightInC}%</strong>
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3 mt-1">
              <p className="text-3xl font-bold tracking-tight tabular-nums text-foreground">
                {format(activeMetric.value)}
              </p>
              <div className="flex items-center gap-1.5 text-xs">
                <MetricChange metric={activeMetric} />
              </div>
            </div>
          </div>

          {/* Area Chart: Solid flat fill, NO gradient, clean stroke */}
          <ChartPanelFigure className="h-56 sm:h-64 lg:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 12, right: 6, bottom: 0, left: 6 }}>
                <CartesianGrid {...chartGridProps} />
                <XAxis
                  {...chartAxisProps}
                  dataKey="label"
                  interval="preserveStartEnd"
                  minTickGap={45}
                />
                <YAxis
                  {...chartAxisProps}
                  domain={['auto', 'auto']}
                  tickFormatter={(val: number) => (val >= 1000 ? `${Math.round(val / 1000)}k` : `${val}`)}
                  width={46}
                  tickMargin={6}
                />
                <RechartsTooltip
                  content={(tooltipProps) => (
                    <ChartPanelTooltip {...tooltipProps} valueFormatter={format} />
                  )}
                  cursor={{ stroke: '#cbd5e1', strokeDasharray: '3 3' }}
                />
                <Area
                  activeDot={{ r: 4, stroke: '#ffffff', strokeWidth: 2 }}
                  dataKey="value"
                  fill={strokeColor}
                  fillOpacity={0.06}
                  name={activeMetric.label}
                  stroke={strokeColor}
                  strokeWidth={2}
                  type="monotone"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartPanelFigure>

          {/* Bottom Stock Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3.5 border-t border-border/30 text-center">
            <div className="py-1">
              <div className="text-xs sm:text-sm font-medium text-muted-foreground">Chốt quý trước</div>
              <div className="text-lg sm:text-xl font-bold text-foreground tabular-nums mt-1">
                {formatNumber(activeMetric.previous ?? activeMetric.refPrice ?? 0)}
              </div>
            </div>
            <div className="py-1">
              <div className="text-xs sm:text-sm font-medium text-muted-foreground">Cao nhất quý</div>
              <div className="text-lg sm:text-xl font-bold text-emerald-600 tabular-nums mt-1">
                {formatNumber(activeMetric.highQuarter)}
              </div>
            </div>
            <div className="py-1">
              <div className="text-xs sm:text-sm font-medium text-muted-foreground">Thấp nhất quý</div>
              <div className="text-lg sm:text-xl font-bold text-rose-600 tabular-nums mt-1">
                {formatNumber(activeMetric.lowQuarter)}
              </div>
            </div>
            <div className="py-1">
              <div className="text-xs sm:text-sm font-medium text-muted-foreground">Vốn đầu tư ban đầu</div>
              <div className="text-lg sm:text-xl font-bold text-foreground tabular-nums mt-1">
                {activeMetric.initialValue} tr ₫
              </div>
            </div>
          </div>

          <ChartPanelTable
            caption={`Biến động giá ${activeMetric.label} so với quý trước`}
            columns={[
              { key: 'label', label: 'Ngày' },
              { format, key: 'value', label: activeMetric.label },
            ]}
            rows={chartData}
          />
        </section>
      </div>
    </Card>
  );
};

export default TopSearch;
