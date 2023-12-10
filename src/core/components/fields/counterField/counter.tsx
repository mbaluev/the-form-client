import { InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { TextInputField } from 'core/components/fields/textInputField';

interface IProps {
  count?: number;
  min?: number;
  max?: number;
  increment?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

export const Counter = (props: IProps) => {
  const { count, min, max, increment = 1, onChange, disabled } = props;

  const [value, setValue] = useState<number | undefined>(count);
  const onInputClick = (e: MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };
  const onIncrease = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (value !== undefined) {
      let cnt = value + increment;
      if (max !== undefined && cnt > max) cnt = max;
      setValue(cnt);
    }
  };
  const onDecrease = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (value !== undefined) {
      let cnt = value - increment;
      if (min !== undefined && cnt < min) cnt = min;
      setValue(cnt);
    }
  };

  useEffect(() => {
    setValue(count);
  }, [count]);
  useEffect(() => {
    if (value !== undefined && onChange) onChange(value);
  }, [value]);

  return (
    <TextInputField
      placeholder="0"
      inputType="number"
      value={value}
      onClick={onInputClick}
      onChange={onInputChange}
      inputProps={{ min, max, decimalScale: 0 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton edge="start" onClick={onDecrease} disabled={disabled || value === min}>
              <RemoveIcon />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={onIncrease} disabled={disabled || value === max}>
              <AddIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      disabled={disabled}
      sx={{ '& .MuiInputBase-input': { textAlign: 'center' } }}
    />
  );
};
