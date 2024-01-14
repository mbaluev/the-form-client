import React, { useState } from 'react';
import { FormControl, FormHelperText, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import { classNames } from '@utils/classNames';
import { Slider, SliderFieldControlProps, getSliderDisplayValue } from '@components/fields';

export const SliderFieldControlEdit = (props: SliderFieldControlProps) => {
  const {
    value,
    onChange,
    className,
    error,
    helperText,
    disabled,
    format,
    displayControls = true,
    placeholder,
    size,
    ...other
  } = props;

  const [state, setState] = useState<number | number[] | undefined>(value);

  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  const handleChange = (_event: any, newValue: number | number[], activeThumb: number) => {
    setState(newValue);
    if (onChange) {
      onChange(_event, newValue, activeThumb);
    }
  };

  const decrease = () => {
    if (typeof state === 'number') {
      const newValue = state === props.min ? state : state - 1;
      handleChange(null, newValue, 0);
    }
  };
  const increase = () => {
    if (typeof state === 'number') {
      const newValue = state === props.max ? state : state + 1;
      handleChange(null, newValue, 0);
    }
  };

  const DecreaseButton = () => {
    return (
      <IconButton
        className="slider-field-control__minus"
        size="small"
        onClick={decrease}
        disabled={props.disabled}
      >
        <RemoveIcon fontSize="inherit" />
      </IconButton>
    );
  };
  const IncreaseButton = () => {
    return (
      <IconButton
        className="slider-field-control__plus"
        size="small"
        onClick={increase}
        disabled={props.disabled}
      >
        <AddIcon fontSize="inherit" />
      </IconButton>
    );
  };

  const cls = classNames(className, {
    'field-control_no-data': !Boolean(state),
  });

  return (
    <FormControl className={cls}>
      {displayControls && (
        <div className="slider-field-control__controls">
          {typeof state === 'number' && !disabled && <DecreaseButton />}
          <div className="slider-field-control__label">{getSliderDisplayValue(state, format)}</div>
          {typeof state === 'number' && !disabled && <IncreaseButton />}
        </div>
      )}
      <div className="slider-field-control__slider">
        <Slider
          value={state}
          onChange={handleChange}
          valueLabelDisplay="off"
          disabled={disabled}
          {...other}
        />
      </div>
      {error && helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControl>
  );
};
