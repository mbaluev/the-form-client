import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SchoolIcon from '@mui/icons-material/School';
import { observer } from 'mobx-react';
import { PageIcon } from '@ui/layout/page/pageIcon';
import { useFormContext, useWatch } from 'react-hook-form';
import { IModuleDTO } from '@model/entities/module';

export const Title = observer(() => {
  const {
    control,
    formState: { isDirty },
  } = useFormContext<IModuleDTO>();
  const title = useWatch({ control, name: 'title' }) || 'New module';

  return (
    <Stack direction="row" spacing={2}>
      <PageIcon>
        <SchoolIcon color={isDirty ? 'error' : 'primary'} />
      </PageIcon>
      <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '24px' }}>
        {title}
      </Typography>
    </Stack>
  );
});
