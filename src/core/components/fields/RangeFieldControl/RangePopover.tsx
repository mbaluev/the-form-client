import React, { useState } from 'react';
import { Popover } from '@mui/material';
import { Button } from '@components/button';
import {
  RANGE_MAX,
  RANGE_MIN,
  RangeFieldControlButtons,
  RangeSliderProps,
  SliderFieldControl,
} from '@components/fields';

type RangePopoverOptions = {
  anchorEl: HTMLDivElement | null;
  open: boolean;
  onClose: () => void;
};

export type RangePopoverProps = RangeSliderProps &
  RangePopoverOptions &
  RangeFieldControlButtons;

export const RangePopover = (props: RangePopoverProps) => {
  const {
    anchorEl,
    onClose,
    open,
    value,
    onChange,
    clearLabel = 'Clear',
    submitLabel = 'Submit',
    min = RANGE_MIN,
    max = RANGE_MAX,
  } = props;

  const [state, setState] = useState<number[]>(value || [min, max]);

  const handleChange = (event: any, newValue: number[]) => {
    setState(newValue);
  };
  const handleSubmit = () => {
    if (onChange) {
      onChange(null as any, state, 0);
    }
    onClose();
  };
  const handleClear = () => {
    setState([min, max]);
    if (onChange) {
      onChange(null as any, [min, max], 0);
    }
    onClose();
  };

  return (
    <Popover
      id={open ? 'simple-popover' : undefined}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: -8, horizontal: 'left' }}
      className="range-field-control__popover"
      marginThreshold={10}
      PaperProps={{
        style: {
          width: anchorEl?.clientWidth,
        },
      }}
    >
      <div className="range-field-control__popover-root">
        <div className="range-field-control__popover-content">
          <SliderFieldControl
            {...props}
            value={state}
            onChange={(e, v) => handleChange(e, v as number[])}
            error={false}
            helperText={undefined}
          />
        </div>
        <div className="range-field-control__popover-buttons">
          <Button size="small" variant="text" color="red" onClick={handleClear}>
            {clearLabel}
          </Button>
          <Button
            size="small"
            variant="contained"
            color="blue"
            onClick={handleSubmit}
          >
            {submitLabel}
          </Button>
        </div>
      </div>
    </Popover>
  );
};
