import { observer } from 'mobx-react';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';
import { Form } from '@ui/pages/admin/settings/module/item/form';
import { Box } from '@mui/material';
import { useModuleItemStore } from '@store/modules/entities/module/item/useModuleItemStore';

export const Content = observer(() => {
  const { isDataLoading } = useModuleItemStore();
  return (
    <Box paddingLeft={3} paddingRight={3} overflow="auto">
      {isDataLoading ? <TabSkeleton /> : <Form />}
    </Box>
  );
});
