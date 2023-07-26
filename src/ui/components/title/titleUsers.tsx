import React from 'react';
import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { IconUsers } from '@ui/components/icon/iconUsers';

export const TitleUsers = observer(() => {
  return (
    <Stack direction="row" spacing={2}>
      <IconUsers style={{ marginTop: '5px' }} />
      <div>{ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_USERS.name}</div>
    </Stack>
  );
});
