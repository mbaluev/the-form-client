import React from 'react';
import { TabDetails } from '@ui/pages/admin/settings/user/tabs/tabDetails';
import { useViewModel } from '@hooks/useViewModel';
import { INotifyViewModel } from '@viewModel/modules/common/notify/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { useUnsavedChanges } from '@hooks/useUnsavedChanges';
import { observer } from 'mobx-react';
import { IUserViewModel } from '@viewModel/modules/entities/user/interface';

export const UserTabs = observer(() => {
  const { hasChanges, saveData, clearChanges } = useViewModel<IUserViewModel>(
    VIEW_MODEL.User
  );
  const { add: addNotify } = useViewModel<INotifyViewModel>(VIEW_MODEL.Notify);
  const { Prompt } = useUnsavedChanges(hasChanges);
  const saveHandler = async () => {
    await saveData();
    addNotify('success', 'Changes Successfully saved');
  };
  const discardHandler = async () => {
    await clearChanges();
    addNotify('info', 'Changes discarded');
  };

  return (
    <React.Fragment>
      <TabDetails />
      <Prompt onSave={saveHandler} onDiscard={discardHandler} />
    </React.Fragment>
  );
});
