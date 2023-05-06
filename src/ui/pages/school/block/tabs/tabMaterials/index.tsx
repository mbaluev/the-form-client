import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';
import { IMaterialUserViewModel } from '@viewModel/modules/material/user/interface';
import { Loader } from '@components/loader';
import { MaterialList } from '@ui/pages/school/block/tabs/tabMaterials/materialList';

export const TabMaterials = observer(() => {
  const { data: block } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  const { isListLoading, getList, clearList } =
    useViewModel<IMaterialUserViewModel>(VIEW_MODEL.MaterialUser);

  useEffect(() => {
    if (block) getList();
    return () => {
      clearList();
    };
  }, [block]);

  if (isListLoading) return <Loader loading={true} />;

  return <MaterialList />;
});
