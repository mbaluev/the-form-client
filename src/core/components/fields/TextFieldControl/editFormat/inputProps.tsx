import React from 'react';
import { InputAdornment } from '@mui/material';
import { FormatNumber, TTextFieldControlType } from '@components/fields';
import { useLocale } from '@hooks/useLocale';

export const inputProps = (
  value?: string | number,
  inputType?: TTextFieldControlType,
  adornment?: JSX.Element | string
) => {
  const { currencyInfo } = useLocale();
  if (inputType === 'text') return undefined;
  if (inputType === 'number') {
    return {
      inputComponent: FormatNumber as any,
      endAdornment: adornment && <InputAdornment position="end">{adornment}</InputAdornment>,
    };
  }
  if (inputType === 'currency') {
    return {
      inputComponent: FormatNumber as any,
      endAdornment: adornment ? (
        <InputAdornment position="end">{adornment}</InputAdornment>
      ) : (
        <InputAdornment position="end">{currencyInfo?.code}</InputAdornment>
      ),
    };
  }
};
