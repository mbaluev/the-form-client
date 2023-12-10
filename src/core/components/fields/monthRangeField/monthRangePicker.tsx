import { FC, Fragment, useState } from 'react';
import { isSameYear } from 'date-fns';
import { MonthPicker } from '@components/fields/monthRangeField/monthPicker';
import { YearMonthRange } from 'core/components/fields/monthRangeField';

export interface IMonthRangePickerProps {
  value: YearMonthRange;
  onChange: (value: YearMonthRange) => void;
}

export const MonthRangePicker: FC<IMonthRangePickerProps> = (props) => {
  const { value, onChange } = props;
  const [rightLastSet, setRightLastSet] = useState(false);

  const leftYear = value[0];
  const rightYear = value[1];
  const sameYear = isSameYear(leftYear, rightYear);

  return (
    <div className="month-range-field-control__month-range-picker">
      {sameYear ? (
        <MonthPicker
          value={value}
          year={leftYear}
          onChange={(v) => {
            if (!rightLastSet) {
              if (v <= rightYear) {
                onChange([v, rightYear]);
                setRightLastSet(true);
              } else {
                onChange([leftYear, v]);
                setRightLastSet(false);
              }
            } else if (v >= leftYear) {
              onChange([leftYear, v]);
              setRightLastSet(false);
            } else {
              onChange([v, leftYear]);
              setRightLastSet(true);
            }
          }}
        />
      ) : (
        <Fragment>
          <MonthPicker
            value={value}
            year={leftYear}
            onChange={(startMonth) => {
              onChange([startMonth, rightYear]);
            }}
          />
          <MonthPicker
            value={value}
            year={rightYear}
            onChange={(endMonth) => {
              onChange([leftYear, endMonth]);
            }}
          />
        </Fragment>
      )}
    </div>
  );
};
