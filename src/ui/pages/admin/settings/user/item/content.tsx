import { observer } from 'mobx-react';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';
import { Form } from '@ui/pages/admin/settings/user/item/form';
import { Box } from '@mui/material';

export const Content = observer(() => {
  const { isDataLoading } = useUserItemStore();
  return (
    <Box paddingLeft={3} paddingRight={3} overflow="auto">
      {isDataLoading ? <TabSkeleton /> : <Form />}
    </Box>
  );
});
