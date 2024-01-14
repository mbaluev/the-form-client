import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IMaterialUserViewModel } from '@viewModel/modules/entities/material/user/interface';
import { MaterialList } from '@ui/pages/school/block/[id]/tabs/tabMaterials/materialList';

export const TabMaterials = observer(() => {
  const { getList } = useViewModel<IMaterialUserViewModel>(VIEW_MODEL.MaterialUser);

  useEffect(() => {
    getList();
  }, []);

  return <MaterialList />;
});
