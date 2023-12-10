import { FC } from 'react';
import { setMonth, isWithinInterval, isSameMonth } from 'date-fns';
import { Month } from '@components/fields/monthRangeField/month';
import { useLocaleStore } from '@store/modules/common/locale/useLocaleStore';
import { YearMonthRange } from '@components/fields/monthRangeField/index';

interface IMonthPicker {
  year: Date;
  onChange: (value: Date) => void;
  value: YearMonthRange;
}

export const MonthPicker: FC<IMonthPicker> = (props) => {
  const { year, onChange, value } = props;
  const { fDate, language } = useLocaleStore();
  const months: Date[] = [];
  for (let month = 0; month < 12; month++) {
    months.push(setMonth(year, month));
  }
  return (
    <div className="month-range-field-control__month-picker">
      {months.map((month) => {
        const opts: Intl.DateTimeFormatOptions = {
          dateStyle: undefined,
          month: 'short',
        };
        const monthStr = fDate(month, opts, language);
        const isFirst = isSameMonth(month, value[0]);
        const isLast = isSameMonth(month, value[1]);
        const isStart = month.getMonth() % 3 === 0;
        const isEnd = month.getMonth() % 3 === 2;
        const isSelected = isWithinInterval(month, {
          start: value[0],
          end: value[1],
        });
        return (
          <Month
            key={monthStr}
            selected={isSelected}
            isFirst={isFirst}
            isLast={isLast}
            isStart={isStart}
            isEnd={isEnd}
            month={monthStr}
            onClick={() => {
              onChange(month);
            }}
          />
        );
      })}
    </div>
  );
};
