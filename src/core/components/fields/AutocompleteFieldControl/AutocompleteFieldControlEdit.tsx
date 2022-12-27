import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Autocomplete, FormControl, FormHelperText } from '@mui/material';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import { classNames } from '@utils/classNames';
import {
  TextFieldControl,
  AutocompleteFieldControlProps,
  getValue,
  isControlHasData,
} from '@components/fields';

export const AutocompleteFieldControlEdit = <T,>(
  props: AutocompleteFieldControlProps<T>
) => {
  const {
    className,
    value,
    options,
    onChange,
    valueField = 'value' as keyof T,
    helperText,
    error,
    size,
    ...other
  } = props;

  const [state, setState] = useState<T[keyof T] | undefined>(value);

  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  const cls = classNames(className, {
    'field-control_no-data': !isControlHasData(state),
  });

  return (
    <FormControl className={cls}>
      <Autocomplete
        options={options}
        value={getValue(valueField, options, state)}
        renderInput={(params) => <TextFieldControl {...params} />}
        onChange={(event: any, newValue: NonNullable<T>) => {
          setState(newValue['value' as keyof T] as any);
          if (onChange) onChange(newValue);
        }}
        popupIcon={<ExpandMoreIcon />}
        {...other}
      />
      {helperText && (
        <FormHelperText error={!!error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
