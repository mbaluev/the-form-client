import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { ITabItemProps, Tabs } from '@components/tab';
import { TabDetails } from '@ui/pages/school/block/tabs/tabTasks/taskCardTabs/tabDetails';
import { TabHistory } from '@ui/pages/school/block/tabs/tabTasks/taskCardTabs/tabHistory';

export enum TaskCardTabNames {
  details = 'details',
  history = 'history',
}

const TASK_CARD_TAB_CONFIG: ITabItemProps[] = [
  {
    label: 'Details',
    value: TaskCardTabNames.details,
    content: <TabDetails />,
  },
  {
    label: 'History',
    value: TaskCardTabNames.history,
    content: <TabHistory />,
    padding: false,
  },
];

export const TaskCardTabs = observer(() => {
  const [active, setActive] = useState<string>(TaskCardTabNames.details);
  const onChangeTab = (_: React.ChangeEvent<unknown>, value: string) => {
    setActive(value);
  };

  return (
    <React.Fragment>
      <Tabs
        tabs={TASK_CARD_TAB_CONFIG}
        activeTab={active}
        onChangeTab={onChangeTab}
      />
    </React.Fragment>
  );
});
