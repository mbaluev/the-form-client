import React from 'react';
import { classNames } from '@utils/classNames';
import { findSelectItem, SelectFieldControlProps } from '@components/fields';

export const SelectFieldControlView = (props: SelectFieldControlProps) => {
  const { className, value, items, emptyLabel = '-' } = props;

  const cls = classNames(className, {
    'field-control_no-data': !value || !findSelectItem(items, value),
  });

  const label = findSelectItem(items, value)?.label || emptyLabel;

  return value ? (
    <div className={cls}>{label}</div>
  ) : (
    <div className={cls}>{emptyLabel}</div>
  );
};
