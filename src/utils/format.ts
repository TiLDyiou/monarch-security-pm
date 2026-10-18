import type { Language } from '@/i18n/translations';

let currentLanguage: Language = 'vi';

/**
 * Kept in sync by LanguageProvider, the same way it drives dayjs.locale().
 */
export const setFormatLanguage = (lang: Language) => {
  currentLanguage = lang;
};

export const getFormatLanguage = (): Language => currentLanguage;

const locale = () => (currentLanguage === 'en' ? 'en-US' : 'vi-VN');

/**
 * Format a number with the active language's separators (vi 1.234.567,5 / en 1,234,567.5).
 */
export const formatNumber = (val: number | string, maxDigits?: number): string => {
  const parsed = Number(val);
  if (!Number.isFinite(parsed)) return '';
  return new Intl.NumberFormat(locale(), { maximumFractionDigits: maxDigits }).format(parsed);
};

/**
 * Format a number as a VND currency string (vi 1.234 ₫ / en 1,234 VND).
 */
export const formatVND = (val: number | string) =>
  `${formatNumber(val)} ${currentLanguage === 'en' ? 'VND' : '₫'}`;

/**
 * Format an amount given in millions of VND, switching to billions from 1,000
 * (vi 950 triệu ₫ · 5,36 tỷ ₫ / en 950M VND · 5.36B VND).
 */
export const formatMillionVnd = (val: number) => {
  const en = currentLanguage === 'en';
  if (Math.abs(val) >= 1_000) {
    const billions = formatNumber(val / 1_000, 2);
    return en ? `${billions}B VND` : `${billions} tỷ ₫`;
  }
  return en ? `${formatNumber(val)}M VND` : `${formatNumber(val)} triệu ₫`;
};

/**
 * Format a percentage with the active language's decimal mark (vi 12,25% / en 12.25%).
 */
export const formatPercent = (val: number, digits = 2) =>
  `${new Intl.NumberFormat(locale(), { maximumFractionDigits: digits }).format(val)}%`;
