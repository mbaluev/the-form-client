import { FC, useMemo } from 'react';
import { IconButton, Select } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { yearArrayFromRange } from '@utils/date/yearArrayFromRange';
import MenuItem from '@mui/material/MenuItem';

export interface IYearSelectProps {
  minYear: number;
  maxYear: number;
  value: number;
  small?: boolean;
  hideControls?: boolean;
  disabled?: boolean;
  onChange: (value: number) => void;
}

export const YearSelect: FC<IYearSelectProps> = (props) => {
  const { value, minYear, maxYear, onChange, hideControls, small, disabled } =
    props;
  const options: number[] = useMemo(
    () => yearArrayFromRange(minYear, maxYear),
    [minYear, maxYear]
  );

  const select = (
    <Select
      fullWidth
      disabled={disabled}
      value={value}
      required
      onChange={(event) => onChange(event.target.value as number)}
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );

  if (hideControls) {
    return select;
  }

  return (
    <div className="month-range-field-control__year">
      <IconButton
        disabled={value - 1 < minYear}
        size={small ? 'small' : undefined}
        onClick={() => {
          onChange(value - 1);
        }}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      {select}
      <IconButton
        size={small ? 'small' : undefined}
        disabled={value + 1 > maxYear}
        onClick={() => {
          onChange(value + 1);
        }}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </div>
  );
};
