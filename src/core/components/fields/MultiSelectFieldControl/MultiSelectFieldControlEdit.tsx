import React, { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import { classNames } from '@utils/classNames';
import { MultiSelectFieldControlProps } from '@components/fields';
import { IconButton } from '@components/iconButton';

export const MultiSelectFieldControlEdit = (
  props: MultiSelectFieldControlProps
) => {
  const {
    className,
    variant,
    value,
    onChange,
    items,
    error,
    helperText,
    label,
    multiple,
    placeholder,
    displayEmpty,
    size,
    ...other
  } = props;

  const [state, setState] = useState<unknown[] | undefined>(value || []);

  useUpdateEffect(() => {
    setState(value || []);
  }, [value]);

  const cls = classNames(className, {
    'field-control_no-data': !state || state.length === 0,
  });

  const onChangeHandler = (e: SelectChangeEvent<any>, child?: any) => {
    setState(e.target.value as unknown[]);
    if (onChange) {
      onChange(e, child);
    }
  };
  const hasState = Boolean(state && state.length > 0);
  const IconComponent = hasState ? () => null : ExpandMoreIcon;
  const clear = () => {
    const e = {
      target: { value: [], name: other.name },
    } as SelectChangeEvent<any>;
    onChangeHandler(e);
  };
  const endAdornment = hasState ? (
    <IconButton onClick={clear}>
      <CloseIcon />
    </IconButton>
  ) : undefined;
  const renderValue = (selected: any) => {
    const sel = selected as unknown[];
    if (sel?.length === 0) {
      return placeholder;
    }
    return items
      ?.filter((item) => sel?.includes(String(item.value)))
      .map((item) => item.label)
      .join(', ');
  };

  return (
    <FormControl variant="outlined" className={cls}>
      {label ? <InputLabel id="label">{label}</InputLabel> : null}
      <Select
        value={state}
        label={label}
        labelId="label"
        onChange={onChangeHandler}
        renderValue={renderValue}
        IconComponent={IconComponent}
        endAdornment={endAdornment}
        error={!!error}
        displayEmpty={Boolean(placeholder)}
        placeholder={placeholder}
        multiple
        MenuProps={{
          anchorOrigin: { vertical: 'bottom', horizontal: 0 },
          transformOrigin: { vertical: -8, horizontal: 0 },
          className:
            'multi-select-field-control__menu select-field-control__menu',
        }}
        {...other}
      >
        {placeholder && (
          <MenuItem value="" disabled={true}>
            {placeholder}
          </MenuItem>
        )}
        {items?.map((item, index) => {
          return (
            <MenuItem key={index} value={item.value ? String(item.value) : ''}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
      {helperText && (
        <FormHelperText error={!!error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
