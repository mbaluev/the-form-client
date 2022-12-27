import React from 'react';
import { SelectProps } from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import {
  BaseFieldControlProps,
  fieldControlClassNames,
  SelectFieldControlView,
  SelectFieldControlEdit,
  SkeletonFieldControl,
} from '@components/fields';

export interface ISelectItem {
  value?: number | string;
  label: string;
  disabled?: boolean;
}

export type SelectFieldControlProps = BaseFieldControlProps<SelectProps> & {
  items?: ISelectItem[];
  onChange?: SelectInputProps['onChange'];
};

export const findSelectItem = (items?: ISelectItem[], value?: any) => {
  return items?.find((item) => {
    return String(item.value) === String(value);
  });
};

export const SelectFieldControl = (props: SelectFieldControlProps) => {
  const { isEdit = true, loading, className, heightAuto, ...other } = props;

  const cls = fieldControlClassNames(props, 'select-field-control');

  if (loading) {
    return <SkeletonFieldControl className={cls} />;
  } else if (isEdit) {
    return <SelectFieldControlEdit className={cls} {...other} />;
  } else {
    return <SelectFieldControlView className={cls} {...other} />;
  }
};
