const numberFormatter = new Intl.NumberFormat('vi-VN');

/**
 * Format a number with Vietnamese thousand separators (1.234.567).
 */
export const formatNumber = (val: number | string, maxDigits?: number): string => {
  const parsed = Number(val);
  if (!Number.isFinite(parsed)) return '';
  return maxDigits === undefined
    ? numberFormatter.format(parsed)
    : new Intl.NumberFormat('vi-VN', { maximumFractionDigits: maxDigits }).format(parsed);
};

/**
 * Format a number as a VND currency string.
 */
export const formatVND = (val: number | string) => `${formatNumber(val)} ₫`;

/**
 * Format a percentage with a Vietnamese decimal comma (12,25%).
 */
export const formatPercent = (val: number, digits = 2) =>
  `${new Intl.NumberFormat('vi-VN', { maximumFractionDigits: digits }).format(val)}%`;
