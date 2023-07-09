import React from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { ModuleBlockStatus } from '@ui/pages/school/module/[id]/moduleBlockStatus';
import { IBlockUserViewModel } from '@viewModel/modules/entities/block/user/interface';

export const BlockSubTitle = observer(() => {
  const { data: userBlock } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  return (
    <React.Fragment>
      <ModuleBlockStatus userModuleBlock={userBlock} />
      {userBlock?.block?.title}
    </React.Fragment>
  );
});
