import React from 'react';
import { classNames } from '@utils/classNames';
import { MultiSelectFieldControlProps } from '@components/fields';

export const MultiSelectFieldControlView = (
  props: MultiSelectFieldControlProps
) => {
  const { className, value, items, emptyLabel = 'empty' } = props;

  const cls = classNames(className, {
    'field-control_no-data': !value || value.length === 0,
  });

  const label = items
    ?.filter((item) => {
      return value?.find((val) => {
        return String(item.value) === String(val);
      });
    })
    .map((item) => {
      return item.label;
    })
    .join(', ');

  return value && value.length > 0 ? (
    <div className={cls}>{label}</div>
  ) : (
    <div className={cls}>{emptyLabel}</div>
  );
};
