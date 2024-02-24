/* eslint-disable sonarjs/no-duplicate-string */
import { observer } from 'mobx-react';
import { useUnsavedChanges } from '@hooks/useUnsavedChanges';
import { useUserSettingsItemStore } from '@store/modules/settings/user/settings/item/hook';
import { Form } from '@ui/pages/_/dialog/form';
import { Fragment } from 'react';

export const Content = observer(() => {
  const { hasModalChanges, saveModalData, clearModalChanges } = useUserSettingsItemStore();
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
