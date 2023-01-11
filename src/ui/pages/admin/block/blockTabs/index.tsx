import React, { useState } from 'react';
import { ITabItemProps, Tabs } from '@components/tab';
import { useViewModel } from '@hooks/useViewModel';
import { INotifyViewModel } from '@viewModel/modules/notify/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { useUnsavedChanges } from '@hooks/useUnsavedChanges';
import { observer } from 'mobx-react';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { TabDetails } from '@ui/pages/admin/block/tabs/tabDetails';
import { TabMaterials } from '@ui/pages/admin/block/tabs/tabMaterials';
import { TabTest } from '@ui/pages/admin/block/tabs/tabTest';
import { TabHomework } from '@ui/pages/admin/block/tabs/tabHomework';

enum ProfileTabNames {
  details = 'details',
  materials = 'materials',
  test = 'test',
  homework = 'homework',
}

const BLOCK_TAB_CONFIG: ITabItemProps[] = [
  {
    label: 'Details',
    value: ProfileTabNames.details,
    content: <TabDetails />,
  },
  {
    label: 'Materials',
    value: ProfileTabNames.materials,
    content: <TabMaterials />,
    padding: false,
  },
  {
    label: 'Test',
    value: ProfileTabNames.test,
    content: <TabTest />,
    padding: false,
  },
  {
    label: 'Homework',
    value: ProfileTabNames.homework,
    content: <TabHomework />,
  },
];

export const BlockTabs = observer(() => {
  const [active, setActive] = useState<string>(ProfileTabNames.details);
  const onChangeTab = (_: React.ChangeEvent<unknown>, value: string) => {
    setActive(value);
  };

  const { hasChanges, saveData, clearChanges, hasErrors } =
    useViewModel<IBlockViewModel>(VIEW_MODEL.Block);

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
        tabs={BLOCK_TAB_CONFIG}
        activeTab={active}
        onChangeTab={onChangeTab}
      />
      <Prompt
        onSave={saveHandler}
        onDiscard={discardHandler}
        disabled={hasErrors}
      />
    </React.Fragment>
  );
});
