import React from 'react';
import { classNames } from '@utils/classNames';
import {
  isTextFieldControlHasData,
  TextFieldControlProps,
  viewFormat,
} from '@components/fields';

export const TextFieldControlView = (props: TextFieldControlProps) => {
  const {
    className,
    value,
    inputType = 'text',
    adornment,
    emptyLabel = '-',
  } = props;

  const cls = classNames(className, {
    'field-control_no-data': !isTextFieldControlHasData(value),
  });

  if (isTextFieldControlHasData(value)) {
    return <div className={cls}>{viewFormat(value, inputType, adornment)}</div>;
  } else {
    return <div className={cls}>{emptyLabel}</div>;
  }
};
