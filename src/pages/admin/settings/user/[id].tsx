import { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { IUserViewModel } from '@viewModel/modules/entities/user/interface';
import { UserPage } from '@ui/pages/admin/settings/user/userPage';
import { useRouter } from 'next/router';

const User = () => {
  const {
    getList: getUsers,
    getData: getUser,
    clearList: clearUsers,
    clearData: clearUser,
    clearUserData,
    data: user,
  } = useViewModel<IUserViewModel>(VIEW_MODEL.User);

  const router = useRouter();
  const id = router.query.id as string;
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USERS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USERS.path },
    },
    {
      label: user ? user.username : 'Not found',
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USER.path,
        query: { id: user?.id },
      },
      disabled: !Boolean(user),
    },
  ];

  useEffect(() => {
    if (id) {
      getUsers(router.query);
      getUser(id, router.query);
    }
    return () => {
      clearUsers();
      clearUser();
      clearUserData();
    };
  }, [id]);

  return <UserPage breadCrumbs={breadCrumbs} />;
};

User.Layout = MasterSchool;
export default observer(User);
