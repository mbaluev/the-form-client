import React from 'react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { Page } from '@ui/layout/page';
import { observer } from 'mobx-react';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { UserBlocksList } from '@ui/pages/admin/settings/userBlock/index/userBlocksList';

interface IProps {
  breadCrumbs: TBreadCrumb[];
}

export const UserBlocksPage = observer((props: IProps) => {
  const { breadCrumbs } = props;

  return (
    <Page
      title={ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USER_BLOCKS.label}
      breadCrumbs={breadCrumbs}
      padding={false}
    >
      <UserBlocksList />
    </Page>
  );
});
