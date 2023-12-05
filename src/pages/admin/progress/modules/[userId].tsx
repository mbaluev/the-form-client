import { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { observer } from 'mobx-react';
import { IModuleAdminViewModel } from '@viewModel/modules/entities/module/admin/interface';
import { ModulesPage } from '@ui/pages/admin/progress/modules/modulesPage';
import { useRouter } from 'next/router';
import { IUserAdminViewModel } from '@viewModel/modules/entities/user/admin/interface';

const Modules = () => {
  const { getList: getModules, clearList: clearModules } =
    useViewModel<IModuleAdminViewModel>(VIEW_MODEL.ModuleAdmin);
  const {
    getData: getUser,
    data: user,
    clearData: clearUser,
  } = useViewModel<IUserAdminViewModel>(VIEW_MODEL.UserAdmin);

  const router = useRouter();
  const userId = router.query.userId as string;
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_USERS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_USERS.path },
    },
    {
      label: user
        ? user.username
        : ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_MODULES.label,
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_MODULES.path,
        query: router.query,
      },
    },
  ];

  useEffect(() => {
    if (userId) {
      getModules(router.query);
      getUser(userId);
    }
    return () => {
      clearModules();
      clearUser();
    };
  }, [userId]);

  return <ModulesPage breadCrumbs={breadCrumbs} />;
};

Modules.Layout = MasterSchool;
export default observer(Modules);
