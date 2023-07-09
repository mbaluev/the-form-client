import React from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { ModuleItemStatus } from '@ui/pages/school/module/index/moduleItemStatus';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';

export const ModuleSubTitle = observer(() => {
  const { data: userModule } = useViewModel<IModuleUserViewModel>(
    VIEW_MODEL.ModuleUser
  );
  return (
    <React.Fragment>
      <ModuleItemStatus userModule={userModule} />
      {userModule?.module?.title}
    </React.Fragment>
  );
});
