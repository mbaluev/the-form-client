import { observer } from 'mobx-react';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';
import { Form } from '@ui/pages/admin/settings/user/item/form';
import { Box } from '@mui/material';
import { useNotifyStore } from '@store/modules/common/notify/useNotifyStore';
import { useUnsavedChanges } from '@hooks/useUnsavedChanges';

export const Content = observer(() => {
  const { isDataLoading, hasChanges, saveData, clearChanges } = useUserItemStore();
  const { add: addNotify } = useNotifyStore();
  const { Prompt } = useUnsavedChanges(hasChanges);
  const saveHandler = async () => {
    await saveData();
    addNotify('Changes Successfully saved', 'success');
  };
  const discardHandler = async () => {
    await clearChanges();
    addNotify('Changes discarded', 'info');
  };

  return (
    <Box sx={{ pl: 3, pr: 3 }}>
      {isDataLoading ? <TabSkeleton /> : <Form />}
      <Prompt onSave={saveHandler} onDiscard={discardHandler} />
    </Box>
  );
});
