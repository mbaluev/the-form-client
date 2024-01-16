import { Chip, Stack } from '@mui/material';
import { observer } from 'mobx-react';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';

export const SubTitle = observer(() => {
  const { data } = useUserItemStore();
  if (!data) return null;
  return (
    <Stack direction="row" spacing={2}>
      {data.active && <Chip label="active" color="primary" size="small" />}
      {data.paid && <Chip label="paid" color="success" size="small" />}
      {data.admin && <Chip label="admin" color="error" size="small" />}
    </Stack>
  );
});
