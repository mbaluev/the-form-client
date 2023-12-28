import { Tabs as MuiTabs } from '@theme/tabs';
import { ROUTES } from '@settings/routes';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';
import { UsersList } from '@ui/pages/admin/settings/user/index/list';
import { Form } from '@ui/pages/admin/settings/user/item/form';

export const Tabs = observer(() => {
  const router = useRouter();
  const isLoading = false;

  const active = router.query.slug?.[1] as string;
  const tabs = [
    {
      key: ROUTES.ADMIN_SETTINGS_USER.tabs.keys.general,
      label: ROUTES.ADMIN_SETTINGS_USER.tabs.labels.general,
      component: isLoading ? <TabSkeleton /> : <Form />,
    },
    {
      key: ROUTES.ADMIN_SETTINGS_USER.tabs.keys.users,
      label: ROUTES.ADMIN_SETTINGS_USER.tabs.labels.users,
      component: isLoading ? <TabSkeleton /> : <UsersList />,
      sxPanel: { overflow: 'hidden', pb: 0 },
    },
  ];
  const handleChange = async (value: string) => {
    const id = router.query.slug?.[0] as string;
    const slug = [id];
    if (value !== ROUTES.ADMIN_SETTINGS_USER.tabs.keys.general) slug.push(value);
    const query = router.query || {};
    query.slug = slug;
    await router.push({ pathname: ROUTES.ADMIN_SETTINGS_USER.path, query });
  };

  return <MuiTabs active={active} tabs={tabs} onChange={handleChange} padding />;
});
