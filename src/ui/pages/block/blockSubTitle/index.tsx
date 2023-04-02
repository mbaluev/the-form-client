import React from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { ModuleBlockStatus } from '@ui/pages/module/[id]/moduleBlockStatus';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';

export const BlockSubTitle = observer(() => {
  const { data: block } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  return (
    <React.Fragment>
      <ModuleBlockStatus block={block} />
      {block?.title}
    </React.Fragment>
  );
});
