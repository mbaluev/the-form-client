import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@theme/tooltip';
import PersonIcon from '@mui/icons-material/Person';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';

export const Title = () => {
  const { data } = useUserItemStore();
  return (
    <Stack direction="row" spacing={2}>
      <Tooltip title="tooltip">
        <PersonIcon color="error" sx={{ marginTop: '3px !important' }} />
      </Tooltip>
      <Typography sx={{ fontSize: '1.3rem', fontWeight: 600 }}>{data?.username}</Typography>
    </Stack>
  );
};
