import * as React from 'react';
import { observer } from 'mobx-react';
import { Tag } from '@components/tag';
import { ROLES } from '@settings/roles';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import Stack from '@mui/material/Stack';

export const AccountRoles = observer(() => {
  const { roles } = useAuthStore();
  return (
    <Stack direction="row" spacing={2}>
      {roles?.includes(ROLES.USER) && <Tag tag={ROLES.USER} color="blue" />}
      {roles?.includes(ROLES.STUDENT) && <Tag tag={ROLES.STUDENT} color="green" />}
      {roles?.includes(ROLES.ADMIN) && <Tag tag={ROLES.ADMIN} color="red" />}
    </Stack>
  );
});
