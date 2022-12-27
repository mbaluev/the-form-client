import React from 'react';
import { ITabsProps, TabsPanel } from '@components/tab';

export const TabsPanels = (props: ITabsProps) => {
  const { tabs, activeTab } = props;
  return (
    <React.Fragment>
      {tabs?.map((tab) => {
        return tab.hide ? null : (
          <TabsPanel
            key={tab.value}
            active={tab.value === activeTab}
            className={tab.className}
            padding={tab.padding}
          >
            {tab.content}
          </TabsPanel>
        );
      })}
    </React.Fragment>
  );
};
