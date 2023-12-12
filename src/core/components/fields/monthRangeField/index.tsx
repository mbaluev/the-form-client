import { FC, useState, MouseEvent } from 'react';
import {
  ButtonProps,
  FormControl,
  InputAdornment,
  Popover,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { MonthRangeContainer } from '@components/fields/monthRangeField/monthRangeContainer';
import { valueFormatter } from '@components/fields/monthRangeField/valueFormatter';
import { Button } from '@theme/button';
import { observer } from 'mobx-react';
import DateRangeIcon from '@mui/icons-material/DateRange';

export type YearMonthRange = [Date, Date];
export interface MonthRangeFieldProps {
  type?: 'button' | 'input';
  inputProps?: TextFieldProps;
  buttonProps?: ButtonProps;
  onChange?: (value: YearMonthRange) => void;
  changeOnClick?: boolean;
  value?: YearMonthRange;
  minDate?: Date;
  maxDate?: Date;
  confirmText?: string;
  curYearText?: string;
  placeholder?: string;
}

export const MonthRangeField: FC<MonthRangeFieldProps> = observer((props) => {
  const { value, onChange, type = 'button', inputProps, buttonProps, placeholder } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <FormControl className="month-range-field-control">
      {type === 'button' && (
        <Button
          {...buttonProps}
          children={valueFormatter(value, placeholder)}
          onClick={handleClick}
          endIcon={<DateRangeIcon />}
        />
      )}
      {type === 'input' && (
        <TextField
          {...inputProps}
          size="small"
          value={valueFormatter(value, placeholder)}
          onClick={handleClick}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <DateRangeIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: -10, horizontal: 'left' }}
        className="month-range-field-control__popover"
        marginThreshold={10}
      >
        <MonthRangeContainer
          {...props}
          onChange={(v: any) => {
            if (onChange) onChange(v);
            handleClose();
          }}
        />
      </Popover>
    </FormControl>
  );
});
