import React from 'react';
import { Tabs } from '@components/tab';
import { observer } from 'mobx-react';
import { TabMaterials } from '@ui/pages/school/block/tabs/tabMaterials';
import { TabTest } from '@ui/pages/school/block/tabs/tabTest';
import { TabHomework } from '@ui/pages/school/block/tabs/tabHomework';
import { BlockTabsLabel } from '@ui/pages/school/block/blockTabsLabel';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';
import { TabTasks } from '@ui/pages/school/block/tabs/tabTasks';

export enum BlockTabNames {
  materials = 'materials',
  test = 'test',
  tasks = 'tests',
  homework = 'homework',
}

export const BlockTabs = observer(() => {
  const {
    data: block,
    tab,
    changeTab,
  } = useViewModel<IBlockUserViewModel>(VIEW_MODEL.BlockUser);

  const onChangeTab = (_: React.ChangeEvent<unknown>, value: string) => {
    changeTab(value as BlockTabNames);
  };

  const tabs = [
    {
      value: BlockTabNames.materials,
      label: (
        <BlockTabsLabel label="Materials" complete={block?.completeMaterials} />
      ),
      content: <TabMaterials />,
      padding: false,
    },
    {
      value: BlockTabNames.test,
      label: (
        <BlockTabsLabel label="Test" complete={block?.completeQuestions} />
      ),
      content: <TabTest />,
    },
    {
      value: BlockTabNames.tasks,
      label: <BlockTabsLabel label="Tasks" complete={block?.completeTasks} />,
      content: <TabTasks />,
      padding: false,
    },
    {
      value: BlockTabNames.homework,
      label: (
        <BlockTabsLabel label="Homework" complete={block?.completeTasks} />
      ),
      content: <TabHomework />,
    },
  ];

  return (
    <Tabs
      tabs={tabs}
      activeTab={tab}
      onChangeTab={onChangeTab}
      orientation="horizontal"
    />
  );
});
