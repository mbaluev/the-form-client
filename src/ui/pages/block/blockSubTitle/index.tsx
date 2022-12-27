import React from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { ModuleBlockStatus } from '@ui/pages/module/[id]/moduleBlockStatus';

export const BlockSubTitle = observer(() => {
  const { data: block } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);
  return (
    <React.Fragment>
      <ModuleBlockStatus block={block} />
      {block?.title}
    </React.Fragment>
  );
});
