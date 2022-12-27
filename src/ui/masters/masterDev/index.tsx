import React, { FC } from 'react';
import { MENU_CONFIG_DEV } from '@app/settings/menu/dev';
import { Layout } from '@ui/layout/layout';

export const MasterDev: FC<any> = (props) => {
  const { children } = props;
  return (
    <Layout
      menuProps={{ items: MENU_CONFIG_DEV }}
      notifications
      globalSearch
      support
    >
      {children}
    </Layout>
  );
};
