import React from 'react';
import { classNames } from '@utils/classNames';
import { IRadioItem, RadioGroupFieldControlProps } from '@components/fields';

export const RadioGroupFieldControlView = (
  props: RadioGroupFieldControlProps
) => {
  const { className, value, emptyLabel = '-' } = props;

  const cls = classNames(className, {
    'field-control_no-data': typeof value === 'undefined',
  });

  const displayValue =
    props.items.find((item: IRadioItem) => {
      return item.value === value;
    })?.label || 'unknown';

  return typeof value !== 'undefined' ? (
    <div className={cls}>{displayValue}</div>
  ) : (
    <div className={cls}>{emptyLabel}</div>
  );
};
