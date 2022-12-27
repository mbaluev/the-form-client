import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { IModuleViewModel } from '@viewModel/modules/module/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { ModuleItem } from '@ui/pages/module/index/moduleItem';

export const ModuleGrid = observer(() => {
  const { list: modules } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);
  return (
    <div className="cols_4">
      {modules?.map((module, index) => (
        <ModuleItem key={index} module={module} />
      ))}
    </div>
  );
});
