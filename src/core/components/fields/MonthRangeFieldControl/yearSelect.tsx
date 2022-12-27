import { FC, useMemo } from 'react';
import { IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { yearArrayFromRange } from '@utils/date/yearArrayFromRange';
import { SelectFieldControl } from '@components/fields';

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
    <SelectFieldControl
      className="month-range-field-control__year-select"
      fullWidth
      disabled={disabled}
      value={value}
      onChange={(event) => onChange(event.target.value as number)}
      items={options.map((option) => {
        return {
          label: String(option),
          value: option,
        };
      })}
    />
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
