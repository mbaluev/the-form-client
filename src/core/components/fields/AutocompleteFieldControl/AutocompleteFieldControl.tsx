import React from 'react';
import { AutocompleteProps } from '@mui/material';
import {
  AutocompleteFieldControlView,
  AutocompleteFieldControlEdit,
  BaseFieldControlProps,
  fieldControlClassNames,
  SkeletonFieldControl,
} from '@components/fields';

export type AutocompleteFieldControlProps<T> = BaseFieldControlProps<
  Omit<
    AutocompleteProps<T, false, true, false>,
    'renderInput' | 'value' | 'onChange'
  >
> & {
  value?: T[keyof T];
  valueField?: keyof T;
  labelField?: keyof T;
  onChange?: (value?: T) => void;
};

export const isControlHasData = <T,>(value?: T) => {
  return Boolean(value);
};

export const getValue = <T,>(
  valueField: keyof T,
  options?: readonly T[],
  value?: T[keyof T]
) => {
  return options?.find((d) => d[valueField] === value) as NonNullable<T>;
};

export const getDisplayValue = <T,>(
  valueField: keyof T,
  labelField: keyof T,
  options?: readonly T[],
  value?: T[keyof T]
) => {
  return options?.find((d) => d[valueField] === value)?.[labelField];
};

export const AutocompleteFieldControl = <T,>(
  props: AutocompleteFieldControlProps<T>
) => {
  const { isEdit = true, loading, className, heightAuto, ...other } = props;

  const cls = fieldControlClassNames(props, 'autocomplete-field-control');

  if (loading) {
    return <SkeletonFieldControl className={cls} />;
  } else if (isEdit) {
    return <AutocompleteFieldControlEdit className={cls} {...other} />;
  } else {
    return <AutocompleteFieldControlView className={cls} {...other} />;
  }
};
