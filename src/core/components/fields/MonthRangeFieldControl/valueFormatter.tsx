import { isSameMonth, isSameYear, getMonth } from 'date-fns';
import { YearMonthRange } from '@components/fields/MonthRangeFieldControl/index';
import { useViewModel } from '@hooks/useViewModel';
import { ILocaleViewModel } from '@viewModel/modules/locale/interface';
import { VIEW_MODEL } from '@viewModel/ids';

export const valueFormatter = (value?: YearMonthRange) => {
  const { fDate, language } = useViewModel<ILocaleViewModel>(VIEW_MODEL.Locale);

  const format = (date?: Date, opts?: Intl.DateTimeFormatOptions) => {
    return fDate(date, { ...opts, dateStyle: undefined }, language);
  };

  if (value === undefined) {
    return undefined;
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
