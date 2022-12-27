import React from 'react';
import { Content } from '@components/content';
import { CONFIG } from '@ui/pages/dev/index/config';

export const IndexContent = () => {
  return <Content items={CONFIG} />;
};
