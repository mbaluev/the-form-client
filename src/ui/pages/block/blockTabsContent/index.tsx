import React from 'react';
import { IBlockTabDTO } from '@model/block';
import { TabMaterials } from '@ui/pages/block/tabs/tabMaterials';
import { TabTest } from '@ui/pages/block/tabs/tabTest';
import { TabHomework } from '@ui/pages/block/tabs/tabHomework';

interface IProps {
  tab: IBlockTabDTO;
}

export const BlockTabsContent = (props: IProps) => {
  const { tab } = props;
  if (tab.value === 'materials') return <TabMaterials />;
  if (tab.value === 'test') return <TabTest />;
  if (tab.value === 'homework') return <TabHomework />;
  return null;
};
