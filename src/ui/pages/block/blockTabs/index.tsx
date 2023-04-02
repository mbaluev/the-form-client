import React, { useState } from 'react';
import { Tabs } from '@components/tab';
import { observer } from 'mobx-react';
import { TabMaterials } from '@ui/pages/block/tabs/tabMaterials';
import { TabTest } from '@ui/pages/block/tabs/tabTest';
import { TabHomework } from '@ui/pages/block/tabs/tabHomework';
import { BlockTabsLabel } from '@ui/pages/block/blockTabsLabel';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';

export const BlockTabs = observer(() => {
  const { data: block } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );

  const [active, setActive] = useState<string>('materials');

  const onChangeTab = (_: React.ChangeEvent<unknown>, value: string) => {
    setActive(value);
  };

  const tabs = [
    {
      value: 'materials',
      label: (
        <BlockTabsLabel label="Materials" complete={block?.completeMaterials} />
      ),
      content: <TabMaterials />,
      padding: false,
    },
    {
      value: 'test',
      label: (
        <BlockTabsLabel label="Test" complete={block?.completeQuestions} />
      ),
      content: <TabTest />,
    },
    {
      value: 'homework',
      label: (
        <BlockTabsLabel label="Homework" complete={block?.completeTasks} />
      ),
      content: <TabHomework />,
    },
  ];

  return (
    <Tabs
      tabs={tabs}
      activeTab={active}
      onChangeTab={onChangeTab}
      orientation="horizontal"
    />
  );
});
