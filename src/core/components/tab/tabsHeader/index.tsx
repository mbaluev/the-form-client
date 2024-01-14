import React from 'react';
import { AppBar, Divider, Tab as MuiTab, Tabs as MuiTabs } from '@mui/material';
import { ITabsProps } from '@components/tab';
import './index.scss';
import { classNames } from '@utils/classNames';

export const TabsHeader = (props: ITabsProps) => {
  const { onChangeTab, tabs, activeTab, scrollable, orientation = 'horizontal' } = props;

  const cls = classNames('tabs__header', {
    [`tabs__header_${orientation}`]: Boolean(orientation),
  });

  return (
    <div className={cls}>
      <AppBar position="static" color="transparent">
        <MuiTabs
          value={activeTab}
          onChange={onChangeTab}
          variant="scrollable"
          scrollButtons={scrollable}
          allowScrollButtonsMobile={scrollable}
          orientation={orientation}
        >
          {tabs?.map((tab) => {
            return tab.hide ? null : (
              <MuiTab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                disabled={tab.disabled}
                className="tabs__header-item"
              />
            );
          })}
        </MuiTabs>
        <Divider orientation={orientation} />
      </AppBar>
    </div>
  );
};
