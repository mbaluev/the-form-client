import React, { useState } from 'react';
import { ITabItemProps, Tabs } from '@components/tab';
import { ProfileLocale } from '@ui/pages/account/profile/profileLocale';
import { ProfileAvatar } from '@ui/pages/account/profile/profileAvatar';

enum ProfileTabNames {
  avatar = 'avatar',
  locale = 'locale',
}

const PROFILE_TAB_CONFIG: ITabItemProps[] = [
  {
    label: 'Avatar',
    value: ProfileTabNames.avatar,
    content: <ProfileAvatar />,
  },
  {
    label: 'Locale',
    value: ProfileTabNames.locale,
    content: <ProfileLocale />,
  },
];

export const ProfileTabs = () => {
  const [active, setActive] = useState<string>(PROFILE_TAB_CONFIG[0].value);

  const onChangeTab = (_: React.ChangeEvent<unknown>, value: string) => {
    setActive(value);
  };

  return (
    <Tabs
      tabs={PROFILE_TAB_CONFIG}
      activeTab={active}
      onChangeTab={onChangeTab}
    />
  );
};
