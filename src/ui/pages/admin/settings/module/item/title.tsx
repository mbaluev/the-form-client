import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SchoolIcon from '@mui/icons-material/School';
import { observer } from 'mobx-react';
import { Skeleton } from '@mui/material';
import { useModuleItemStore } from '@store/modules/entities/module/item/useModuleItemStore';

export const Title = observer(() => {
  const { data, isDataLoading } = useModuleItemStore();
  const displayName = data?.name || 'New module';
  return (
    <Stack direction="row" spacing={2}>
      <SchoolIcon color="error" sx={{ marginTop: '3px !important' }} />
      {isDataLoading ? (
        <Skeleton width={100} />
      ) : (
        <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '24px' }}>
          {displayName}
        </Typography>
      )}
    </Stack>
  );
});
