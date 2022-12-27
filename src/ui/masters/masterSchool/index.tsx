import React, { FC } from 'react';
import { MENU_CONFIG_SCHOOL } from '@app/settings/menu/school';
import { Layout } from '@ui/layout/layout';

export const MasterSchool: FC<any> = (props) => {
  const { children } = props;
  return <Layout menuProps={{ items: MENU_CONFIG_SCHOOL }}>{children}</Layout>;
};
