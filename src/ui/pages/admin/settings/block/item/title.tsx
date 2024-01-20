import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { observer } from 'mobx-react';
import { Skeleton } from '@mui/material';
import { PageIcon } from '@ui/layout/page/pageIcon';
import { useBlockItemStore } from '@store/modules/entities/block/item/useBlockItemStore';

export const Title = observer(() => {
  const { data, isDataLoading, hasChanges, hasData } = useBlockItemStore();
  const displayTitle = data?.title || 'New block';
  return (
    <Stack direction="row" spacing={2}>
      <PageIcon>
        <NewspaperIcon color={hasChanges || !hasData ? 'error' : 'primary'} />
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
