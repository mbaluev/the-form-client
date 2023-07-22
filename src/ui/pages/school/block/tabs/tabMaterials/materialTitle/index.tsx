import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IMaterialUserViewModel } from '@viewModel/modules/entities/material/user/interface';
import { IconMaterial } from '@ui/components/icons/iconMaterial';

export const MaterialTitle = observer(() => {
  const { data: userMaterial } = useViewModel<IMaterialUserViewModel>(
    VIEW_MODEL.MaterialUser
  );
  const name = userMaterial?.material?.document?.name;
  return (
    <Stack direction="row" spacing="10px">
      <IconMaterial userMaterial={userMaterial} style={{ marginTop: '4px' }} />
      {name && <div>{name}</div>}
    </Stack>
  );
});
