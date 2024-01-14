import { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { observer } from 'mobx-react';
import { IUserAdminViewModel } from '@viewModel/modules/entities/user/admin/interface';
import { UsersPage } from '@ui/pages/admin/progress/users/usersPage';

const Users = () => {
  const { getList: getUsers, clearList: clearUsers } = useViewModel<IUserAdminViewModel>(
    VIEW_MODEL.UserAdmin
  );

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_USERS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_USERS.path },
    },
  ];

  useEffect(() => {
    getUsers();
    return () => {
      clearUsers();
    };
  });

  return <UsersPage breadCrumbs={breadCrumbs} />;
};

Users.Layout = MasterSchool;
export default observer(Users);
