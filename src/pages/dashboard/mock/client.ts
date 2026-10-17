// Mock data for the client dashboard, taken from docs/Import dữ liệu.docx
import dayjs from 'dayjs';

/* ---------- Client profile (basic info + current assets, no expenses) ---------- */

export const client = {
  family: 'Gia đình anh Nam',
  husband: {
    name: 'Anh Nam',
    birthYear: 1985,
    job: 'Trưởng phòng Kế toán – Phòng giao dịch ngân hàng',
    income: 45_000_000,
  },
  wife: {
    name: 'Chị Nữ',
    birthYear: 1990,
    job: 'Nhân viên kế toán – cùng phòng giao dịch',
    income: 20_000_000,
  },
  children: [
    { name: 'Bé lớn', birthYear: 2014, school: 'Trường cấp 2 Tuệ Đức, Quận 2' },
    { name: 'Bé nhỏ', birthYear: 2021, school: 'Trường mẫu giáo Vườn Hồng, Quận 2' },
  ],
  residence: 'Thuê nhà tại đường Lương Đình Của, Quận 2',
  insurance: 'Cả hai vợ chồng có BHXH, BHYT – chưa có BHNT',
  parents: 'Bố mẹ hai bên khoẻ mạnh, có lương hưu, chưa cần chu cấp',
};

// Values in million VND
export const assets = [
  { key: 'land', name: 'Đất nền Bảo Lộc · 6x30m, mua năm 2022', short: 'Đất nền Bảo Lộc', value: 1000 },
  { key: 'cash', name: 'Tiền mặt', short: 'Tiền mặt', value: 300 },
  { key: 'receivable', name: 'Khoản cho bạn bè mượn', short: 'Cho bạn bè mượn', value: 100 },
];

export const liabilities = [
  {
    key: 'loan',
    name: 'Vay ngân hàng mua đất Bảo Lộc',
    value: 450,
    rate: 0.1,
    remainingYears: 12,
  },
];

export const totalAssets = assets.reduce((s, a) => s + a.value, 0); // 1,400
export const totalLiabilities = liabilities.reduce((s, l) => s + l.value, 0); // 450
export const netWorth = totalAssets - totalLiabilities; // 950

// "Additional" table: how the current cash is earmarked
export const cashHoldings = [
  { x: 'Quỹ dự phòng', y: 150 },
  { x: 'Vốn đầu tư ban đầu', y: 150 },
];

/* ---------- Portfolio metrics ---------- */

export const portfolio = {
  expectedReturn: 12.25, // E(rc), %/year
  risk: 11.19, // σc, %/year
  riskFree: 5.9, // rf, %/year
  riskAversion: 5.07, // A
  riskyWeight: 43.65, // y*
  safeWeight: 56.35, // 1 - y*
  expectedReturnMonthly: 0.9679, // %/month
  riskMonthly: 0.8882, // %/month
  sharpe: 0.5676,
  utility: 0.0908,
};

/* ---------- Cash outflow after optimization (VND/month) ---------- */

export const income = [
  { x: 'Thu nhập anh Nam', y: 45_000_000 },
  { x: 'Thu nhập chị Nữ', y: 20_000_000 },
];

export const expenses = [
  { x: 'Giáo dục con cái', y: 17_500_000 },
  { x: 'Thuê nhà', y: 17_000_000 },
  { x: 'Sinh hoạt gia đình', y: 9_500_000 },
  { x: 'Trả nợ ngân hàng', y: 8_300_000 },
  { x: 'Giải trí & du lịch', y: 3_000_000 },
  { x: 'Hỗ trợ gia đình', y: 1_200_000 },
];

export const totalIncome = income.reduce((s, i) => s + i.y, 0); // 65,000,000
export const totalExpenses = expenses.reduce((s, e) => s + e.y, 0); // 56,500,000
export const surplus = totalIncome - totalExpenses; // 8,500,000

/* ---------- Client goals ---------- */

export const inflation = 4.5; // %/year

export const goals = [
  {
    key: 'car',
    title: 'Mua xe hơi',
    description: 'Để tiện đưa đón con đi học',
    parValue: 800,
    years: 3,
    futureValue: 912.93,
    availableCapital: 723.8,
    achieved: false,
    status: 'Chưa đạt · hoãn lại',
  },
  {
    key: 'loan_recovery',
    title: 'Thu hồi nợ cá nhân cho mượn',
    description: 'Thu hồi gốc 100 triệu ở tháng thứ 60 để tái đầu tư vào danh mục',
    parValue: 100,
    years: 5,
    futureValue: 100,
    availableCapital: 100,
    achieved: true,
    status: 'Khả thi · tái đầu tư',
  },
  {
    key: 'house',
    title: 'Mua nhà đất khu vực Quận 2, Quận 9 cũ',
    description: 'Gần chỗ làm và trường học của hai con',
    parValue: 3450,
    years: 10,
    futureValue: 5357.74,
    availableCapital: 8199.8,
    achieved: true,
    status: 'Khả thi',
  },
];

export const surplusAfterHouse = 2842.1;

