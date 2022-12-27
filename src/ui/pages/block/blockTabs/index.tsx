import React, { useState } from 'react';
import { Tabs } from '@components/tab';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { BlockTabsLabel } from '@ui/pages/block/blockTabsLabel';
import { BlockTabsContent } from '@ui/pages/block/blockTabsContent';

export const BlockTabs = observer(() => {
  const { data: block } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);

  const [active, setActive] = useState<string>(block?.tabs[0].value || '');

  const onChangeTab = (_: React.ChangeEvent<unknown>, value: string) => {
    setActive(value);
  };

  const tabs = block?.tabs.map((tab) => {
    return {
      value: tab.value,
      label: <BlockTabsLabel tab={tab} />,
      content: <BlockTabsContent tab={tab} />,
    };
  });

  return (
    <Tabs
      tabs={tabs}
      activeTab={active}
      onChangeTab={onChangeTab}
      orientation="horizontal"
    />
  );
});
