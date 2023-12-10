import { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IModuleViewModel } from '@viewModel/modules/entities/module/interface';
import { observer } from 'mobx-react';
import { ModulePage } from '@ui/pages/admin/settings/module/modulePage';
import { IBlockViewModel } from '@viewModel/modules/entities/block/interface';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { useRouter } from 'next/router';

const Module = () => {
  const {
    getList: getModules,
    getData: getModule,
    clearList: clearModules,
    clearData: clearModule,
    clearModuleData,
    data: module,
  } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);
  const { getList: getBlocks, clearList: clearBlocks } =
    useViewModel<IBlockViewModel>(VIEW_MODEL.Block);

  const router = useRouter();
  const moduleId = router.query.moduleId as string;
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULES.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULES.path },
    },
    {
      label: module ? `${module?.title}. ${module.name}` : 'Not found',
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULE.path,
        query: { moduleId: module?.id },
      },
      disabled: !Boolean(module),
    },
  ];

  useEffect(() => {
    if (moduleId) {
      getModules(router.query);
      getModule(moduleId);
      getBlocks({ moduleId });
    }
    return () => {
      clearModules();
      clearModule();
      clearModuleData();
      clearBlocks();
    };
  }, [moduleId]);

  return <ModulePage breadCrumbs={breadCrumbs} />;
};

Module.Layout = MasterSchool;
export default observer(Module);
