import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { ModulePage } from '@ui/pages/school/module/[id]/modulePage';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';
import { useRouter } from 'next/router';

const Module = () => {
  const { getData: getModule, clearData: clearModule } = useViewModel<IModuleUserViewModel>(
    VIEW_MODEL.ModuleUser
  );

  const router = useRouter();
  const id = router.query?.id as string;

  useEffect(() => {
    getModule(id);
    return () => {
      clearModule();
    };
  });

  return <ModulePage />;
};

Module.Layout = MasterSchool;
export default observer(Module);
