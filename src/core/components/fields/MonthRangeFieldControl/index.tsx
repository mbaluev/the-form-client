import React, { FC, useState, MouseEvent } from 'react';
import { FormControl, Popover } from '@mui/material';
import { MonthRangeContainer } from '@components/fields/MonthRangeFieldControl/monthRangeContainer';
import { valueFormatter } from '@components/fields/MonthRangeFieldControl/valueFormatter';
import { TextFieldControl, TextFieldControlProps } from '@components/fields';
import { Button, IButtonProps } from '@components/button';
import { observer } from 'mobx-react';
import './index.scss';

export type YearMonthRange = [Date, Date];
export interface IMonthRangeFieldControlProps {
  type?: 'button' | 'input';
  inputProps?: TextFieldControlProps;
  buttonProps?: IButtonProps;
  onChange: (value: YearMonthRange) => void;
  value?: YearMonthRange | undefined;
  minDate: Date;
  maxDate: Date;
  confirmText: string;
  curYearText?: string;
}

export const MonthRangeFieldControl: FC<IMonthRangeFieldControlProps> = observer((props) => {
  const { value, onChange, type = 'button', inputProps, buttonProps } = props;

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
        <Button {...buttonProps} children={valueFormatter(value)} onClick={handleClick} />
      )}
      {type === 'input' && (
        <TextFieldControl {...inputProps} value={valueFormatter(value)} onClick={handleClick} />
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
          onChange={(v) => {
            onChange(v);
            handleClose();
          }}
        />
      </Popover>
    </FormControl>
  );
});
