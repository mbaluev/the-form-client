import React from 'react';
import { ToggleButtonGroupProps } from '@mui/material';
import { classNames } from '@utils/classNames';
import {
  ToggleButtonGroupFieldControlView,
  ToggleButtonGroupFieldControlEdit,
  SkeletonFieldControl,
  BaseFieldControlProps,
  fieldControlClassNames,
} from '@components/fields';

export type TToggleVariant = 'default' | 'icon' | 'chips' | 'small';

export interface IToggleButtonItemJSX {
  value: string;
  label: string | JSX.Element;
  disabled?: boolean;
}

export interface IToggleButtonItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export type ToggleButtonGroupFieldControlProps =
  BaseFieldControlProps<ToggleButtonGroupProps> & {
    items?: IToggleButtonItemJSX[];
    variant?: TToggleVariant;
    checkIcon?: boolean;
  };

export const isToggleButtonGroupFieldControlHasData = (value?: any) => {
  return (
    typeof value !== 'undefined' &&
    Array.isArray(value) &&
    (value as []).length > 0
  );
};

export const ToggleButtonGroupFieldControl = (
  props: ToggleButtonGroupFieldControlProps
) => {
  const {
    isEdit = true,
    loading,
    className,
    heightAuto,
    variant = 'default',
    ...other
  } = props;

  const clsBase = classNames(
    'toggle-button-group-field-control',
    `toggle-button-group-field-control_${variant}`
  );
  const cls = fieldControlClassNames(props, clsBase);

  if (loading) {
    return <SkeletonFieldControl className={cls} />;
  } else if (isEdit) {
    return <ToggleButtonGroupFieldControlEdit className={cls} {...other} />;
  } else {
    return <ToggleButtonGroupFieldControlView className={cls} {...other} />;
  }
};
