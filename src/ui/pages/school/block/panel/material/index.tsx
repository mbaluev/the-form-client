import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { SeparatorBase } from '@ui/layout/card/separator';

export const UserMaterial = observer(() => {
  return (
    <Stack spacing={2}>
      <SeparatorBase />
      <div>material</div>
    </Stack>
  );
});
