import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SchoolIcon from '@mui/icons-material/School';
import { observer } from 'mobx-react';
import { Skeleton } from '@mui/material';
import { useModuleItemStore } from '@store/modules/entities/module/item/useModuleItemStore';
import { PageIcon } from '@ui/layout/page/pageIcon';

export const Title = observer(() => {
  const { data, isDataLoading, hasChanges, hasData } = useModuleItemStore();
  const displayTitle = data?.title || 'New module';
  return (
    <Stack direction="row" spacing={2}>
      <PageIcon>
        <SchoolIcon color={hasChanges || !hasData ? 'error' : 'primary'} />
      </PageIcon>
      {isDataLoading ? (
        <Skeleton width={100} />
      ) : (
        <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '24px' }}>
          {displayTitle}
        </Typography>
      )}
    </Stack>
  );
});