export const STOCKS = [
  {
    code: 'BID',
    name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
    sector: 'Ngân hàng',
    ref: 33_950,
    weightInP: 41.75,
    weightInC: 18.22,
    initialValue: 27.33,
    expectedReturnAnnual: 18.23,
    riskAnnual: 34.55,
    role: 'Cổ phiếu trụ cột cung cấp lợi nhuận cao và ổn định',
  },
  {
    code: 'HAH',
    name: 'Công ty CP Vận tải và Xếp dỡ Hải An',
    sector: 'Vận tải biển – Logistics',
    ref: 48_900,
    weightInP: 38.25,
    weightInC: 16.69,
    initialValue: 25.04,
    expectedReturnAnnual: 32.48,
    riskAnnual: 44.27,
    role: 'Cổ phiếu tăng trưởng mang lại tỷ suất sinh lời vượt trội',
  },
  {
    code: 'SSI',
    name: 'Công ty CP Chứng khoán SSI',
    sector: 'Chứng khoán',
    ref: 19_450,
    weightInP: 10.00,
    weightInC: 4.36,
    initialValue: 6.55,
    expectedReturnAnnual: 9.47,
    riskAnnual: 41.66,
    role: 'Hưởng lợi từ thanh khoản thị trường và nâng hạng FTSE',
  },
  {
    code: 'MSN',
    name: 'Công ty CP Tập đoàn Masan',
    sector: 'Tiêu dùng – Bán lẻ',
    ref: 71_400,
    weightInP: 10.00,
    weightInC: 4.36,
    initialValue: 6.55,
    expectedReturnAnnual: -5.24,
    riskAnnual: 28.19,
    role: 'Động lực dài hạn từ mảng bán lẻ tiêu dùng thiết yếu',
  },
];

export const bondAsset = {
  code: 'TPCP 10Y',
  name: 'Trái phiếu Chính phủ kỳ hạn 10 năm',
  sector: 'Tài sản phi rủi ro',
  weightInC: 56.35,
  initialValue: 84.53,
  expectedReturnAnnual: 5.9,
  riskAnnual: 0,
  role: 'Bảo toàn vốn và tạo dòng thu nhập cố định',
};

// Complete portfolio asset allocation (OCP) - 150M VND initial capital (Table 5.2 / Table 78)
export const portfolioAllocation = [
  { x: 'TPCP 10 năm', y: 84.53, weight: 56.35 },
  { x: 'BID', y: 27.33, weight: 18.22 },
  { x: 'HAH', y: 25.04, weight: 16.69 },
  { x: 'SSI', y: 6.55, weight: 4.36 },
  { x: 'MSN', y: 6.55, weight: 4.36 },
];

// Family's Asset Accumulation Roadmap over 10 Years / 120 Months (Table 6.4)
export const roadmap10Years = [
  { x: 'Bắt đầu', y: 150.0, month: 1, surplus: 8.5, label: 'Khởi đầu' },
  { x: 'Năm 1', y: 264.9, month: 12, surplus: 8.5, label: 'Năm 1' },
  { x: 'Năm 2', y: 455.7, month: 24, surplus: 12.3, label: 'Năm 2' },
  { x: 'Năm 3', y: 723.8, month: 36, surplus: 16.6, label: 'Năm 3 - Hoãn mua xe' },
  { x: 'Năm 4', y: 1085.3, month: 48, surplus: 21.3, label: 'Năm 4' },
  { x: 'Năm 5', y: 1658.4, month: 60, surplus: 26.6, label: 'Năm 5 - Thu nợ 100tr' },
  { x: 'Năm 6', y: 2276.8, month: 72, surplus: 32.6, label: 'Năm 6' },
  { x: 'Năm 7', y: 3054.4, month: 84, surplus: 39.1, label: 'Năm 7' },
  { x: 'Năm 8', y: 4020.0, month: 96, surplus: 46.5, label: 'Năm 8' },
  { x: 'Năm 9', y: 5207.0, month: 108, surplus: 54.6, label: 'Năm 9' },
  { x: 'Năm 10', y: 6653.5, month: 120, surplus: 63.6, label: 'Năm 10 - Mua nhà' },
];

// Deterministic PRNG seeded by the date for consistent daily fallback
const seeded = (seed: number) => () => {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
};

export const getStockPrices = (date = dayjs()) => {
  const rand = seeded(Number(date.format('YYYYMMDD')));
  return STOCKS.map((s, i) => {
    const change = Math.round((rand() * 4 - 2) * 100) / 100;
    const price = Math.round((s.ref * (1 + change / 100)) / 50) * 50;
    return {
      index: i + 1,
      code: s.code,
      name: s.name,
      sector: s.sector,
      weightInP: s.weightInP,
      weightInC: s.weightInC,
      initialValue: s.initialValue,
      expectedReturnAnnual: s.expectedReturnAnnual,
      riskAnnual: s.riskAnnual,
      role: s.role,
      refPrice: s.ref,
      price,
      change: Math.round(((price - s.ref) / s.ref) * 10000) / 100,
    };
  });
};
