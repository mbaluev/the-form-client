import React from 'react';
import {
  BaseFieldControlProps,
  fieldControlClassNames,
  SkeletonFieldControl,
  RangeFieldControlEdit,
  RangeFieldControlView,
  SliderFieldControlProps,
  getSliderDisplayValue,
} from '@components/fields';

export const RANGE_MIN = 0;
export const RANGE_MAX = 100;

export type RangeFieldControlButtons = {
  clearLabel?: string;
  submitLabel?: string;
};

export type RangeSliderProps = Omit<SliderFieldControlProps, 'value' | 'onChange'> & {
  value?: number[];
  onChange?: (event: Event, value: number[], activeThumb: number) => void;
};

export type RangeFieldControlProps = BaseFieldControlProps<RangeSliderProps> &
  RangeFieldControlButtons;

export const RangeFieldControl = (props: RangeFieldControlProps) => {
  const { isEdit = true, loading, className, heightAuto, ...other } = props;

  const cls = fieldControlClassNames(props, 'range-field-control');

  if (loading) {
    return <SkeletonFieldControl className={cls} />;
  } else if (isEdit) {
    return <RangeFieldControlEdit className={cls} {...other} />;
  } else {
    return <RangeFieldControlView className={cls} {...other} />;
  }
};

export const getRangeDisplayValue = (
  min: number,
  max: number,
  value?: number[],
  format?: (value?: number) => string
) => {
  if (value && (value[0] !== min || value[1] !== max)) {
    return getSliderDisplayValue(value, format);
  } else {
    return undefined;
  }
};

export const rangeFieldHasData = (min: number, max: number, value?: number[]) => {
  if (!Boolean(value)) return false;
  else if (Array.isArray(value) && value.length === 0) return false;
  else return !(Array.isArray(value) && value[0] === min && value[1] === max);
};
