import { useLocaleStore } from '@store/modules/common/locale/useLocaleStore';
import { ReactElement } from 'react';
import { TextInputFieldType } from '@components/fields/textInputField/types';

export const viewFormat = (
  value?: string | number,
  inputType?: TextInputFieldType,
  adornment?: ReactElement | string
) => {
  const { fNumber, fCurrency, fCurrencySymbol } = useLocaleStore();
  let formatted = '';
  if (inputType === 'text') {
    formatted += value;
    if (adornment) formatted += ` ${adornment}`;
    return formatted;
  }
  if (inputType === 'number') {
    formatted = fNumber(value);
    if (adornment) formatted += ` ${adornment}`;
    return formatted;
  }
  if (inputType === 'currency') {
    if (adornment) formatted = `${fCurrency(value)} ${adornment}`;
    else formatted = fCurrencySymbol(value);
    return formatted;
  }
};
