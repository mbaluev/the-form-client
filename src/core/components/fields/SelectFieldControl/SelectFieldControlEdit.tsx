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
import { findSelectItem, SelectFieldControlProps } from '@components/fields';
import { IconButton } from '@components/iconButton';

export const SelectFieldControlEdit = (props: SelectFieldControlProps) => {
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
    style,
    size,
    required,
    disabled,
    ...other
  } = props;

  const [state, setState] = useState(value || '');

  useUpdateEffect(() => {
    setState(value || '');
  }, [value]);

  const cls = classNames(className, {
    'field-control_no-data': !state || !findSelectItem(items, state),
  });

  const onChangeHandler = (e: SelectChangeEvent<any>, child?: any) => {
    setState(e.target.value);
    if (onChange) {
      onChange(e, child);
    }
  };
  const hasState = Boolean(state);
  const IconComponent = hasState && !required ? () => null : ExpandMoreIcon;
  const clear = () => {
    const e = {
      target: { value: '', name: other.name },
    } as SelectChangeEvent<any>;
    onChangeHandler(e);
  };
  const endAdornment =
    hasState && !required && !disabled ? (
      <IconButton onClick={clear}>
        <CloseIcon />
      </IconButton>
    ) : undefined;

  return (
    <FormControl variant="outlined" className={cls} style={style}>
      {label ? <InputLabel id="label">{label}</InputLabel> : null}
      <Select
        value={state}
        label={label}
        labelId="label"
        onChange={onChangeHandler}
        IconComponent={IconComponent}
        endAdornment={endAdornment}
        displayEmpty={Boolean(placeholder)}
        placeholder={placeholder}
        error={!!error}
        disabled={disabled}
        MenuProps={{
          anchorOrigin: { vertical: 'bottom', horizontal: 0 },
          transformOrigin: { vertical: -8, horizontal: 0 },
          className: 'select-field-control__menu',
        }}
        {...other}
      >
        {placeholder && (
          <MenuItem
            value=""
            className="select-field-control__menu-item_disabled"
          >
            {placeholder}
          </MenuItem>
        )}
        {items?.map((item, index) => {
          return (
            <MenuItem
              key={index}
              value={item.value ? item.value : ''}
              disabled={item.disabled}
            >
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
