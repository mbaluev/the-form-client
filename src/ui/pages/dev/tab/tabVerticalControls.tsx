import React, { useState } from 'react';
import { ITabItemProps, Tabs } from '@components/tab';

enum TabNames {
  description = 'description',
  compatible = 'compatible',
  warranty = 'warranty',
  reviews = 'reviews',
  compare = 'compare',
}
const TAB_CONFIG: ITabItemProps[] = [
  {
    label: 'Product description',
    value: TabNames.description,
    content: TabNames.description,
  },
  {
    label: 'Compatible Products',
    value: TabNames.compatible,
    content: TabNames.compatible,
  },
  {
    label: 'Returns & warranty',
    value: TabNames.warranty,
    content: TabNames.warranty,
  },
  {
    label: 'Reviews & testimonials',
    value: TabNames.reviews,
    content: TabNames.reviews,
  },
  {
    label: 'Compare',
    value: TabNames.compare,
    content: TabNames.compare,
  },
];

export const TabVerticalControls = () => {
  const [active, setActive] = useState<string>(TAB_CONFIG[0].value);

  const onChangeTab = (_: React.ChangeEvent<unknown>, value: string) => {
    setActive(value);
  };

  return (
    <Tabs
      tabs={TAB_CONFIG}
      activeTab={active}
      onChangeTab={onChangeTab}
      orientation="vertical"
    />
  );
};
