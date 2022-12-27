import React from 'react';
import { TabsHeader, TabsPanels } from '@components/tab';
import { classNames } from '@utils/classNames';
import './index.scss';

export interface ITabItemProps {
  value: string;
  label: string | JSX.Element;
  hide?: boolean;
  disabled?: boolean;
  className?: string;
  content?: any;
  padding?: boolean;
}
export interface ITabsProps {
  className?: string;
  onChangeTab: (_: React.ChangeEvent<unknown>, newValue: string) => void;
  tabs?: ITabItemProps[];
  activeTab: string;
  scrollable?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export const Tabs = (props: ITabsProps) => {
  const { className, orientation } = props;
  const cls = classNames('tabs', className, {
    [`tabs_${orientation}`]: Boolean(orientation),
  });
  return (
    <div className={cls}>
      <TabsHeader {...props} />
      <TabsPanels {...props} />
    </div>
  );
};
