import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { IMaterialViewModel } from '@viewModel/modules/material/interface';
import { MaterialList } from '@ui/pages/block/tabs/tabMaterials/materialList';

export const TabMaterials = observer(() => {
  const { data: block } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);
  const { getListUser } = useViewModel<IMaterialViewModel>(VIEW_MODEL.Material);

  useEffect(() => {
    if (block) getListUser();
  }, [block]);

  return <MaterialList />;
});
