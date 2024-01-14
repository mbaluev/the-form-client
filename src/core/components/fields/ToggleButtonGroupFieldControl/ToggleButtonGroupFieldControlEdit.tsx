import React, { useEffect, useState } from 'react';
import { FormControl, FormHelperText, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { classNames } from '@utils/classNames';
import {
  isToggleButtonGroupFieldControlHasData,
  ToggleButtonGroupFieldControlProps,
} from '@components/fields';

export const ToggleButtonGroupFieldControlEdit = (props: ToggleButtonGroupFieldControlProps) => {
  const {
    className,
    value,
    onChange,
    error,
    helperText,
    items,
    disabled,
    checkIcon,
    size,
    ...other
  } = props;

  const [state, setState] = useState<string | string[] | null>();

  const cls = classNames(className, {
    'field-control_no-data': !isToggleButtonGroupFieldControlHasData(state),
  });

  useEffect(() => {
    setState(value);
  }, [value]);

  return (
    <FormControl className={cls}>
      <ToggleButtonGroup
        value={state}
        onChange={(e: React.MouseEvent<HTMLElement>, onChangeValue: string | null) => {
          setState(onChangeValue);
          if (onChange) {
            onChange(e, onChangeValue);
          }
        }}
        {...other}
      >
        {items?.map((item, index) => {
          const selected =
            item.value === state || (Array.isArray(state) && state.indexOf(item.value) >= 0);
          return (
            <ToggleButton key={index} value={item.value} disabled={item.disabled || disabled}>
              {checkIcon && selected && <CheckIcon />}
              {item.label}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      {helperText && <FormHelperText error={!!error}>{helperText}</FormHelperText>}
    </FormControl>
  );
};
