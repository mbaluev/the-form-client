import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { IBlockViewModel } from '@viewModel/modules/entities/block/interface';

export const BlockLabel = observer(() => {
  const { data } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);
  const label = data ? `${data.title}. ${data.name}` : undefined;
  return <React.Fragment>{label}</React.Fragment>;
});
