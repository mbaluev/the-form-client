import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { observer } from 'mobx-react';
import { PageIcon } from '@ui/layout/page/pageIcon';
import { useFormContext, useWatch } from 'react-hook-form';
import { IModuleDTO } from '@model/entities/module';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export const Title = observer(() => {
  const {
    control,
    formState: { isDirty },
  } = useFormContext<IModuleDTO>();
  const title = useWatch({ control, name: 'title' }) || 'New block';

  return (
    <Stack direction="row" spacing={2}>
      <PageIcon>
        <BookmarkIcon color={isDirty ? 'error' : 'primary'} />
      </PageIcon>
      <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '24px' }}>
        {title}
      </Typography>
    </Stack>
  );
});
