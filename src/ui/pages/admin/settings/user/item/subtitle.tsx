import { Chip, Stack } from '@mui/material';
import { observer } from 'mobx-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { IUserDTO } from '@model/entities/user';

export const SubTitle = observer(() => {
  const { control } = useFormContext<IUserDTO>();
  const active = useWatch({ control, name: 'active' });
  const paid = useWatch({ control, name: 'paid' });
  const admin = useWatch({ control, name: 'admin' });
  if (!active && !paid && !admin) return <Chip label="new" color="default" size="small" />;
  return (
    <Stack direction="row" spacing={2}>
      {active && <Chip label="active" color="primary" size="small" />}
      {paid && <Chip label="paid" color="success" size="small" />}
      {admin && <Chip label="admin" color="error" size="small" />}
    </Stack>
  );
});
