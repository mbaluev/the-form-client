import React from 'react';
import { Page } from '@ui/layout/page';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Page204 } from '@ui/pages/errors/204';
import { Loader } from '@components/loader';
import { IUserViewModel } from '@viewModel/modules/entities/user/interface';
import { UserLabel } from '@ui/pages/admin/settings/user/userLabel';
import { UserCardActions } from '@ui/pages/admin/settings/user/userCardActions';
import { UserTabs } from '@ui/pages/admin/settings/user/userTabs';

export const UserCard = observer(() => {
  const { userData, isDataLoading } = useViewModel<IUserViewModel>(
    VIEW_MODEL.User
  );

  if (!userData) return <Page204 />;

  return (
    <Page title={<UserLabel />} quickFilter={<UserCardActions />}>
      <Loader loading={isDataLoading} />
      <UserTabs />
    </Page>
  );
});
