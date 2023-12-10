import { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { IUserViewModel } from '@viewModel/modules/entities/user/interface';
import { UserPage } from '@ui/pages/admin/settings/user/userPage';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';

const Users = () => {
  const { getList: getUsers, clearList: clearUsers } =
    useViewModel<IUserViewModel>(VIEW_MODEL.User);

  const router = useRouter();
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USERS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USERS.path },
    },
  ];

  useEffect(() => {
    getUsers(router.query);
    return () => {
      clearUsers();
    };
  });

  return <UserPage breadCrumbs={breadCrumbs} />;
};

Users.Layout = MasterSchool;
export default observer(Users);
