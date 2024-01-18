import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';
import { observer } from 'mobx-react';
import { Skeleton } from '@mui/material';
import { PageIcon } from '@ui/layout/page/pageIcon';

export const Title = observer(() => {
  const { data, isDataLoading, hasChanges, hasData } = useUserItemStore();
  const displayName = data?.username || 'New user';
  return (
    <Stack direction="row" spacing={2}>
      <PageIcon>
        <PersonIcon color={hasChanges || !hasData ? 'error' : 'primary'} />
      </PageIcon>
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
