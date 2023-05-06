import React from 'react';
import { Page } from '@ui/layout/page';
import { MasterSchool } from '@ui/masters/masterSchool';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { ProfileTabs } from '@ui/pages/account/profile/profileTabs';

const Profile = () => {
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ACCOUNT_PROFILE.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ACCOUNT_PROFILE.path },
    },
  ];
  return (
    <Page title="Profile" breadCrumbs={breadCrumbs}>
      <ProfileTabs />
    </Page>
  );
};

Profile.Layout = MasterSchool;
export default Profile;
