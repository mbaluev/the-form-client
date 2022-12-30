import React, { useState } from 'react';
import { ITabItemProps, Tabs } from '@components/tab';
import { ProfileLocale } from '@ui/pages/account/profile/profileLocale';

enum TabNames {
  locale = 'locale',
}

const TAB_CONFIG: ITabItemProps[] = [
  {
    label: 'Locale',
    value: TabNames.locale,
    content: <ProfileLocale />,
  },
];

export const ProfileTabs = () => {
  const [active, setActive] = useState<string>(TabNames.locale);

  const onChangeTab = (_: React.ChangeEvent<unknown>, value: string) => {
    setActive(value);
  };

  return (
    <Tabs tabs={TAB_CONFIG} activeTab={active} onChangeTab={onChangeTab} />
  );
};
