import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

type RangePickerValue = RangePickerProps['value'];

export function getTimeDistance(
  type: 'month' | 'quarter' | 'year',
): RangePickerValue {
  const now = dayjs();
  if (type === 'month') {
    return [now.startOf('month'), now.endOf('month')];
  }
  if (type === 'year') {
    return [now.startOf('year'), now.endOf('year')];
  }
  const startMonth = Math.floor(now.month() / 3) * 3;
  const start = now.month(startMonth).startOf('month');
  return [start, start.add(3, 'month').subtract(1, 'second')];
}

// Number of whole months covered by a range (at least 1), used to scale monthly figures
export function monthsInRange(value: RangePickerValue): number {
  if (!value || !value[0] || !value[1]) return 1;
  return Math.max(1, Math.round(value[1].diff(value[0], 'month', true)));
}
