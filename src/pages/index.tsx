import React from 'react';
import { Page } from '@ui/layout/page';
import { IndexContent } from '@ui/pages/index/indexContent';
import { MasterSchool } from '@ui/masters/masterSchool';

const Index = () => {
  return (
    <Page>
      <IndexContent />
    </Page>
  );
};

Index.Layout = MasterSchool;
export default Index;
