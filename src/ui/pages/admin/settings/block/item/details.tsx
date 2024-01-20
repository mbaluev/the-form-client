import { observer } from 'mobx-react';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';
import { Box } from '@mui/material';
import { useBlockItemStore } from '@store/modules/entities/block/item/useBlockItemStore';
import { Form } from '@ui/pages/admin/settings/block/item/form';

export const Details = observer(() => {
  const { isDataLoading } = useBlockItemStore();
  return (
    <Box paddingLeft={3} paddingRight={3} overflow="auto">
      {isDataLoading ? <TabSkeleton /> : <Form />}
    </Box>
  );
});
