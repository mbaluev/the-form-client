import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { MaterialList } from '@ui/pages/admin/settings/userBlock/[id]/tabs/tabMaterials/materialList';
import { IMaterialAdminViewModel } from '@viewModel/modules/entities/material/admin/interface';

export const TabMaterials = observer(() => {
  const { getList } = useViewModel<IMaterialAdminViewModel>(
    VIEW_MODEL.MaterialAdmin
  );

  useEffect(() => {
    getList();
  }, []);

  return <MaterialList />;
});
