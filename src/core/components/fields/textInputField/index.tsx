import { ChangeEvent, useState } from 'react';
import { TextField } from '@mui/material';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import { useLocaleStore } from '@store/modules/common/locale/useLocaleStore';
import { TextInputFieldProps } from '@components/fields/textInputField/types';
import { getInputProps } from '@components/fields/textInputField/getInputProps';

export const TextInputField = (props: TextInputFieldProps) => {
  const {
    className,
    variant,
    value,
    onChange,
    multiline,
    inputType = 'text',
    adornment,
    inputProps,
    InputProps,
    sx,
    ...other
  } = props;

  const max = inputProps?.max;
  const min = inputProps?.min;

  const [state, setState] = useState<string | number | undefined>(value);

  const onChangeState = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (inputType === 'number') {
      let val = Number(e.target.value);
      if (max && val > max) val = max;
      if (min && val < min) val = min;
      setState(val);
      e.target.value = String(val);
    } else {
      setState(e.target.value);
    }
    if (onChange) onChange(e);
  };

  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  const { currencyInfo } = useLocaleStore();

  return (
    <TextField
      size="small"
      variant="outlined"
      value={state || ''}
      onChange={onChangeState}
      multiline={multiline}
      inputProps={{ autoComplete: 'new-password', ...inputProps }}
      InputProps={{
        ...getInputProps(value, inputType, adornment, currencyInfo),
        ...InputProps,
      }}
      sx={{
        '& input': { textAlign: inputType === 'number' ? 'right' : undefined },
        ...sx,
      }}
      {...other}
    />
  );
};
