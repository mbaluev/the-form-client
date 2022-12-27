import React from 'react';
import {
  fieldControlClassNames,
  PasswordFieldControlEdit,
  PasswordFieldControlView,
  SkeletonFieldControl,
  TextFieldControlProps,
} from '@components/fields';

export type PasswordFieldControlProps = Omit<TextFieldControlProps, 'value'> & {
  value?: string;
};

export const PasswordFieldControl = (props: PasswordFieldControlProps) => {
  const { isEdit = true, loading, className, heightAuto, ...other } = props;

  const cls = fieldControlClassNames(props, 'password-field-control');

  if (loading) {
    return <SkeletonFieldControl className={cls} />;
  } else if (isEdit) {
    return <PasswordFieldControlEdit className={cls} {...other} />;
  } else {
    return <PasswordFieldControlView className={cls} {...other} />;
  }
};
