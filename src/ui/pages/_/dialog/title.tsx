/* eslint-disable sonarjs/no-duplicate-string */
import { Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';

export const Title = observer(() => {
  const { modalData } = useUserItemStore();
  const displayName = modalData?.username ? modalData.username : 'New user';
  return (
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <Typography fontWeight={600} fontSize="1.1rem">
        {displayName}
      </Typography>
    </Stack>
  );
});
