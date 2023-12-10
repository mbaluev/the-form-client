import { ReactElement } from 'react';
import { InputAdornment } from '@mui/material';
import { ICurrency } from '@utils/locale/currency/iso-4217';
import { TextInputFieldType } from '@components/fields/textInputField/types';
import { NumberFormat } from '@components/fields/textInputField/numberFormat';
import { PatternFormat } from '@components/fields/textInputField/patternFormat';

export const getInputProps = (
  value?: string | number,
  inputType?: TextInputFieldType,
  adornment?: ReactElement | string,
  currencyInfo?: ICurrency
) => {
  if (inputType === 'text') {
    return {
      endAdornment: adornment && <InputAdornment position="end">{adornment}</InputAdornment>,
    };
  }
  if (inputType === 'number') {
    return {
      inputComponent: NumberFormat as any,
      endAdornment: adornment && <InputAdornment position="end">{adornment}</InputAdornment>,
    };
  }
  if (inputType === 'currency') {
    return {
      inputComponent: NumberFormat as any,
      endAdornment: <InputAdornment position="end">{currencyInfo?.symbol}</InputAdornment>,
    };
  }
  if (inputType === 'pattern') {
    return {
      inputComponent: PatternFormat as any,
    };
  }
};
