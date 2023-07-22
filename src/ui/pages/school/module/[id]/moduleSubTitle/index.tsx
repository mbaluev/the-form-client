import React from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';
import { StatusModule } from '@ui/components/statuses/statusModule';

export const ModuleSubTitle = observer(() => {
  const { data: userModule } = useViewModel<IModuleUserViewModel>(
    VIEW_MODEL.ModuleUser
  );
  return (
    <React.Fragment>
      <StatusModule userModule={userModule} />
      {userModule?.module?.title}
    </React.Fragment>
  );
});
