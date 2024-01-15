/* eslint-disable sonarjs/no-duplicate-string */
import { observer } from 'mobx-react';
import { useUnsavedChanges } from '@hooks/useUnsavedChanges';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';
import { Form } from '@ui/pages/admin/settings/user/dialog/form';
import { Fragment } from 'react';

export const Content = observer(() => {
  const { hasModalChanges, saveModalData, clearModalChanges } = useUserItemStore();
  const { Prompt } = useUnsavedChanges(hasModalChanges);
  const saveHandler = async () => {
    await saveModalData();
  };
  const discardHandler = async () => {
    await clearModalChanges();
  };
  return (
    <Fragment>
      <Form />
      <Prompt onSave={saveHandler} onDiscard={discardHandler} />
    </Fragment>
  );
});
