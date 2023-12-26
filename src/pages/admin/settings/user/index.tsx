import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { UserList } from '@ui/pages/user/list';
import { UserItem } from '@ui/pages/user/item';

const Users = (props: any) => {
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTES.HOME.label,
      url: { pathname: ROUTES.HOME.path },
    },
    {
      label: ROUTES.ADMIN_SETTINGS_USERS.label,
      url: { pathname: ROUTES.ADMIN_SETTINGS_USERS.path },
    },
  ];
  return (
    <MasterAuth>
      <Page {...props} breadCrumbs={breadCrumbs} right={<UserItem />}>
        <UserList />
      </Page>
    </MasterAuth>
  );
};

export default Users;
