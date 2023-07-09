import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IMaterialUserViewModel } from '@viewModel/modules/entities/material/user/interface';
import { MaterialIcon } from '@ui/pages/school/block/tabs/tabMaterials/materialList/materialIcon';

export const MaterialTitle = observer(() => {
  const { data } = useViewModel<IMaterialUserViewModel>(
    VIEW_MODEL.MaterialUser
  );
  return (
    <Stack direction="row" spacing="10px">
      <MaterialIcon complete={data?.complete} style={{ marginTop: '4px' }} />
      {data ? <div>{data.material?.document?.name}</div> : undefined}
    </Stack>
  );
});
