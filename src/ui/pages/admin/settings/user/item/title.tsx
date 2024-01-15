import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';
import { observer } from 'mobx-react';
import { Skeleton } from '@mui/material';

export const Title = observer(() => {
  const { data, isDataLoading } = useUserItemStore();
  const username = data?.username || 'New user';
  return (
    <Stack direction="row" spacing={2}>
      <PersonIcon color="error" sx={{ marginTop: '3px !important' }} />
      {isDataLoading ? (
        <Skeleton width={100} />
      ) : (
        <Typography sx={{ fontSize: '1.3rem', fontWeight: 600 }}>{username}</Typography>
      )}
    </Stack>
  );
});
