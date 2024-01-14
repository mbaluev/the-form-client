import React from 'react';
import { classNames } from '@utils/classNames';
import {
  getRangeDisplayValue,
  RANGE_MAX,
  RANGE_MIN,
  RangeFieldControlProps,
} from '@components/fields';

export const RangeFieldControlView = (props: RangeFieldControlProps) => {
  const { className, value, emptyLabel = '-', format, min = RANGE_MIN, max = RANGE_MAX } = props;

  const cls = classNames(className, {
    'field-control_no-data': !Boolean(value),
  });

  return !value ? (
    <div className={cls}>{emptyLabel}</div>
  ) : (
    <div className={cls}>{getRangeDisplayValue(min, max, value, format)}</div>
  );
};
