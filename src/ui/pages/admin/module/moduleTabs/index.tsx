import React, { useState } from 'react';
import { ITabItemProps, Tabs } from '@components/tab';
import { TabDetails } from '@ui/pages/admin/module/tabs/tabDetails';
import { TabBlocks } from '@ui/pages/admin/module/tabs/tabBlocks';
import { useViewModel } from '@hooks/useViewModel';
import { INotifyViewModel } from '@viewModel/modules/notify/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { useUnsavedChanges } from '@hooks/useUnsavedChanges';
import { IModuleViewModel } from '@viewModel/modules/module/interface';
import { observer } from 'mobx-react';

enum ProfileTabNames {
  details = 'details',
  blocks = 'blocks',
}

const MODULE_TAB_CONFIG: ITabItemProps[] = [
  {
    label: 'Details',
    value: ProfileTabNames.details,
    content: <TabDetails />,
  },
  {
    label: 'Blocks',
    value: ProfileTabNames.blocks,
    content: <TabBlocks />,
    padding: false,
  },
];

export const ModuleTabs = observer(() => {
  const [active, setActive] = useState<string>(ProfileTabNames.details);

  const onChangeTab = (_: React.ChangeEvent<unknown>, value: string) => {
    setActive(value);
  };

  const { hasChanges, saveData, clearChanges } = useViewModel<IModuleViewModel>(
    VIEW_MODEL.Module
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
      <Tabs
        tabs={MODULE_TAB_CONFIG}
        activeTab={active}
        onChangeTab={onChangeTab}
      />
      <Prompt onSave={saveHandler} onDiscard={discardHandler} />
    </React.Fragment>
  );
});
