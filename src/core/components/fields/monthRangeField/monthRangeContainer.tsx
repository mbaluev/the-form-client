import React, { FC, useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import { setYear, isAfter, getYear, isSameYear } from 'date-fns';
import { valueFormatter } from '@components/fields/monthRangeField/valueFormatter';
import { YearSelect } from '@components/fields/monthRangeField/yearSelect';
import { MonthRangePicker } from '@components/fields/monthRangeField/monthRangePicker';
import { Button } from '@theme/button';
import { TODAY } from '@utils/date/today';
import { MonthRangeFieldProps } from '@components/fields/monthRangeField/index';
import moment from 'moment';

export const MonthRangeContainer: FC<MonthRangeFieldProps> = (props) => {
  const {
    value,
    maxDate = new Date(TODAY.year, 0),
    minDate = new Date(TODAY.year - 1, 0),
    confirmText = 'Ok',
    curYearText = 'Current Year',
    onChange,
    changeOnClick,
  } = props;

  const [startValue, setStartValue] = useState<Date>(() => value?.[0] ?? new Date());
  const [endValue, setEndValue] = useState<Date>(() => value?.[1] ?? new Date());

  useEffect(() => {
    if (value) {
      if (moment(value[0]).isSameOrBefore(value[1])) {
        setStartValue(value[0]);
        setEndValue(value[1]);
      } else {
        setStartValue(value[1]);
        setEndValue(value[0]);
      }
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
                if (changeOnClick && onChange) {
                  onChange([newStatValue, endValue]);
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
                if (changeOnClick && onChange) {
                  onChange([startValue, newEndValue]);
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
          if (changeOnClick && onChange) onChange([start, end]);
        }}
      />
      <Divider />
      {!changeOnClick && (
        <div className="month-range-field-control__footer">
          {curYearText && (
            <Button
              onClick={() => {
                let year = getYear(new Date());
                year = year > getYear(maxDate) ? getYear(maxDate) : year;
                if (onChange) onChange([new Date(year, 0), new Date(year, 11)]);
              }}
            >
              {curYearText}
            </Button>
          )}
          <Button
            variant="contained"
            onClick={() => {
              if (onChange) onChange([startValue, endValue]);
            }}
          >
            {confirmText}
          </Button>
        </div>
      )}
    </div>
  );
};
