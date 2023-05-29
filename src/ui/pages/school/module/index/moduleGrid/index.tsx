import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { ModuleItem } from '@ui/pages/school/module/index/moduleItem';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';

export const ModuleGrid = observer(() => {
  const { list: modules } = useViewModel<IModuleUserViewModel>(
    VIEW_MODEL.ModuleUser
  );
  return (
    <div className="cols_4">
      {modules?.map((module, index) => (
        <ModuleItem key={index} module={module} />
      ))}
    </div>
  );
});
