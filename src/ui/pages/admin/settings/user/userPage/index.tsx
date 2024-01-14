import React from 'react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { Page } from '@ui/layout/page';
import { observer } from 'mobx-react';
import { UserCard } from '@ui/pages/admin/settings/user/userCard';
import { UserList } from '@ui/pages/admin/settings/user/userList';

interface IProps {
  breadCrumbs: TBreadCrumb[];
  onNewCallback?: (id: string) => void;
}

export const UserPage = observer((props: IProps) => {
  const { breadCrumbs, ...other } = props;

  return (
    <Page title="Users" breadCrumbs={breadCrumbs} padding={false} pageRight={<UserCard />}>
      <UserList {...other} />
    </Page>
  );
});
