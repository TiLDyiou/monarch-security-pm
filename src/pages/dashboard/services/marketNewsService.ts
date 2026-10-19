import dayjs from 'dayjs';

export interface MarketNewsItem {
  id: string | number;
  title: string;
  description: string;
  publishDate: string;
  source: string;
  symbol?: string;
  url?: string;
}

export const POPULAR_TICKERS = [
  { code: 'ALL', name: 'Thị trường chung' },
  { code: 'BID', name: 'Ngân hàng BIDV' },
  { code: 'HAH', name: 'Vận tải Hải An' },
  { code: 'SSI', name: 'Chứng khoán SSI' },
  { code: 'MSN', name: 'Tập đoàn Masan' },
  { code: 'FPT', name: 'Tập đoàn FPT' },
  { code: 'VIC', name: 'Tập đoàn Vingroup' },
  { code: 'VNM', name: 'Sữa Vinamilk' },
  { code: 'HPG', name: 'Thép Hòa Phát' },
  { code: 'VCB', name: 'Vietcombank' },
];

/* ---------- Text normalisation and search ---------- */

// Lowercase, strip Vietnamese diacritics (đ -> d) and collapse spaces, so "hoa phat" finds "Hòa Phát"
export const normalizeText = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

export interface NewsIndexEntry {
  item: MarketNewsItem;
  title: string;
  description: string;
  symbol: string;
  source: string;
  time: number;
}

// Normalise every searchable field once per result set instead of on every keystroke
export const buildNewsIndex = (items: MarketNewsItem[]): NewsIndexEntry[] =>
  items.map((item) => ({
    item,
    title: normalizeText(item.title),
    description: normalizeText(item.description),
    symbol: normalizeText(item.symbol ?? ''),
    source: normalizeText(item.source),
    time: dayjs(item.publishDate).valueOf() || 0,
  }));

const startsWord = (text: string, token: string) => text.startsWith(token) || text.includes(` ${token}`);

/**
 * Every word of the query must appear somewhere (title, summary, ticker or source), in any order.
 * Matches are ranked: exact ticker > title (word start first) > source > summary, then newest first.
 */
export const searchNews = (index: NewsIndexEntry[], query: string): MarketNewsItem[] => {
  const tokens = normalizeText(query).split(' ').filter(Boolean);
  if (tokens.length === 0) return index.map((entry) => entry.item);

  const scored: { entry: NewsIndexEntry; score: number }[] = [];
  for (const entry of index) {
    let score = 0;
    let matchedAll = true;
    for (const token of tokens) {
      let best = 0;
      if (entry.symbol === token) best = 6;
      else if (entry.title.includes(token)) best = startsWord(entry.title, token) ? 4 : 3;
      else if (entry.symbol.includes(token)) best = 3;
      else if (entry.source.includes(token)) best = 2;
      else if (entry.description.includes(token)) best = startsWord(entry.description, token) ? 1.5 : 1;
      if (best === 0) {
        matchedAll = false;
        break;
      }
      score += best;
    }
    if (matchedAll) scored.push({ entry, score });
  }

  return scored
    .sort((a, b) => b.score - a.score || b.entry.time - a.entry.time)
    .map(({ entry }) => entry.item);
};

/* ---------- Fetching ---------- */

// Daily files of the open-source ttqteo/news-crawler project, the news source behind vnstock-js (Vietstock, VnExpress,
// Tin Nhanh Chứng Khoán, Markettimes, Người Quan Sát...). One file per Vietnam calendar day, served with CORS
const CRAWLER_URL = 'https://raw.githubusercontent.com/ttqteo/news-crawler/master/docs/news';
// CafeF RSS sends no CORS headers, so it goes through the same-origin /api/cafef proxy (vite.config.ts, vercel.json)
const CAFEF_FEEDS = ['thi-truong-chung-khoan', 'doanh-nghiep', 'tai-chinh-ngan-hang'];

const MARKET_DAYS = 2; // broad market: today and yesterday
const TICKER_DAYS = 7; // a single ticker is rarely in the news, so look back a week
const REQUEST_TIMEOUT_MS = 8000;
const CACHE_TTL_MS = 5 * 60 * 1000; // today's file and CafeF stay fresh for 5 minutes; Refresh bypasses it

// Words that mark an article as being about a ticker, besides the ticker itself (diacritics-free, lowercase)
const TICKER_NAMES: Record<string, string[]> = {
  BID: ['bidv'],
  HAH: ['van tai hai an'],
  SSI: [],
  MSN: ['masan'],
  FPT: [],
  VIC: ['vingroup'],
  VNM: ['vinamilk'],
  HPG: ['hoa phat'],
  VCB: ['vietcombank'],
};

const fetchWithTimeout = async (url: string) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
};

const pad = (n: number) => String(n).padStart(2, '0');

// Files are named MM-DD-YYYY after the Vietnam (UTC+7) day, whatever the viewer's time zone
const vnDayKey = (daysAgo: number) => {
  const d = new Date(Date.now() + 7 * 3_600_000 - daysAgo * 86_400_000);
  return `${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}-${d.getUTCFullYear()}`;
};

const toLocal = (date: dayjs.Dayjs) => (date.isValid() ? date : dayjs()).format('YYYY-MM-DD HH:mm');

interface CrawlerItem {
  item_id?: string;
  source?: string;
  title?: string;
  summary?: string;
  link?: string;
  published?: string;
}

// null means the request failed (not cached, retried next time); [] means the source answered with nothing
type SourceResult = MarketNewsItem[] | null;

