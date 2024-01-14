import React from 'react';
import { classNames } from '@utils/classNames';
import { MultiSelectExtFieldControlProps, multiSelectExtRenderValue } from '@components/fields';

export const MultiSelectExtFieldControlView = <ItemType,>(
  props: MultiSelectExtFieldControlProps<ItemType>
) => {
  const {
    className,
    value,
    items,
    renderValue,
    placeholder,
    valueField = 'value' as keyof ItemType,
    labelField = 'label' as keyof ItemType,
    emptyLabel = '-',
  } = props;

  const cls = classNames(className, {
    'field-control_no-data': !value || value.length === 0,
  });

  return value && value.length > 0 ? (
    <div className={cls}>
      {multiSelectExtRenderValue(value, valueField, labelField, items, placeholder, renderValue)}
    </div>
  ) : (
    <div className={cls}>{emptyLabel}</div>
  );
};
