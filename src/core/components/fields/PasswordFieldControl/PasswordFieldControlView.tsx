import React from 'react';
import { classNames } from '@utils/classNames';
import { PasswordFieldControlProps, isTextFieldControlHasData } from '@components/fields';

export const PasswordFieldControlView = (props: PasswordFieldControlProps) => {
  const { className, value, emptyLabel = '-' } = props;

  const cls = classNames(className, {
    'field-control_no-data': !isTextFieldControlHasData(value),
  });

  return value ? (
    <div className={cls}>{value.replace(/./g, '*')}</div>
  ) : (
    <div className={cls}>{emptyLabel}</div>
  );
};
