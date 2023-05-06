import React from 'react';
import { Page } from '@ui/layout/page';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Page204 } from '@ui/pages/errors/204';
import { Loader } from '@components/loader';
import { UserLabel } from '@ui/pages/admin/user/userLabel';
import { UserCardActions } from '@ui/pages/admin/user/userCardActions';
import { UserTabs } from '@ui/pages/admin/user/userTabs';
import { ITaskUserViewModel } from '@viewModel/modules/task/user/interface';

export const BlockCard = observer(() => {
  const { data, isDataLoading } = useViewModel<ITaskUserViewModel>(
    VIEW_MODEL.TaskUser
  );

  if (!data) return <Page204 message="No content. Please select homework" />;

  return (
    <Page title={<UserLabel />} quickFilter={<UserCardActions />}>
      <Loader loading={isDataLoading} />
      <UserTabs />
    </Page>
  );
});
