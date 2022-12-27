import React from 'react';
import { classNames } from '@utils/classNames';
import './index.scss';

export interface ITabPanelProps {
  active: boolean;
  className?: string;
  children?: React.ReactNode;
  padding?: boolean;
}

export const TabsPanel = (props: ITabPanelProps) => {
  const { children, active, className, padding } = props;

  const cls = classNames('tabs__panel', className, {
    tabs__panel_active: Boolean(active),
    'tabs__panel_no-padding': padding === false,
  });

  return (
    <div className={cls} hidden={!active}>
      {active && children}
    </div>
  );
};
