import React from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { IModuleViewModel } from '@viewModel/modules/module/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { ModuleItemStatus } from '@ui/pages/module/index/moduleItemStatus';

export const ModuleSubTitle = observer(() => {
  const { data: module } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);
  return (
    <React.Fragment>
      <ModuleItemStatus module={module} />
      {module?.title}
    </React.Fragment>
  );
});
