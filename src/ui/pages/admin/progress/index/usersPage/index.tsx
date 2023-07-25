import React from 'react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { Page } from '@ui/layout/page';
import { observer } from 'mobx-react';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { UsersList } from '@ui/pages/admin/progress/index/usersList';

interface IProps {
  breadCrumbs: TBreadCrumb[];
}

export const UsersPage = observer((props: IProps) => {
  const { breadCrumbs } = props;

  return (
    <Page
      title={ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_USERS.label}
      breadCrumbs={breadCrumbs}
      padding={false}
    >
      <UsersList />
    </Page>
  );
});
