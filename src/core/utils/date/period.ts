import { TODAY } from '@utils/date/today';
import { YearMonthRange } from 'core/components/fields/monthRangeField';

export enum PERIODS {
  '1M' = '1M',
  '3M' = '3M',
  '6M' = '6M',
  'YTD' = 'YTD',
  '1Y' = '1Y',
  'All' = 'All',
}

export const PERIOD = {
  getStartYear: (value?: PERIODS) => {
    if (value === '1M') {
      return TODAY.year;
    }
    if (value === '3M') {
      return TODAY.subtractMonthToYear(3);
    }
    if (value === '6M') {
      return TODAY.subtractMonthToYear(6);
    }
    if (value === 'YTD') {
      return TODAY.year;
    }
    if (value === '1Y') {
      return TODAY.subtractMonthToYear(12);
    }
    return undefined;
  },
  getStartMonth: (value?: PERIODS) => {
    if (value === '1M') {
      return TODAY.month;
    }
    if (value === '3M') {
      return TODAY.subtractMonthToMonth(3);
    }
    if (value === '6M') {
      return TODAY.subtractMonthToMonth(6);
    }
    if (value === 'YTD') {
      return 0;
    }
    if (value === '1Y') {
      return TODAY.subtractMonthToMonth(12);
    }
    return undefined;
  },
  getEndYear: (value?: PERIODS) => {
    if (value === '1M') {
      return TODAY.year;
    }
    if (value === '3M') {
      return TODAY.year;
    }
    if (value === '6M') {
      return TODAY.year;
    }
    if (value === 'YTD') {
      return TODAY.year;
    }
    if (value === '1Y') {
      return TODAY.year;
    }
    return undefined;
  },
  getEndMonth: (value?: PERIODS) => {
    if (value === '1M') {
      return TODAY.month;
    }
    if (value === '3M') {
      return TODAY.month;
    }
    if (value === '6M') {
      return TODAY.month;
    }
    if (value === 'YTD') {
      return TODAY.month;
    }
    if (value === '1Y') {
      return TODAY.month;
    }
    return undefined;
  },
  getPeriodFromRange: (value?: YearMonthRange) => {
    if (!value || (!value[0] && !value[1])) {
      return PERIODS.All;
    }
    const startDate = value[0];
    const endDate = value[1];
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();
    const diff = TODAY.monthsDiff(startYear, startMonth, endYear, endMonth);
    if (endYear === TODAY.year && endMonth === TODAY.month && diff === 1) {
      return PERIODS['1M'];
    }
    if (endYear === TODAY.year && endMonth === TODAY.month && diff === 3) {
      return PERIODS['3M'];
    }
    if (endYear === TODAY.year && endMonth === TODAY.month && diff === 6) {
      return PERIODS['6M'];
    }
    if (endYear === TODAY.year && endMonth === TODAY.month && diff === 12) {
      return PERIODS['1Y'];
    }
    if (
      endYear === TODAY.year &&
      endMonth === TODAY.month &&
      startYear === endYear &&
      startMonth === 0
    ) {
      return PERIODS.YTD;
    }
  },
  getPeriodFromValues: (value?: [any, any]) => {
    if (!value || (!value[0] && !value[1])) {
      return PERIODS.All;
    }
    const startDate = new Date(Number(value[0]));
    const endDate = new Date(Number(value[1]));
    return PERIOD.getPeriodFromRange([startDate, endDate]);
  },
  getRangeFromPeriod: (value?: PERIODS) => {
    if (!value || (!value[0] && !value[1])) {
      return undefined;
    }
    const startYear = PERIOD.getStartYear(value);
    const startMonth = PERIOD.getStartMonth(value);
    const endYear = PERIOD.getEndYear(value);
    const endMonth = PERIOD.getEndMonth(value);
    if (
      startYear !== undefined &&
      startMonth !== undefined &&
      endYear !== undefined &&
      endMonth !== undefined
    ) {
      const endDate = new Date(endYear, endMonth);
      const startDate = new Date(startYear, startMonth);
      return [startDate, endDate] as YearMonthRange;
    }
    return undefined;
  },
  getRangeFromValues: (value?: [any, any]) => {
    if (!value || (!value[0] && !value[1])) {
      return undefined;
    }
    const startDate = new Date(Number(value[0]));
    const endDate = new Date(Number(value[1]));
    return [startDate, endDate] as YearMonthRange;
  },
  getValuesFromPeriod: (value?: PERIODS) => {
    const dates = PERIOD.getRangeFromPeriod(value);
    if (dates) {
      return [dates[0].valueOf().toString(), dates[1].valueOf().toString()];
    }
    return undefined;
  },
  getValuesFromRange: (value?: YearMonthRange) => {
    if (!value || (!value[0] && !value[1])) {
      return undefined;
    }
    return [value[0].valueOf(), value[1].valueOf()];
  },
};