const loadCrawlerDay = async (key: string): Promise<SourceResult> => {
  try {
    const res = await fetchWithTimeout(`${CRAWLER_URL}/${key}.json`);
    // Today's file only appears once the first story of the day is crawled
    if (res.status === 404) return [];
    if (!res.ok) return null;
    const raw = (await res.json()) as Record<string, CrawlerItem>;
    return Object.values(raw ?? {}).map((item) => ({
      id: item.item_id || item.link || item.title || '',
      title: (item.title ?? '').trim(),
      description: (item.summary ?? '').trim(),
      publishDate: toLocal(dayjs(item.published)),
      source: item.source || 'News',
      url: item.link || undefined,
    }));
  } catch {
    return null;
  }
};

const MONTHS: Record<string, string> = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
  Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
};

// CafeF writes a two-digit year ("Mon, 19 Oct 26 18:28:00 +0700"), which Date parsing handles differently per browser
const parseRssDate = (value: string) => {
  const m = value.match(/(\d{1,2}) (\w{3}) (\d{2,4}) (\d{2}):(\d{2})(?::(\d{2}))? ([+-]\d{2})(\d{2})/);
  if (!m || !MONTHS[m[2]]) return toLocal(dayjs(value));
  const year = m[3].length === 2 ? `20${m[3]}` : m[3];
  return toLocal(dayjs(`${year}-${MONTHS[m[2]]}-${pad(Number(m[1]))}T${m[4]}:${m[5]}:${m[6] ?? '00'}${m[7]}:${m[8]}`));
};

const htmlToText = (html: string) => new DOMParser().parseFromString(html, 'text/html').body.textContent?.trim() ?? '';

const loadCafefFeed = async (feed: string): Promise<SourceResult> => {
  try {
    const res = await fetchWithTimeout(`/api/cafef/${feed}.rss`);
    if (!res.ok) return null;
    const doc = new DOMParser().parseFromString(await res.text(), 'text/xml');
    // CafeF answers bots with an HTML "sorry" page instead of the feed
    if (doc.querySelector('parsererror') || !doc.querySelector('rss')) return null;
    return Array.from(doc.querySelectorAll('item')).map((item) => {
      const field = (tag: string) => item.querySelector(tag)?.textContent?.trim() ?? '';
      const link = field('link');
      return {
        id: link || field('title'),
        title: field('title'),
        description: htmlToText(field('description')),
        publishDate: parseRssDate(field('pubDate')),
        source: 'CafeF',
        url: link || undefined,
      };
    });
  } catch {
    return null;
  }
};

const loadCafef = async (): Promise<SourceResult> => {
  const feeds = await Promise.all(CAFEF_FEEDS.map(loadCafefFeed));
  return feeds.every((items) => items === null) ? null : feeds.flatMap((items) => items ?? []);
};

// Past days are final, so they are kept for the session; today's file keeps growing and expires after the TTL.
// Promises are cached so concurrent views share one request; a failed one is dropped and retried next time
const cache = new Map<string, { at: number; request: Promise<SourceResult> }>();

const cached = (key: string, expires: boolean, load: () => Promise<SourceResult>) => {
  const hit = cache.get(key);
  if (hit && (!expires || Date.now() - hit.at < CACHE_TTL_MS)) return hit.request;
  const request = load().then((result) => {
    if (result === null) cache.delete(key);
    return result;
  });
  cache.set(key, { at: Date.now(), request });
  return request;
};

// Drop items without a title, merge duplicates reported by several sources, newest first
const tidy = (items: MarketNewsItem[]): MarketNewsItem[] => {
  const seen = new Set<string>();
  const unique: MarketNewsItem[] = [];
  for (const item of items) {
    const key = normalizeText(item.title);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    unique.push({ ...item, id: item.id || key });
  }
  return unique.sort((a, b) => dayjs(b.publishDate).valueOf() - dayjs(a.publishDate).valueOf());
};

// The ticker as a word of its own ("BID", not the "BID" inside "BIDV"), or one of the company's names
const mentions = (item: MarketNewsItem, ticker: string) => {
  const text = `${item.title} ${item.description}`;
  if (text.split(/[^\p{L}\p{N}]+/u).includes(ticker)) return true;
  const words = ` ${normalizeText(text).replace(/[^a-z0-9]+/g, ' ')} `;
  return (TICKER_NAMES[ticker] ?? []).some((name) => words.includes(` ${name} `));
};

/**
 * Latest market news, or the news about one ticker. Never throws: when every source fails the list is empty,
 * and the card shows its "no matching news" state rather than made-up stories.
 */
export async function fetchMarketNews(
  symbol?: string,
  options: { force?: boolean } = {},
): Promise<MarketNewsItem[]> {
  const ticker = symbol && symbol !== 'ALL' ? symbol.toUpperCase() : null;
  if (options.force) {
    cache.delete(`crawler:${vnDayKey(0)}`);
    cache.delete('cafef');
  }

  const days = Array.from({ length: ticker ? TICKER_DAYS : MARKET_DAYS }, (_, daysAgo) => {
    const key = vnDayKey(daysAgo);
    return cached(`crawler:${key}`, daysAgo === 0, () => loadCrawlerDay(key));
  });
  const results = await Promise.all([...days, cached('cafef', true, loadCafef)]);

  const items = tidy(results.flatMap((result) => result ?? []));
  return ticker ? items.filter((item) => mentions(item, ticker)).map((item) => ({ ...item, symbol: ticker })) : items;
}
