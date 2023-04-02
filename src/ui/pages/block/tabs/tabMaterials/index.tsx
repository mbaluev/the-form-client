import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { MaterialList } from '@ui/pages/block/tabs/tabMaterials/materialList';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';
import { IMaterialUserViewModel } from '@viewModel/modules/material/user/interface';

export const TabMaterials = observer(() => {
  const { data: block } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  const { getList } = useViewModel<IMaterialUserViewModel>(
    VIEW_MODEL.MaterialUser
  );

  useEffect(() => {
    if (block) getList();
  }, [block]);

  return <MaterialList />;
});
