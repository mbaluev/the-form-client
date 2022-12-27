import React from 'react';
import { SliderProps } from '@mui/material';
import {
  BaseFieldControlProps,
  fieldControlClassNames,
  SliderFieldControlEdit,
  SliderFieldControlView,
  SkeletonFieldControl,
} from '@components/fields';

export type SliderFieldControlProps = BaseFieldControlProps<SliderProps> & {
  format?: (value?: number) => string;
  displayControls?: boolean;
};

export const SliderFieldControl = (props: SliderFieldControlProps) => {
  const { isEdit = true, loading, className, ...other } = props;

  const cls = fieldControlClassNames(props, 'slider-field-control');

  if (loading) {
    return <SkeletonFieldControl className={cls} />;
  } else if (isEdit) {
    return <SliderFieldControlEdit className={cls} {...other} />;
  } else {
    return <SliderFieldControlView className={cls} {...other} />;
  }
};

export const getSliderDisplayValue = (
  value: number | number[] | undefined,
  format?: (value?: number) => string
) => {
  if (typeof value === 'number') {
    return format ? format(value) : value;
  }
  if (Array.isArray(value)) {
    return value
      .map((v) => {
        return format ? format(v) : v;
      })
      .join(' - ');
  }
  return undefined;
};
