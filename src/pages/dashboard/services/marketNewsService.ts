import dayjs from 'dayjs';

export interface MarketNewsItem {
  id: string | number;
  title: string;
  description: string;
  publishDate: string;
  source: string;
  symbol?: string;
  category?: 'Thị trường' | 'Doanh nghiệp' | 'Vĩ mô' | 'Nhận định';
  url?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
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

const FALLBACK_NEWS: MarketNewsItem[] = [
  // General Market / Macro
  {
    id: 'm1',
    title: 'VN-Index duy trì đà tăng trưởng tích cực, dòng tiền lan tỏa mạnh mẽ nhóm vốn hóa lớn',
    description: 'Thanh khoản toàn thị trường vượt 22.000 tỷ đồng, lực cầu gom hàng chủ động từ khối ngoại và nhà đầu tư cá nhân tập trung ở các nhóm ngành ngân hàng, công nghệ và xuất khẩu.',
    publishDate: dayjs().subtract(15, 'minute').format('YYYY-MM-DD HH:mm'),
    source: 'VNDIRECT',
    symbol: 'VN-INDEX',
    category: 'Thị trường',
    sentiment: 'positive',
    url: 'https://vndirect.com.vn',
  },
  {
    id: 'm2',
    title: 'Ngân hàng Nhà nước tiếp tục điều hành chính sách tiền tệ linh hoạt, hỗ trợ thanh khoản hệ thống',
    description: 'Mặt bằng lãi suất liên ngân hàng duy trì ổn định, tạo điều kiện thuận lợi cho dòng vốn chảy vào hoạt động sản xuất kinh doanh và thị trường chứng khoán trong các tháng cuối năm.',
    publishDate: dayjs().subtract(45, 'minute').format('YYYY-MM-DD HH:mm'),
    source: 'CafeF',
    symbol: 'VĨ MÔ',
    category: 'Vĩ mô',
    sentiment: 'positive',
    url: 'https://cafef.vn',
  },
  {
    id: 'm3',
    title: 'Tiến trình nâng hạng thị trường chứng khoán Việt Nam theo chuẩn FTSE ghi nhận nhiều tín hiệu khả quan',
    description: 'Ủy ban Chứng khoán Nhà nước tích cực hoàn thiện cơ chế giao dịch không ký quỹ trước tiền mặt (Non-prefunding) cho nhà đầu tư ngoại, mở đường đón dòng vốn tỷ USD.',
    publishDate: dayjs().subtract(2, 'hour').format('YYYY-MM-DD HH:mm'),
    source: 'Đầu tư chứng khoán',
    symbol: 'VN-INDEX',
    category: 'Thị trường',
    sentiment: 'positive',
    url: 'https://tinnhanhchungkhoan.vn',
  },
  {
    id: 'm4',
    title: 'Khối ngoại quay lại mua ròng hơn 450 tỷ đồng trên sàn HOSE, tập trung bluechip',
    description: 'Dòng vốn ngoại đảo chiều tích cực sau chuỗi phiên thăm dò, tâm điểm giải ngân rơi vào các mã đầu ngành ngân hàng và bán lẻ có nền tảng định giá hấp dẫn.',
    publishDate: dayjs().subtract(4, 'hour').format('YYYY-MM-DD HH:mm'),
    source: 'Vietstock',
    symbol: 'VN-INDEX',
    category: 'Thị trường',
    sentiment: 'positive',
    url: 'https://vietstock.vn',
  },
  {
    id: 'm5',
    title: 'Nhận định thị trường: Xu hướng trung hạn củng cố, cơ hội tích lũy cổ phiếu giá trị',
    description: 'Các chuyên gia phân tích đánh giá vùng rung lắc hiện tại là thời điểm thích hợp để cơ cấu danh mục tối ưu, ưu tiên các doanh nghiệp có tăng trưởng lợi nhuận quý ổn định.',
    publishDate: dayjs().subtract(6, 'hour').format('YYYY-MM-DD HH:mm'),
    source: 'TCBS',
    symbol: 'VN-INDEX',
    category: 'Nhận định',
    sentiment: 'neutral',
    url: 'https://tcbs.com.vn',
  },

  // BID
  {
    id: 'b1',
    title: 'BID: Tăng trưởng tín dụng vượt trội, chất lượng tài sản kiểm soát an toàn',
    description: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam ghi nhận lợi nhuận trước thuế tăng trưởng bền vững, tỷ lệ bao phủ nợ xấu duy trì trong nhóm dẫn đầu hệ thống ngân hàng.',
    publishDate: dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm'),
    source: 'VNDIRECT',
    symbol: 'BID',
    category: 'Doanh nghiệp',
    sentiment: 'positive',
    url: 'https://vndirect.com.vn',
  },
  {
    id: 'b2',
    title: 'BIDV đẩy mạnh số hóa dịch vụ tài chính, CASA bứt phá mạnh',
    description: 'Ứng dụng ngân hàng số thế hệ mới giúp BIDV gia tăng tỷ lệ tiền gửi không kỳ hạn, tối ưu hóa chi phí vốn và biên lãi thuần NIM.',
    publishDate: dayjs().subtract(5, 'hour').format('YYYY-MM-DD HH:mm'),
    source: 'CafeF',
    symbol: 'BID',
    category: 'Doanh nghiệp',
    sentiment: 'positive',
    url: 'https://cafef.vn',
  },

  // HAH
  {
    id: 'h1',
    title: 'HAH: Giá cước vận tải biển hồi phục, đội tàu container hoạt động tối đa công suất',
    description: 'Công ty Cổ phần Vận tải và Xếp dỡ Hải An hưởng lợi lớn từ sự phục hồi của các tuyến nội Á và sản lượng hàng hóa thông qua cảng biển tăng trưởng ấn tượng.',
    publishDate: dayjs().subtract(30, 'minute').format('YYYY-MM-DD HH:mm'),
    source: 'Vietstock',
    symbol: 'HAH',
    category: 'Doanh nghiệp',
    sentiment: 'positive',
    url: 'https://vietstock.vn',
  },
  {
    id: 'h2',
    title: 'Hải An tiếp nhận thêm tàu đóng mới trọng tải lớn, mở rộng mạng lưới liên minh vận tải',
    description: 'Việc bổ sung thêm tàu mới giúp HAH củng cố vị thế dẫn đầu phân khúc vận tải container nội địa và đẩy mạnh liên doanh khai thác các tuyến quốc tế.',
    publishDate: dayjs().subtract(3, 'hour').format('YYYY-MM-DD HH:mm'),
    source: 'Đầu tư chứng khoán',
    symbol: 'HAH',
    category: 'Doanh nghiệp',
    sentiment: 'positive',
    url: 'https://tinnhanhchungkhoan.vn',
  },

  // SSI
  {
    id: 's1',
    title: 'SSI: Doanh thu mảng môi giới và cho vay margin ghi nhận bứt phá theo thanh khoản thị trường',
    description: 'Chứng khoán SSI tiếp tục giữ vững thị phần top đầu tại sàn HOSE, hưởng lợi trực tiếp từ sự gia tăng mạnh mẽ số lượng tài khoản mở mới của nhà đầu tư.',
    publishDate: dayjs().subtract(2, 'hour').format('YYYY-MM-DD HH:mm'),
    source: 'CafeF',
    symbol: 'SSI',
    category: 'Doanh nghiệp',
    sentiment: 'positive',
    url: 'https://cafef.vn',
  },
  {
    id: 's2',
    title: 'SSI hoàn tất kế hoạch tăng vốn điều lệ, củng cố năng lực tài chính phục vụ thị trường nâng hạng',
    description: 'Quy mô vốn mới cho phép SSI mở rộng hạn mức cho vay giao dịch ký quỹ và đa dạng hóa các sản phẩm chứng quyền, trái phiếu doanh nghiệp chất lượng cao.',
    publishDate: dayjs().subtract(7, 'hour').format('YYYY-MM-DD HH:mm'),
    source: 'VNDIRECT',
    symbol: 'SSI',
    category: 'Doanh nghiệp',
    sentiment: 'positive',
    url: 'https://vndirect.com.vn',
  },

  // MSN
  {
    id: 'm_msn1',
    title: 'MSN: Mảng bán lẻ WinCommerce duy trì chuỗi tăng trưởng lợi nhuận ròng dương',
    description: 'Tập đoàn Masan tập trung tái cấu trúc danh mục kinh doanh cốt lõi, nâng cao hiệu quả chuỗi cung ứng hàng tiêu dùng thiết yếu và giảm chi phí đòn bẩy tài chính.',
    publishDate: dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm'),
    source: 'Vietstock',
    symbol: 'MSN',
    category: 'Doanh nghiệp',
    sentiment: 'positive',
    url: 'https://vietstock.vn',
  },
  {
    id: 'm_msn2',
    title: 'Masan Consumer mở rộng thị trường xuất khẩu, đón đầu mùa tiêu dùng cao điểm',
    description: 'Các sản phẩm gia vị và thực phẩm tiện lợi của Masan ghi nhận doanh thu xuất khẩu tăng trưởng 2 chữ số tại các thị trường trọng điểm châu Á và Bắc Mỹ.',
    publishDate: dayjs().subtract(8, 'hour').format('YYYY-MM-DD HH:mm'),
    source: 'TCBS',
    symbol: 'MSN',
    category: 'Doanh nghiệp',
    sentiment: 'positive',
    url: 'https://tcbs.com.vn',
  },

  // FPT
  {
    id: 'f1',
    title: 'FPT: Doanh thu dịch vụ CNTT nước ngoài vượt mốc 1 tỷ USD, đẩy mạnh hợp tác AI',
    description: 'Khối công nghệ của FPT ghi nhận lượng hợp đồng ký mới tăng trưởng mạnh từ thị trường Nhật Bản và Mỹ, tiếp tục khẳng định vị thế trung tâm công nghệ bán dẫn và trí tuệ nhân tạo.',
    publishDate: dayjs().subtract(40, 'minute').format('YYYY-MM-DD HH:mm'),
    source: 'CafeF',
    symbol: 'FPT',
    category: 'Doanh nghiệp',
    sentiment: 'positive',
    url: 'https://cafef.vn',
  },

  // VIC
  {
    id: 'v1',
    title: 'VIC: Doanh số bàn giao bất động sản và xe điện VinFast tăng trưởng ấn tượng',
    description: 'Tập đoàn Vingroup đẩy mạnh chiến lược phát triển hệ sinh thái xanh toàn diện, mở rộng mạng lưới trạm sạc và củng cố nguồn dòng tiền từ các dự án đại đô thị.',
    publishDate: dayjs().subtract(3, 'hour').format('YYYY-MM-DD HH:mm'),
    source: 'Vietstock',
    symbol: 'VIC',
    category: 'Doanh nghiệp',
    sentiment: 'neutral',
    url: 'https://vietstock.vn',
  },

  // VNM
  {
    id: 'vnm1',
    title: 'VNM: Biên lợi nhuận gộp phục hồi nhờ giá nguyên liệu sữa bột hạ nhiệt',
    description: 'Vinamilk gia tăng thị phần sữa đặc và sữa tươi sau chiến dịch tái định vị thương hiệu, duy trì chính sách chi trả cổ tức tiền mặt đều đặn và hấp dẫn.',
    publishDate: dayjs().subtract(5, 'hour').format('YYYY-MM-DD HH:mm'),
    source: 'Đầu tư chứng khoán',
    symbol: 'VNM',
    category: 'Doanh nghiệp',
    sentiment: 'positive',
    url: 'https://tinnhanhchungkhoan.vn',
  },

  // HPG
  {
    id: 'hpg1',
    title: 'HPG: Sản lượng tiêu thụ thép xây dựng và HRC tăng mạnh, đại dự án Dung Quất 2 sắp vận hành',
    description: 'Tập đoàn Hòa Phát giữ vững vị thế số 1 thị phần thép tại Việt Nam, chuẩn bị đưa phân kỳ 1 dự án Dung Quất 2 vào sản xuất thương mại để gia tăng doanh thu.',
    publishDate: dayjs().subtract(2, 'hour').format('YYYY-MM-DD HH:mm'),
    source: 'VNDIRECT',
    symbol: 'HPG',
    category: 'Doanh nghiệp',
    sentiment: 'positive',
    url: 'https://vndirect.com.vn',
  },
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

type RawNews = Record<string, unknown>;

interface NewsSource {
  name: string;
  url: (key: string) => string;
  list: (json: unknown) => RawNews[];
  map: (raw: RawNews, key: string) => MarketNewsItem;
}

const isTicker = (key: string) => key !== 'ALL';
const str = (value: unknown) => (typeof value === 'string' ? value : '');
const toDate = (value: unknown) => {
  const d = dayjs(str(value) || undefined);
  return (d.isValid() ? d : dayjs()).format('YYYY-MM-DD HH:mm');
};

const SOURCES: NewsSource[] = [
  {
    name: 'VNDIRECT',
    url: (key) =>
      isTicker(key)
        ? `https://finfo-api.vndirect.com.vn/v4/news?q=code:${key}&sort=newsDate:desc&size=20`
        : 'https://finfo-api.vndirect.com.vn/v4/news?sort=newsDate:desc&size=25',
    list: (json) => ((json as { data?: RawNews[] })?.data ?? []),
    map: (raw, key) => ({
      id: str(raw.id) || str(raw.newsUrl) || str(raw.newsTitle),
      title: str(raw.newsTitle) || str(raw.title),
      description: str(raw.newsDescription) || str(raw.description) || str(raw.newsTitle),
      publishDate: toDate(raw.newsDate),
      source: str(raw.newsSource) || 'VNDIRECT',
      symbol: str(raw.code) || (isTicker(key) ? key : 'VN-INDEX'),
      category: isTicker(key) ? 'Doanh nghiệp' : 'Thị trường',
      url: str(raw.newsUrl) || 'https://vndirect.com.vn',
    }),
  },
  {
    name: 'TCBS',
    url: (key) =>
      isTicker(key)
        ? `https://apipubaws.tcbs.com.vn/tcanalysis/v1/ticker/${key}/news?page=0&size=15`
        : 'https://apipubaws.tcbs.com.vn/tcanalysis/v1/news?page=0&size=20',
    list: (json) => {
      const data = (json as { data?: RawNews[] })?.data;
      return data ?? (Array.isArray(json) ? (json as RawNews[]) : []);
    },
    map: (raw, key) => ({
      id: str(raw.id) || str(raw.url) || str(raw.title),
      title: str(raw.title),
      description: str(raw.description) || str(raw.title),
      publishDate: toDate(raw.publishDate),
      source: str(raw.source) || 'TCBS',
      symbol: str(raw.ticker) || (isTicker(key) ? key : 'VN-INDEX'),
      category: isTicker(key) ? 'Doanh nghiệp' : 'Thị trường',
      url: str(raw.url) || 'https://tcbs.com.vn',
    }),
  },
];

const CACHE_TTL_MS = 5 * 60 * 1000; // results stay fresh for 5 minutes; Refresh bypasses it
const LIVE_TIMEOUT_MS = 2500; // budget for the live sources, raced in parallel
const SOURCE_COOLDOWN_MS = 2 * 60 * 1000; // skip a source that just failed instead of waiting on it again

const newsCache = new Map<string, { data: MarketNewsItem[]; timestamp: number }>();
const inFlight = new Map<string, Promise<MarketNewsItem[]>>();
const sourceDownUntil = new Map<string, number>();

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

// `race.won` is set once a source has answered, so cancelling the slower ones is not counted as their failure;
// a source that times out or errors is put on cooldown
const fetchSource = async (source: NewsSource, key: string, signal: AbortSignal, race: { won: boolean }) => {
  try {
    const res = await fetch(source.url(key), { signal });
    if (!res.ok) throw new Error(`${source.name} ${res.status}`);
    const items = source.list(await res.json()).map((raw) => source.map(raw, key));
    if (items.length === 0) throw new Error(`${source.name} empty`);
    return items;
  } catch (error) {
    if (!race.won) sourceDownUntil.set(source.name, Date.now() + SOURCE_COOLDOWN_MS);
    throw error;
  }
};

// Resolves with the first promise that succeeds, rejects only when all of them fail (Promise.any without ES2021)
const firstSuccess = <T,>(promises: Promise<T>[]) =>
  new Promise<T>((resolve, reject) => {
    let failed = 0;
    promises.forEach((promise) =>
      promise.then(resolve, () => {
        failed += 1;
        if (failed === promises.length) reject(new Error('All sources failed'));
      }),
    );
  });

const fetchLive = async (key: string): Promise<MarketNewsItem[] | null> => {
  const sources = SOURCES.filter((source) => (sourceDownUntil.get(source.name) ?? 0) < Date.now());
  if (sources.length === 0) return null;

  const controller = new AbortController();
  const race = { won: false };
  const timer = setTimeout(() => controller.abort(), LIVE_TIMEOUT_MS);
  try {
    // First source to answer with news wins; the slower requests are cancelled
    const items = await firstSuccess(sources.map((source) => fetchSource(source, key, controller.signal, race)));
    race.won = true;
    return items;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
    controller.abort();
  }
};

// Ticker views only show news for that ticker; market-wide items are no longer mixed in
const fallbackFor = (key: string) =>
  isTicker(key) ? FALLBACK_NEWS.filter((item) => item.symbol?.toUpperCase() === key) : FALLBACK_NEWS;

export async function fetchMarketNews(
  symbol?: string,
  options: { force?: boolean } = {},
): Promise<MarketNewsItem[]> {
  const key = symbol && symbol !== 'ALL' ? symbol.toUpperCase() : 'ALL';

  const cached = newsCache.get(key);
  if (!options.force && cached && Date.now() - cached.timestamp < CACHE_TTL_MS) return cached.data;

  // Reuse a request that is already on its way for the same ticker
  const pending = inFlight.get(key);
  if (pending) return pending;

  if (options.force) SOURCES.forEach((source) => sourceDownUntil.delete(source.name));

  const request = (async () => {
    const live = await fetchLive(key);
    const data = tidy(live ?? fallbackFor(key));
    newsCache.set(key, { data, timestamp: Date.now() });
    return data;
  })().finally(() => inFlight.delete(key));

  inFlight.set(key, request);
  return request;
}
