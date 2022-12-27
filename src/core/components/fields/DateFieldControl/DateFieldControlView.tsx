import React from 'react';
import { isValid } from 'date-fns';
import { classNames } from '@utils/classNames';
import { DateFieldControlProps } from '@components/fields';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { ILocaleViewModel } from '@viewModel/modules/locale/interface';

export const DateFieldControlView = (props: DateFieldControlProps) => {
  const { className, value, emptyLabel = 'empty' } = props;

  const { fDate } = useViewModel<ILocaleViewModel>(VIEW_MODEL.Locale);

  let displayValue = '';
  if (value && isValid(value)) {
    displayValue = fDate(new Date(value));
  } else if (value) {
    displayValue = 'Invalid Date';
  }

  const cls = classNames(className, {
    'field-control_no-data': !value || displayValue === 'Invalid Date',
  });

  return value ? (
    <div className={cls}>{displayValue}</div>
  ) : (
    <div className={cls}>{emptyLabel}</div>
  );
};
