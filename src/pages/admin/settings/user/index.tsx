import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { PageUsers } from '@ui/pages/admin/settings/user/index/page';
import Custom204 from '@pages/204';

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
      <Page {...props} breadCrumbs={breadCrumbs} right={<Custom204 />}>
        <PageUsers />
      </Page>
    </MasterAuth>
  );
};

export default Users;