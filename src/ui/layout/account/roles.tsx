import { observer } from 'mobx-react';
import { ROLES } from '@settings/roles';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import Stack from '@mui/material/Stack';
import { Chip } from '@mui/material';

export const AccountRoles = observer(() => {
  const { roles } = useAuthStore();
  return (
    <Stack direction="row" spacing={2}>
      {roles?.includes(ROLES.USER) && <Chip label={ROLES.USER} color="primary" size="small" />}
      {roles?.includes(ROLES.STUDENT) && (
        <Chip label={ROLES.STUDENT} color="success" size="small" />
      )}
      {roles?.includes(ROLES.ADMIN) && <Chip label={ROLES.ADMIN} color="error" size="small" />}
    </Stack>
  );
});
