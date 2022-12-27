import React from 'react';
import { Page } from '@ui/layout/page';
import { MasterSchool } from '@ui/masters/masterSchool';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { IndexContent } from '@ui/pages/index/indexContent';

const Index = () => {
  const started = false;
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
  ];
  return (
    <Page breadCrumbs={breadCrumbs}>
      <IndexContent started={started} />
    </Page>
  );
};

Index.Layout = MasterSchool;
export default Index;
