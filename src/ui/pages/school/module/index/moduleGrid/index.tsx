import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { ModuleItem } from '@ui/pages/school/module/index/moduleItem';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';
import { Loader } from '@components/loader';

export const ModuleGrid = observer(() => {
  const { list: userModules, isListLoading } = useViewModel<IModuleUserViewModel>(
    VIEW_MODEL.ModuleUser
  );

  if (isListLoading) return <Loader relative loading />;

  return (
    <div className="cols_4">
      <Loader relative />
      {!isListLoading &&
        userModules?.map((userModule, index) => <ModuleItem key={index} userModule={userModule} />)}
    </div>
  );
});
