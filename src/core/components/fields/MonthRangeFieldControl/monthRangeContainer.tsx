import React from 'react';
import { FC, useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import { setYear, isAfter, getYear, isSameYear } from 'date-fns';
import { IMonthRangeFieldControlProps } from '@components/fields/MonthRangeFieldControl/index';
import { valueFormatter } from '@components/fields/MonthRangeFieldControl/valueFormatter';
import { YearSelect } from '@components/fields/MonthRangeFieldControl/yearSelect';
import { MonthRangePicker } from '@components/fields/MonthRangeFieldControl/monthRangePicker';
import { Button } from '@components/button';

export const MonthRangeContainer: FC<IMonthRangeFieldControlProps> = (
  props
) => {
  const { value, maxDate, minDate, confirmText, curYearText, onChange } = props;
  const [startValue, setStartValue] = useState<Date>(
    () => value?.[0] ?? new Date()
  );
  const [endValue, setEndValue] = useState<Date>(
    () => value?.[1] ?? new Date()
  );

  useEffect(() => {
    if (value) {
      setStartValue(value[0]);
      setEndValue(value[1]);
    }
  }, [value]);

  return (
    <div className="month-range-field-control__container">
      <div className="month-range-field-control__header">
        {valueFormatter([startValue, endValue])}
      </div>
      {!isSameYear(minDate, maxDate) && (
        <React.Fragment>
          <Divider />
          <div className="month-range-field-control__years">
            <YearSelect
              minYear={minDate.getFullYear()}
              maxYear={endValue.getFullYear()}
              value={startValue.getFullYear()}
              onChange={(v) => {
                const newStatValue = setYear(startValue, v);
                if (isAfter(newStatValue, endValue)) {
                  setStartValue(endValue);
                  setEndValue(newStatValue);
                } else {
                  setStartValue(newStatValue);
                }
              }}
            />
            <YearSelect
              minYear={startValue.getFullYear()}
              maxYear={maxDate.getFullYear()}
              value={endValue.getFullYear()}
              onChange={(v) => {
                const newEndValue = setYear(endValue, v);
                if (isAfter(startValue, newEndValue)) {
                  setEndValue(startValue);
                  setStartValue(newEndValue);
                } else {
                  setEndValue(newEndValue);
                }
              }}
            />
          </div>
        </React.Fragment>
      )}
      <Divider />
      <MonthRangePicker
        value={[startValue, endValue]}
        onChange={([start, end]) => {
          setStartValue(start);
          setEndValue(end);
        }}
      />
      <Divider />
      <div className="month-range-field-control__footer">
        {curYearText && (
          <Button
            size="default"
            variant="text"
            onClick={() => {
              let year = getYear(new Date());
              year = year > getYear(maxDate) ? getYear(maxDate) : year;
              onChange([new Date(year, 0), new Date(year, 11)]);
            }}
          >
            {curYearText}
          </Button>
        )}
        <Button
          size="default"
          variant="contained"
          onClick={() => {
            onChange([startValue, endValue]);
          }}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
};
