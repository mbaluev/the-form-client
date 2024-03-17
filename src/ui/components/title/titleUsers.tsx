import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IconUsers } from '@ui/components/icon/iconUsers';
import { ROUTES } from '@settings/routes';

export const TitleUsers = observer(() => {
  return (
    <Stack direction="row" spacing={2}>
      <IconUsers />
      <div>{ROUTES.ADMIN_PROGRESS_USERS.name}</div>
    </Stack>
  );
});
