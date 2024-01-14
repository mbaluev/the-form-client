import React, { useState } from 'react';
import { ITabItemProps, Tabs } from '@components/tab';
import { useViewModel } from '@hooks/useViewModel';
import { INotifyViewModel } from '@viewModel/modules/common/notify/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { useUnsavedChanges } from '@hooks/useUnsavedChanges';
import { observer } from 'mobx-react';
import { IBlockViewModel } from '@viewModel/modules/entities/block/interface';
import { TabDetails } from '@ui/pages/admin/settings/block/tabs/tabDetails';
import { TabMaterials } from '@ui/pages/admin/settings/block/tabs/tabMaterials';
import { TabQuestions } from '@ui/pages/admin/settings/block/tabs/tabQuestions';
import { TabTasks } from '@ui/pages/admin/settings/block/tabs/tabTasks';

enum TabNames {
  details = 'details',
  materials = 'materials',
  tasks = 'tasks',
  questions = 'questions',
}

const BLOCK_TAB_CONFIG: ITabItemProps[] = [
  {
    label: 'Details',
    value: TabNames.details,
    content: <TabDetails />,
  },
  {
    label: 'Materials',
    value: TabNames.materials,
    content: <TabMaterials />,
    padding: false,
  },
  {
    label: 'Homework',
    value: TabNames.tasks,
    content: <TabTasks />,
    padding: false,
  },
  {
    label: 'Test',
    value: TabNames.questions,
    content: <TabQuestions />,
    padding: false,
  },
];

export const BlockTabs = observer(() => {
  const [active, setActive] = useState<string>(TabNames.details);
  const onChangeTab = (_: React.ChangeEvent<unknown>, value: string) => {
    setActive(value);
  };

  const { hasChanges, saveData, clearChanges, hasErrors } = useViewModel<IBlockViewModel>(
    VIEW_MODEL.Block
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
      <Tabs tabs={BLOCK_TAB_CONFIG} activeTab={active} onChangeTab={onChangeTab} />
      <Prompt onSave={saveHandler} onDiscard={discardHandler} disabled={hasErrors} />
    </React.Fragment>
  );
});
