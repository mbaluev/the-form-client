import React from 'react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { Page } from '@ui/layout/page';
import { observer } from 'mobx-react';
import { UsersList } from '@ui/pages/admin/progress/users/usersList';
import { TitleUsers } from '@ui/components/title/titleUsers';
import { SubTitleUsers } from '@ui/components/subTitle/subTitleUsers';

interface IProps {
  breadCrumbs: TBreadCrumb[];
}

export const UsersPage = observer((props: IProps) => {
  const { breadCrumbs } = props;
  return (
    <Page
      title={<TitleUsers />}
      subTitle={<SubTitleUsers />}
      breadCrumbs={breadCrumbs}
      padding={false}
    >
      <UsersList />
    </Page>
  );
});
