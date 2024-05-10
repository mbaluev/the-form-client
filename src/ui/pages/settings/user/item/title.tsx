import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person';
import { PageIcon } from '@ui/layout/page/pageIcon';
import { useFormContext, useWatch } from 'react-hook-form';
import { IUserDTO } from '@model/entities/user';

export const Title = () => {
  const {
    control,
    formState: { isDirty },
  } = useFormContext<IUserDTO>();
  const username = useWatch({ control, name: 'username' }) || 'New user';

  return (
    <Stack direction="row" spacing={2}>
      <PageIcon>
        <PersonIcon color={isDirty ? 'error' : 'primary'} />
      </PageIcon>
      <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '24px' }}>
        {username}
      </Typography>
    </Stack>
  );
};
