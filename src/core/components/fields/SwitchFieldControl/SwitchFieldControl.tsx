import React from 'react';
import { SwitchProps } from '@mui/material';
import {
  SwitchFieldControlView,
  SwitchFieldControlEdit,
  SkeletonFieldControl,
  BaseFieldControlProps,
  fieldControlClassNames,
} from '@components/fields';

export type SwitchFieldControlProps = BaseFieldControlProps<SwitchProps> & {
  label?: string;
  value?: boolean;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
};

export const SwitchFieldControl = (props: SwitchFieldControlProps) => {
  const { isEdit = true, loading, className, heightAuto, ...other } = props;

  const cls = fieldControlClassNames(props, 'switch-field-control');

  if (loading) {
    return <SkeletonFieldControl className={cls} />;
  } else if (isEdit) {
    return <SwitchFieldControlEdit className={cls} {...other} />;
  } else {
    return <SwitchFieldControlView className={cls} {...other} />;
  }
};
