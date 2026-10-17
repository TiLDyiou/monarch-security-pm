// Service for fetching real-time and historical Vietnamese stock market data (HOSE)
// Primary source: Entrade / DNSE API, secondary source: VNDirect finfo-api
import dayjs from 'dayjs';

export interface StockCandle {
  time: string; // 'YYYY-MM-DD'
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface StockVolume {
  time: string;
  value: number;
  color: string;
}

export interface StockMA {
  time: string;
  value: number;
}

export interface StockHistoryData {
  symbol: string;
  candles: StockCandle[];
  volumes: StockVolume[];
  ma20: StockMA[];
  latestPrice: number;
  refPrice: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
}

export interface RealtimeQuote {
  code: string;
  price: number;
  refPrice: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  time: string;
}

// Compute simple moving average (period = 20)
function computeMA(candles: StockCandle[], period = 20): StockMA[] {
  const ma: StockMA[] = [];
  for (let i = 0; i < candles.length; i++) {
    if (i < period - 1) continue;
    let sum = 0;
    for (let j = i - period + 1; j <= i; j++) {
      sum += candles[j].close;
    }
    ma.push({
      time: candles[i].time,
      value: Math.round(sum / period),
    });
  }
  return ma;
}

// A request that never answers must not hold the chart hostage: give each source a time budget
async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// Entrade has no CORS headers, so it is reached through the same-origin /api/entrade proxy
// (Vite dev server and vercel.json rewrites)
const ENTRADE_BASE = '/api/entrade';

// Fetch historical 1D candles from Entrade
async function fetchFromEntrade(symbol: string): Promise<StockHistoryData> {
  // Round the window to 5-minute steps so the URL stays identical for a while and browser/CDN caches can answer
  const to = Math.ceil(Date.now() / 1000 / 300) * 300;
  const from = to - 365 * 24 * 3600; // 1 year
  const url = `${ENTRADE_BASE}/chart-api/v2/ohlcs/stock?from=${from}&to=${to}&symbol=${symbol}&resolution=1D`;

  const res = await fetchWithTimeout(url, 6000);
  if (!res.ok) throw new Error(`Entrade error status ${res.status}`);
  const data = await res.json();

  const timestamps: number[] = data.t || [];
  if (timestamps.length === 0) throw new Error(`Entrade returned no candles for ${symbol}`);
  const opens: number[] = data.o || [];
  const highs: number[] = data.h || [];
  const lows: number[] = data.l || [];
  const closes: number[] = data.c || [];
  const volumesRaw: number[] = data.v || [];

  const candles: StockCandle[] = [];
  const volumes: StockVolume[] = [];
  const seenDates = new Set<string>();

  for (let i = 0; i < timestamps.length; i++) {
    const timeStr = dayjs(timestamps[i] * 1000).format('YYYY-MM-DD');
    if (seenDates.has(timeStr)) continue;
    seenDates.add(timeStr);

    const open = Math.round(opens[i] * 1000);
    const high = Math.round(highs[i] * 1000);
    const low = Math.round(lows[i] * 1000);
    const close = Math.round(closes[i] * 1000);
    const volume = Math.round(volumesRaw[i] || 0);

    candles.push({ time: timeStr, open, high, low, close });
    volumes.push({
      time: timeStr,
      value: volume,
      color: close >= open ? 'rgba(8, 153, 129, 0.55)' : 'rgba(242, 54, 69, 0.55)',
    });
  }

  const ma20 = computeMA(candles, 20);

  const len = candles.length;
  const latestPrice = len > 0 ? candles[len - 1].close : 0;
  const prevPrice = len > 1 ? candles[len - 2].close : latestPrice;
  const change = latestPrice - prevPrice;
  const changePercent = prevPrice > 0 ? Math.round((change / prevPrice) * 10000) / 100 : 0;
  const refPrice = prevPrice;

  return {
    symbol,
    candles,
    volumes,
    ma20,
    latestPrice,
    refPrice,
    change,
    changePercent,
    lastUpdated: len > 0 ? candles[len - 1].time : dayjs().format('YYYY-MM-DD'),
  };
}

// Fallback: Fetch historical daily prices from VNDirect finfo-api
async function fetchFromVNDirect(symbol: string): Promise<StockHistoryData> {
  const url = `https://finfo-api.vndirect.com.vn/v4/stock_prices?sort=date:asc&q=code:${symbol}&size=260`;
  const res = await fetchWithTimeout(url, 3000);
  if (!res.ok) throw new Error(`VNDirect error status ${res.status}`);
  const json = await res.json();
  const list = json.data || [];

  const candles: StockCandle[] = [];
  const volumes: StockVolume[] = [];
  const seenDates = new Set<string>();

  for (const item of list) {
    if (!item.date || seenDates.has(item.date)) continue;
    seenDates.add(item.date);

    const open = Math.round((item.open || item.basicPrice) * 1000);
    const high = Math.round((item.high || open) * 1000);
    const low = Math.round((item.low || open) * 1000);
    const close = Math.round((item.close || open) * 1000);
    const volume = Math.round(item.nmVolume || 0);

    candles.push({ time: item.date, open, high, low, close });
    volumes.push({
      time: item.date,
      value: volume,
      color: close >= open ? 'rgba(8, 153, 129, 0.55)' : 'rgba(242, 54, 69, 0.55)',
    });
  }

  const ma20 = computeMA(candles, 20);
  const len = candles.length;
  const latestPrice = len > 0 ? candles[len - 1].close : 0;
  const prevPrice = len > 1 ? candles[len - 2].close : latestPrice;
  const change = latestPrice - prevPrice;
  const changePercent = prevPrice > 0 ? Math.round((change / prevPrice) * 10000) / 100 : 0;

  return {
    symbol,
    candles,
    volumes,
    ma20,
    latestPrice,
    refPrice: prevPrice,
    change,
    changePercent,
    lastUpdated: len > 0 ? candles[len - 1].time : dayjs().format('YYYY-MM-DD'),
  };
}

// In-memory cache for instant ticker switches and offline resilience
const historyCache = new Map<string, { data: StockHistoryData; at: number }>();
const FRESH_MS = 60 * 1000;

/** Last loaded history for a ticker, if any, so the chart can show it before a refresh completes */
export function peekStockHistory(symbol: string): StockHistoryData | undefined {
  return historyCache.get(symbol)?.data;
}

// Deterministic realistic fallback data if both live APIs are unreachable
const STOCK_REFS: Record<string, { ref: number; price: number; step: number }> = {
  BID: { ref: 33950, price: 33950, step: 50 },
  SSI: { ref: 19450, price: 19450, step: 50 },
  MSN: { ref: 71400, price: 71400, step: 100 },
  HAH: { ref: 48900, price: 48900, step: 50 },
};

export function generateFallbackData(symbol: string): StockHistoryData {
  const meta = STOCK_REFS[symbol] || { ref: 40000, price: 40000, step: 50 };
  const count = 240;
  const candles: StockCandle[] = [];
  const volumes: StockVolume[] = [];

  let seed = symbol.charCodeAt(0) * 137 + symbol.charCodeAt(1) * 31;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  let d = dayjs();
  if (d.day() === 0) d = d.subtract(2, 'day');
  else if (d.day() === 6) d = d.subtract(1, 'day');

  const dates: string[] = [];
  while (dates.length < count) {
    if (d.day() !== 0 && d.day() !== 6) {
      dates.unshift(d.format('YYYY-MM-DD'));
    }
    d = d.subtract(1, 'day');
  }

  const startPrice = Math.round((meta.ref * 0.88) / meta.step) * meta.step;
  let price = startPrice;

  for (let i = 0; i < count; i++) {
    const isLast = i === count - 1;
    const progress = i / (count - 1);
    const target = startPrice + (meta.price - startPrice) * progress;

    const pull = (target - price) * 0.08;
    const wave = Math.sin(i * 0.18 + symbol.length) * (meta.ref * 0.015);
    const noise = (rand() - 0.49) * (meta.ref * 0.025);

    const open = Math.round(price / meta.step) * meta.step;
    let close = isLast ? meta.price : Math.round((open + pull + wave + noise) / meta.step) * meta.step;
    if (close <= 0) close = open;

    const candleRange = Math.abs(close - open);
    const highBump = candleRange * rand() + rand() * (meta.ref * 0.012);
    const lowBump = candleRange * rand() + rand() * (meta.ref * 0.012);

    const high = Math.round((Math.max(open, close) + highBump) / meta.step) * meta.step;
    const low = Math.round(Math.max(meta.step, Math.min(open, close) - lowBump) / meta.step) * meta.step;

    const time = dates[i];
    candles.push({ time, open, high, low, close });

    const isUp = close >= open;
    const baseVol = meta.ref > 60000 ? 1_500_000 : 3_500_000;
    const vol = Math.round(baseVol * (0.6 + rand() * 1.2));
    volumes.push({
      time,
      value: vol,
      color: isUp ? 'rgba(8, 153, 129, 0.55)' : 'rgba(242, 54, 69, 0.55)',
    });

    price = close;
  }

  const ma20 = computeMA(candles, 20);
  const len = candles.length;
  const latestPrice = len > 0 ? candles[len - 1].close : meta.price;
  const prevPrice = len > 1 ? candles[len - 2].close : latestPrice;
  const change = latestPrice - prevPrice;
  const changePercent = prevPrice > 0 ? Math.round((change / prevPrice) * 10000) / 100 : 0;

  return {
    symbol,
    candles,
    volumes,
    ma20,
    latestPrice,
    refPrice: prevPrice,
    change,
    changePercent,
    lastUpdated: len > 0 ? candles[len - 1].time : dayjs().format('YYYY-MM-DD'),
  };
}

// Polling and quick ticker switches share one request per symbol instead of stacking new ones
const inFlight = new Map<string, Promise<StockHistoryData>>();

export function fetchStockHistory(symbol: string, maxAgeMs = FRESH_MS): Promise<StockHistoryData> {
  const cached = historyCache.get(symbol);
  if (cached && Date.now() - cached.at < maxAgeMs) return Promise.resolve(cached.data);
  const pending = inFlight.get(symbol);
  if (pending) return pending;
  const request = loadStockHistory(symbol).finally(() => inFlight.delete(symbol));
  inFlight.set(symbol, request);
  return request;
}

/** Warm the cache for several tickers at once so later switches are instant */
export function prefetchStockHistory(symbols: string[]): void {
  symbols.forEach((symbol) => {
    void fetchStockHistory(symbol);
  });
}

async function loadStockHistory(symbol: string): Promise<StockHistoryData> {
  const remember = (data: StockHistoryData) => {
    historyCache.set(symbol, { data, at: Date.now() });
    return data;
  };
  try {
    return remember(await fetchFromEntrade(symbol));
  } catch {
    try {
      return remember(await fetchFromVNDirect(symbol));
    } catch {
      const cached = historyCache.get(symbol);
      if (cached) return cached.data;
      // Placeholder only; stamped as stale so the next request tries the live sources again
      const fallback = generateFallbackData(symbol);
      historyCache.set(symbol, { data: fallback, at: 0 });
      return fallback;
    }
  }
}

// Fetch real-time single quote
export async function fetchRealtimeQuote(symbol: string): Promise<RealtimeQuote | null> {
  try {
    const history = await fetchStockHistory(symbol);
    const candles = history.candles;
    if (candles.length === 0) return null;
    const latest = candles[candles.length - 1];
    const prev = candles.length > 1 ? candles[candles.length - 2] : latest;
    const change = latest.close - prev.close;
    const changePercent = prev.close > 0 ? Math.round((change / prev.close) * 10000) / 100 : 0;
    const latestVol = history.volumes[history.volumes.length - 1]?.value || 0;

    return {
      code: symbol,
      price: latest.close,
      refPrice: prev.close,
      change,
      changePercent,
      open: latest.open,
      high: latest.high,
      low: latest.low,
      volume: latestVol,
      time: latest.time,
    };
  } catch {
    return null;
  }
}

