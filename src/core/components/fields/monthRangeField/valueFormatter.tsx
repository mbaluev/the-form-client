import { isSameMonth, isSameYear, getMonth } from 'date-fns';
import { useLocaleStore } from '@store/modules/common/locale/useLocaleStore';
import { YearMonthRange } from '@components/fields/monthRangeField/index';

export const valueFormatter = (value?: YearMonthRange, placeholder?: string) => {
  const { fDate, language } = useLocaleStore();

  const format = (date?: Date, opts?: Intl.DateTimeFormatOptions) => {
    return fDate(date, { ...opts, dateStyle: undefined }, language);
  };

  if (value === undefined) {
    return placeholder || '...';
  }
  const [startDate, endDate] = value;

  if (isSameMonth(startDate, endDate)) {
    return format(startDate, {
      month: 'long',
      year: 'numeric',
    });
  }

  if (isSameYear(startDate, endDate)) {
    if (getMonth(startDate) === 0 && getMonth(endDate) === 11) {
      return format(startDate, {
        year: 'numeric',
      });
    }
    return `${format(startDate, {
      month: 'short',
      year: 'numeric',
    })} - ${format(endDate, {
      month: 'short',
      year: 'numeric',
    })}`;
  }

  if (getMonth(startDate) === 0 && getMonth(endDate) === 11) {
    return `${format(startDate, {
      year: 'numeric',
    })} - ${format(endDate, {
      year: 'numeric',
    })}`;
  }

  return `${format(startDate, {
    month: 'short',
    year: 'numeric',
  })} - ${format(endDate, {
    month: 'short',
    year: 'numeric',
  })}`;
};
