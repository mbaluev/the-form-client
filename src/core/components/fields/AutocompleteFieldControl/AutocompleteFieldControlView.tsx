import React from 'react';
import { classNames } from '@utils/classNames';
import {
  AutocompleteFieldControlProps,
  getDisplayValue,
  isControlHasData,
} from '@components/fields/AutocompleteFieldControl/AutocompleteFieldControl';

export const AutocompleteFieldControlView = <T,>(props: AutocompleteFieldControlProps<T>) => {
  const {
    className,
    value,
    options,
    emptyLabel = '-',
    valueField = 'value' as keyof T,
    labelField = 'label' as keyof T,
  } = props;

  const cls = classNames(className, {
    'field-control_no-data': !isControlHasData(value),
  });

  if (isControlHasData(value)) {
    return <div className={cls}>{getDisplayValue(valueField, labelField, options, value)}</div>;
  } else {
    return <div className={cls}>{emptyLabel}</div>;
  }
};
