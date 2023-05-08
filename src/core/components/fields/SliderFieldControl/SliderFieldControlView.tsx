import React from 'react';
import { classNames } from '@utils/classNames';
import {
  SliderFieldControlProps,
  getSliderDisplayValue,
} from '@components/fields';

export const SliderFieldControlView = (props: SliderFieldControlProps) => {
  const { className, value, emptyLabel = '-', format } = props;

  const cls = classNames(className, {
    'field-control_no-data': !Boolean(value),
  });

  return !value ? (
    <div className={cls}>{emptyLabel}</div>
  ) : (
    <div className={cls}>{getSliderDisplayValue(value, format)}</div>
  );
};
