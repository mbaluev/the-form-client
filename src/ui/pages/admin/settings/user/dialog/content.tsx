/* eslint-disable sonarjs/no-duplicate-string */
import { observer } from 'mobx-react';
import { useUnsavedChanges } from '@hooks/useUnsavedChanges';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';
import { useNotifyStore } from '@store/modules/common/notify/useNotifyStore';
import { Form } from '@ui/pages/admin/settings/user/dialog/form';
import { Fragment } from 'react';

export const Content = observer(() => {
  const { hasModalChanges, saveModalData, clearModalChanges } = useUserItemStore();
  const { add: addNotify } = useNotifyStore();
  const { Prompt } = useUnsavedChanges(hasModalChanges);
  const saveHandler = async () => {
    await saveModalData();
    addNotify('Changes Successfully saved', 'success');
  };
  const discardHandler = async () => {
    await clearModalChanges();
    addNotify('Changes discarded', 'info');
  };
  return (
    <Fragment>
      <Form />
      <Prompt onSave={saveHandler} onDiscard={discardHandler} />
    </Fragment>
  );
});
