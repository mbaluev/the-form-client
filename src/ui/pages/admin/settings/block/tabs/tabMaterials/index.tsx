import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IMaterialViewModel } from '@viewModel/modules/entities/material/interface';
import { IBlockViewModel } from '@viewModel/modules/entities/block/interface';
import { MaterialList } from '@ui/pages/admin/settings/block/tabs/tabMaterials/materialList';

export const TabMaterials = observer(() => {
  const { data: block } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);
  const { getList } = useViewModel<IMaterialViewModel>(VIEW_MODEL.Material);

  useEffect(() => {
    if (block) getList();
  }, [block]);

  return <MaterialList />;
});
