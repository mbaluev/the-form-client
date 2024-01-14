import { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { ModulesPage } from '@ui/pages/school/module/index/modulesPage';
import { observer } from 'mobx-react';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';

const Module = () => {
  const { getList: getModules, clearList: clearModules } = useViewModel<IModuleUserViewModel>(
    VIEW_MODEL.ModuleUser
  );

  useEffect(() => {
    getModules();
    return () => {
      clearModules();
    };
  });

  return <ModulesPage />;
};

Module.Layout = MasterSchool;
export default observer(Module);
