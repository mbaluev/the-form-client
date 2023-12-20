import { observer } from 'mobx-react';
import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page';
import { CustomHead } from '@ui/layout/customHead';

const Users = observer((props: any) => {
  // const router = useRouter();
  // const { getList: getUsers, clearList: clearUsers } =
  //   useViewModel<IUserViewModel>(VIEW_MODEL.User);

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

  // useEffect(() => {
  //   getUsers(router.query);
  //   return () => {
  //     clearUsers();
  //   };
  // });

  return (
    <MasterAuth>
      <Page {...props} breadCrumbs={breadCrumbs}>
        <CustomHead />
        ...
      </Page>
    </MasterAuth>
  );
});

export default Users;
