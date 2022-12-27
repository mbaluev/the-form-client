import React, { FC } from 'react';
import { Layout } from '@ui/layout/layout';

export const MasterSite: FC<any> = (props) => {
  const { children } = props;
  return <Layout>{children}</Layout>;
};
