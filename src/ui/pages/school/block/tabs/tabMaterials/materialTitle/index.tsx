import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IMaterialUserViewModel } from '@viewModel/modules/entities/material/user/interface';
import { getMaterialIcon } from '@ui/pages/school/block/tabs/tabMaterials/materialList/materialRendrer';

export const MaterialTitle = observer(() => {
  const { data } = useViewModel<IMaterialUserViewModel>(
    VIEW_MODEL.MaterialUser
  );
  const icon = getMaterialIcon(data?.complete, { marginTop: '4px' });
  const label = data ? <div>{data.document.name}</div> : undefined;
  return (
    <Stack direction="row" spacing="10px">
      {icon}
      {label}
    </Stack>
  );
});
