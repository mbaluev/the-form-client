import React from 'react';
import { Page } from '@ui/layout/page';
import { IndexContent } from '@ui/pages/index/indexContent';
import { MasterSite } from '@ui/masters/masterSite';

const Index = () => {
  const started = false;
  return (
    <Page title="Manifesto">
      <IndexContent started={started} />
    </Page>
  );
};

Index.Layout = MasterSite;
export default Index;
