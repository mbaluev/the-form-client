import React from 'react';
import { TextFieldProps } from '@mui/material';
import {
  BaseFieldControlProps,
  fieldControlClassNames,
  TextFieldControlEdit,
  TextFieldControlView,
  SkeletonFieldControl,
} from '@components/fields';

export type TTextFieldControlType = 'text' | 'number' | 'currency';

export type TextFieldControlProps = BaseFieldControlProps<TextFieldProps> & {
  value?: string | number;
  inputType?: TTextFieldControlType;
  adornment?: JSX.Element | string;
};

export const isTextFieldControlHasData = (value?: string | number) => {
  return value || value === 0;
};

export const TextFieldControl = (props: TextFieldControlProps) => {
  const {
    isEdit = true,
    loading,
    multiline,
    className,
    heightAuto,
    ...other
  } = props;

  const cls = fieldControlClassNames(props, 'text-field-control');

  if (loading) {
    return <SkeletonFieldControl className={cls} />;
  } else if (isEdit) {
    return (
      <TextFieldControlEdit className={cls} multiline={multiline} {...other} />
    );
  } else {
    return (
      <TextFieldControlView className={cls} loading={loading} {...other} />
    );
  }
};
