import { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { IModuleViewModel } from '@viewModel/modules/entities/module/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { ModulePage } from '@ui/pages/admin/settings/module/modulePage';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';

const Modules = () => {
  const { getList: getModules, clearList: clearModules } =
    useViewModel<IModuleViewModel>(VIEW_MODEL.Module);

  const router = useRouter();
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULES.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULES.path },
    },
  ];

  useEffect(() => {
    getModules(router.query);
    return () => {
      clearModules();
    };
  });

  return <ModulePage breadCrumbs={breadCrumbs} />;
};

Modules.Layout = MasterSchool;
export default observer(Modules);
