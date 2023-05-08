import React from 'react';
import { classNames } from '@utils/classNames';
import {
  isToggleButtonGroupFieldControlHasData,
  IToggleButtonItemJSX,
  ToggleButtonGroupFieldControlProps,
} from '@components/fields';

export const ToggleButtonGroupFieldControlView = (
  props: ToggleButtonGroupFieldControlProps
) => {
  const { className, value, exclusive, emptyLabel = '-' } = props;

  const cls = classNames(className, {
    'field-control_no-data': !isToggleButtonGroupFieldControlHasData(value),
  });

  const displayValue = (exclusiveValue?: boolean) => {
    let ret;
    if (exclusiveValue) {
      ret =
        props.items?.find((item: IToggleButtonItemJSX) => {
          return item.value === value;
        })?.label || 'unknown';
    } else {
      ret =
        props.items
          ?.filter((item: IToggleButtonItemJSX) => {
            return value.reduce((prev: boolean, cur: string) => {
              return prev || item.value === cur;
            }, false);
          })
          .map((item) => item.label)
          .join(', ') || 'unknown';
    }
    return ret;
  };

  return typeof value !== 'undefined' &&
    Array.isArray(value) &&
    (value as []).length > 0 ? (
    <div className={cls}>{displayValue(exclusive)}</div>
  ) : (
    <div className={cls}>{emptyLabel}</div>
  );
};
