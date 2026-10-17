import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CompressOutlined,
  ExpandOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  LineChartOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Button, Segmented, Space, Tag, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import {
  type CandlestickData,
  CandlestickSeries,
  ColorType,
  createChart,
  CrosshairMode,
  type HistogramData,
  HistogramSeries,
  type IChartApi,
  type ISeriesApi,
  type LineData,
  LineSeries,
  LineStyle,
  type Time,
} from 'lightweight-charts';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { STOCKS } from '@/pages/dashboard/mock/client';
import {
  fetchStockHistory,
  generateFallbackData,
  peekStockHistory,
  prefetchStockHistory,
  type StockHistoryData,
} from '@/pages/dashboard/services/stockService';
import { formatNumber } from '@/utils/format';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/LanguageContext';

const { Text } = Typography;

export interface StockOption {
  code: string;
  name: string;
  symbol: string;
  sector?: string;
  weightInP?: number;
  weightInC?: number;
  initialValue?: number;
  expectedReturnAnnual?: number;
  riskAnnual?: number;
  role?: string;
  refPrice: number;
  price: number;
  change: number;
}

interface HoverInfo {
  time?: string;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
  ma20?: number;
}

export default function LightweightChart() {
  const { t } = useLanguage();
  const chartTexts = t.dashboard.monitor.chart;

  const [selectedCode, setSelectedCode] = useState<string>('BID');
  const [selectedRange, setSelectedRange] = useState<string>('6M');
  const [showMA, setShowMA] = useState<boolean>(true);
  const [showVolume, setShowVolume] = useState<boolean>(true);
  const [heightMode, setHeightMode] = useState<'standard' | 'expanded' | 'fullscreen'>('standard');
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);

  // Live stock data states
  const [historyData, setHistoryData] = useState<StockHistoryData>(
    () => peekStockHistory('BID') ?? generateFallbackData('BID'),
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [realtimeQuotes, setRealtimeQuotes] = useState<Record<string, { price: number; change: number }>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const chartWrapperRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);
  const maSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);

  // The ticker currently on screen; answers for a ticker the user already left are ignored
  const selectedRef = useRef(selectedCode);
  selectedRef.current = selectedCode;

  // Show whatever is cached for the ticker straight away, then refresh it in the background if it is stale
  const loadStockData = useCallback(async (code: string, maxAgeMs?: number) => {
    const cached = peekStockHistory(code);
    if (cached) setHistoryData(cached);
    else setLoading(true);
    try {
      const data = await fetchStockHistory(code, maxAgeMs);
      if (selectedRef.current !== code) return;
      setHistoryData(data);
      setRealtimeQuotes((prev) => ({
        ...prev,
        [code]: { price: data.latestPrice, change: data.changePercent },
      }));
    } catch {
      // Fallback already in historyData
    } finally {
      setLoading(false);
    }
  }, []);

  // Warm every portfolio ticker once, so switching between them does not wait on the network
  useEffect(() => {
    prefetchStockHistory(STOCKS.map((s) => s.code));
  }, []);

  // Fetch on stock selection change
  useEffect(() => {
    loadStockData(selectedCode);
  }, [selectedCode, loadStockData]);

  // Periodic polling for real-time price updates (every 25 seconds)
  useEffect(() => {
    const pollInterval = setInterval(() => {
      loadStockData(selectedCode, 25000);
    }, 25000);
    return () => clearInterval(pollInterval);
  }, [selectedCode, loadStockData]);

  // Sync with client stocks and live quotes
  const stockList = useMemo<StockOption[]>(() => {
    return STOCKS.map((s) => {
      const rt = realtimeQuotes[s.code];
      const price = rt ? rt.price : historyData?.symbol === s.code ? historyData.latestPrice : s.ref;
      const change = rt ? rt.change : historyData?.symbol === s.code ? historyData.changePercent : 0;
      return {
        code: s.code,
        name: s.name,
        symbol: `HOSE:${s.code}`,
        sector: s.sector,
        weightInP: s.weightInP,
        weightInC: s.weightInC,
        initialValue: s.initialValue,
        expectedReturnAnnual: s.expectedReturnAnnual,
        riskAnnual: s.riskAnnual,
        role: s.role,
        refPrice: s.ref,
        price,
        change,
      };
    });
  }, [realtimeQuotes, historyData]);

  const activeStock = useMemo(
    () => stockList.find((s) => s.code === selectedCode) || stockList[0],
    [stockList, selectedCode],
  );

  // Convert loaded historyData to Lightweight Charts series format
  const candles = useMemo<CandlestickData<Time>[]>(() => {
    if (!historyData || historyData.symbol !== selectedCode) return [];
    return historyData.candles.map((c) => ({
      time: c.time as unknown as Time,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    }));
  }, [historyData, selectedCode]);

  const volumes = useMemo<HistogramData<Time>[]>(() => {
    if (!historyData || historyData.symbol !== selectedCode) return [];
    return historyData.volumes.map((v) => ({
      time: v.time as unknown as Time,
      value: v.value,
      color: v.color,
    }));
  }, [historyData, selectedCode]);

  const ma20 = useMemo<LineData<Time>[]>(() => {
    if (!historyData || historyData.symbol !== selectedCode) return [];
    return historyData.ma20.map((m) => ({
      time: m.time as unknown as Time,
      value: m.value,
    }));
  }, [historyData, selectedCode]);

  const lastCandle = candles[candles.length - 1];
  const lastVolume = volumes[volumes.length - 1];
  const lastMA = ma20[ma20.length - 1];

  // Set visible range helper
  const applyTimeRange = useCallback(
    (range: string) => {
      setSelectedRange(range);
      const chart = chartRef.current;
      if (!chart || candles.length === 0) return;

      const timeScale = chart.timeScale();

      const daysMap: Record<string, number> = {
        '1M': 22,
        '3M': 65,
        '6M': 130,
        '1Y': 220,
      };
      const barsCount = daysMap[range] ?? 65;
      timeScale.setVisibleLogicalRange({
        from: Math.max(0, candles.length - barsCount),
        to: candles.length + 3, // small right padding
      });
    },
    [candles.length],
  );

  // Initialize Lightweight Chart
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create chart instance
    const chart = createChart(container, {
      width: container.clientWidth || 800,
      height: container.clientHeight || 620,
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: '#475569',
        fontSize: 12,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      },
      grid: {
        vertLines: { color: '#f1f5f9' },
        horzLines: { color: '#f1f5f9' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: '#64748b',
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: '#0f172a',
        },
        horzLine: {
          color: '#64748b',
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: '#0f172a',
        },
      },
      rightPriceScale: {
        borderColor: '#cbd5e1',
        scaleMargins: {
          top: 0.08,
          bottom: 0.22, // Space for volume at bottom
        },
        autoScale: true,
      },
      timeScale: {
        borderColor: '#cbd5e1',
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 5,
        barSpacing: 8,
        minBarSpacing: 3,
      },
      handleScroll: {
        vertTouchDrag: false,
      },
    });

    chartRef.current = chart;

    // Candlestick Series
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#089981',
      downColor: '#f23645',
      borderVisible: false,
      wickUpColor: '#089981',
      wickDownColor: '#f23645',
      priceFormat: {
        type: 'price',
        precision: 0,
        minMove: 50,
      },
    });
    candleSeriesRef.current = candleSeries;

    // Volume Series (overlay at bottom)
    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '', // overlay
    });
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.82,
        bottom: 0,
      },
    });
    volumeSeriesRef.current = volumeSeries;

    // Moving Average Series (MA20)
    const maSeries = chart.addSeries(LineSeries, {
      color: '#2563eb',
      lineWidth: 1.5,
      priceScaleId: 'right',
      title: 'MA20',
      crosshairMarkerVisible: true,
    });
    maSeriesRef.current = maSeries;

    // Tooltip / Crosshair subscription
    chart.subscribeCrosshairMove((param) => {
      if (
        !param.point ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > container.clientWidth ||
        param.point.y < 0 ||
        param.point.y > container.clientHeight
      ) {
        setHoverInfo(null);
      } else {
        const cData = param.seriesData.get(candleSeries) as CandlestickData<Time> | undefined;
        const vData = param.seriesData.get(volumeSeries) as HistogramData<Time> | undefined;
        const mData = param.seriesData.get(maSeries) as LineData<Time> | undefined;

        if (cData) {
          setHoverInfo({
            time: param.time.toString(),
            open: cData.open,
            high: cData.high,
            low: cData.low,
            close: cData.close,
            volume: vData?.value,
            ma20: mData?.value,
          });
        }
      }
    });

    // ResizeObserver for rock-solid responsive sizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          chart.applyOptions({ width, height });
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
      volumeSeriesRef.current = null;
      maSeriesRef.current = null;
    };
  }, []);

  // Update chart data when active stock changes
  useEffect(() => {
    if (!chartRef.current || !candleSeriesRef.current) return;

    candleSeriesRef.current.setData(candles);

    if (volumeSeriesRef.current) {
      volumeSeriesRef.current.setData(volumes);
    }

    if (maSeriesRef.current) {
      maSeriesRef.current.setData(ma20);
    }

    // Default to selected range
    applyTimeRange(selectedRange);
    setHoverInfo(null);
  }, [candles, volumes, ma20, selectedRange, applyTimeRange]);

  // Toggle Series Visibility
  useEffect(() => {
    if (maSeriesRef.current) {
      maSeriesRef.current.applyOptions({ visible: showMA });
    }
  }, [showMA]);

  useEffect(() => {
    if (volumeSeriesRef.current) {
      volumeSeriesRef.current.applyOptions({ visible: showVolume });
    }
  }, [showVolume]);

  // Handle Height Mode Changes & Fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && heightMode === 'fullscreen') {
        setHeightMode('standard');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Trigger chart resize immediately after DOM re-render
    const timer = setTimeout(() => {
      if (containerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
        chartRef.current.timeScale().fitContent();
      }
    }, 100);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [heightMode]);

  // Current active OHLCV metrics (hovered or latest)
  const currentO = hoverInfo?.open ?? lastCandle?.open ?? activeStock.price;
  const currentH = hoverInfo?.high ?? lastCandle?.high ?? activeStock.price;
  const currentL = hoverInfo?.low ?? lastCandle?.low ?? activeStock.price;
  const currentC = hoverInfo?.close ?? lastCandle?.close ?? activeStock.price;
  const currentVol = hoverInfo?.volume ?? lastVolume?.value ?? 0;
  const currentMA = hoverInfo?.ma20 ?? lastMA?.value;
  const currentTime = hoverInfo?.time ?? (lastCandle?.time as string) ?? dayjs().format('YYYY-MM-DD');

  const diff = currentC - currentO;
  const diffPercent = currentO > 0 ? Math.round((diff / currentO) * 10000) / 100 : 0;
  const isUp = diff >= 0;

  // Compute calculated height based on height mode
  const getContainerMinHeight = () => {
    if (heightMode === 'fullscreen') return 'calc(100vh - 120px)';
    if (heightMode === 'expanded') return 800;
    return 480; // optimized standard vertical height
  };

  return (
    <div
      ref={chartWrapperRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        borderRadius: 8,
        ...(heightMode === 'fullscreen'
          ? {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
              padding: '16px 24px',
              backgroundColor: '#ffffff',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }
          : {}),
      }}
    >
      {/* ── Single Minimalist Control & Information Bar ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-2.5 border-b border-border/30 mb-2">
        {/* Left: Ticker Switcher + Active Price + Live OHLC Readout */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
          {/* Ticker Segmented Control */}
          <Segmented
            value={selectedCode}
            onChange={(val) => setSelectedCode(val as string)}
            options={stockList.map((s) => ({
              label: s.code,
              value: s.code,
            }))}
            size="middle"
          />

          {/* Current Market Price & Daily Change */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold tracking-tight tabular-nums text-foreground">
              {formatNumber(activeStock.price)}
            </span>
            <span
              className={cn(
                'text-xs font-semibold tabular-nums',
                activeStock.change >= 0 ? 'text-emerald-600' : 'text-rose-600',
              )}
            >
              {activeStock.change >= 0 ? '+' : ''}{activeStock.change}%
            </span>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              · {activeStock.name}
            </span>
          </div>

          {/* Live Hover OHLC Readout */}
          <div className="flex items-center gap-3 text-xs tabular-nums text-muted-foreground">
            <span>O <strong className="text-foreground font-semibold">{formatNumber(currentO)}</strong></span>
            <span>H <strong className="text-emerald-600 font-semibold">{formatNumber(currentH)}</strong></span>
            <span>L <strong className="text-rose-600 font-semibold">{formatNumber(currentL)}</strong></span>
            <span>C <strong className={cn('font-semibold', isUp ? 'text-emerald-600' : 'text-rose-600')}>{formatNumber(currentC)}</strong></span>
            {showVolume && currentVol > 0 && (
              <span className="hidden xl:inline">Vol <strong className="text-foreground font-semibold">{formatNumber(currentVol)}</strong></span>
            )}
            {showMA && currentMA !== undefined && (
              <span className="hidden xl:inline text-blue-600 font-semibold">MA20 {formatNumber(currentMA)}</span>
            )}
          </div>
        </div>

        {/* Right: Timeframe, Indicator Toggles & Utilities */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          {/* Timeframe selector */}
          <Segmented
            value={selectedRange}
            onChange={(val) => applyTimeRange(val as string)}
            options={[
              { label: chartTexts.timeframes['1M'], value: '1M' },
              { label: chartTexts.timeframes['3M'], value: '3M' },
              { label: chartTexts.timeframes['6M'], value: '6M' },
              { label: chartTexts.timeframes['1Y'], value: '1Y' },
            ]}
            size="middle"
          />

          {/* Indicator toggles */}
          <Tooltip title={chartTexts.ma20Tooltip}>
            <Button
              type={showMA ? 'primary' : 'default'}
              size="middle"
              onClick={() => setShowMA(!showMA)}
              style={{
                borderRadius: 6,
                backgroundColor: showMA ? '#2563eb' : undefined,
                borderColor: showMA ? '#2563eb' : undefined,
                fontSize: 12,
              }}
            >
              MA20
            </Button>
          </Tooltip>

          <Tooltip title={chartTexts.volumeTooltip}>
            <Button
              type={showVolume ? 'primary' : 'default'}
              size="middle"
              onClick={() => setShowVolume(!showVolume)}
              style={{ borderRadius: 6, fontSize: 12 }}
            >
              Vol
            </Button>
          </Tooltip>

          {/* Quick utility icons */}
          <Tooltip title={chartTexts.refreshTooltip}>
            <Button
              type="text"
              icon={<ReloadOutlined spin={loading} style={{ fontSize: 13 }} />}
              onClick={() => {
                loadStockData(selectedCode);
                chartRef.current?.timeScale().fitContent();
              }}
              size="middle"
            />
          </Tooltip>

          <Tooltip title={heightMode === 'expanded' ? chartTexts.collapseTooltip : chartTexts.expandTooltip}>
            <Button
              type="text"
              icon={heightMode === 'expanded' ? <CompressOutlined style={{ fontSize: 13 }} /> : <ExpandOutlined style={{ fontSize: 13 }} />}
              onClick={() => setHeightMode(heightMode === 'expanded' ? 'standard' : 'expanded')}
              size="middle"
            />
          </Tooltip>

          <Tooltip title={heightMode === 'fullscreen' ? chartTexts.exitFullscreenTooltip : chartTexts.fullscreenTooltip}>
            <Button
              type="text"
              icon={heightMode === 'fullscreen' ? <FullscreenExitOutlined style={{ fontSize: 13 }} /> : <FullscreenOutlined style={{ fontSize: 13 }} />}
              onClick={() => setHeightMode(heightMode === 'fullscreen' ? 'standard' : 'fullscreen')}
              size="middle"
            />
          </Tooltip>
        </div>
      </div>

      {/* ── Lightweight Chart Canvas Container ── */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          width: '100%',
          minHeight: getContainerMinHeight(),
          position: 'relative',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      />
    </div>
  );
}
