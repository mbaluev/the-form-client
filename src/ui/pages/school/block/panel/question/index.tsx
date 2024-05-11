import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { SeparatorBase } from '@ui/layout/card/separator';

export const UserQuestion = observer(() => {
  return (
    <Stack spacing={2}>
      <SeparatorBase />
      <div>question</div>
    </Stack>
  );
});
