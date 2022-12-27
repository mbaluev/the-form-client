import { TTextFieldControlType } from '@components/fields';
import { useLocale } from '@hooks/useLocale';

export const viewFormat = (
  value?: string | number,
  inputType?: TTextFieldControlType,
  adornment?: JSX.Element | string
) => {
  const { fNumber, fCurrency, fCurrencyExplicit } = useLocale();
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
    else formatted = fCurrencyExplicit(value);
    return formatted;
  }
};
