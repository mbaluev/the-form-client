import React, { useState } from 'react';
import { FormControl, FormHelperText, InputAdornment } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import { classNames } from '@utils/classNames';
import { IconButton } from '@components/iconButton';
import {
  getRangeDisplayValue,
  RANGE_MIN,
  RANGE_MAX,
  RangeFieldControlProps,
  RangePopover,
  TextFieldControl,
  rangeFieldHasData,
} from '@components/fields';

export const RangeFieldControlEdit = (props: RangeFieldControlProps) => {
  const {
    value,
    className,
    placeholder,
    format,
    disabled,
    error,
    helperText,
    min = RANGE_MIN,
    max = RANGE_MAX,
    onChange,
  } = props;

  const [state, setState] = useState<undefined | number[]>(value);
  const hasState = rangeFieldHasData(min, max, state);

  const [focused, setFocused] = useState<boolean>(false);
  const handleFocus = () => {
    if (!disabled) setFocused(true);
  };
  const handleBlur = () => {
    if (!disabled) setFocused(false);
  };

  const inputRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const setClosed = () => {
    if (!disabled) {
      handleBlur();
      setOpen(false);
    }
  };
  const setOpened = () => {
    if (!disabled) {
      handleFocus();
      setOpen(true);
    }
  };

  const handleChange = (
    event: any,
    newValue: number[],
    activeThumb: number
  ) => {
    setState(newValue);
    if (onChange) {
      onChange(event, newValue, activeThumb);
    }
  };

  const handleClear = (e: any) => {
    e.stopPropagation();
    setState([min, max]);
    if (onChange) {
      onChange(null as any, [min, max], 0);
    }
    setClosed();
  };
  const inputProps = hasState
    ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClear}>
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }
    : {
        endAdornment: (
          <InputAdornment position="end">
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </InputAdornment>
        ),
      };

  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  const cls = classNames(className, {
    'field-control_focused': Boolean(focused),
    'field-control_no-data': !hasState,
  });

  return (
    <FormControl className={cls} ref={inputRef}>
      <TextFieldControl
        placeholder={placeholder}
        value={getRangeDisplayValue(min, max, state, format)}
        onClick={setOpened}
        InputProps={inputProps}
        disabled={disabled}
        error={error}
      />
      {error && helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
      <RangePopover
        anchorEl={inputRef.current}
        onClose={setClosed}
        open={open}
        onChange={handleChange}
        {...props}
      />
    </FormControl>
  );
};
