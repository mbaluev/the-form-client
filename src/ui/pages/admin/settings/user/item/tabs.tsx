import { Tabs as MuiTabs } from '@theme/tabs';
import { ROUTES } from '@settings/routes';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';

export const Tabs = observer(() => {
  const router = useRouter();
  const isLoading = false;

  const active = router.query.slug?.[1] as string;
  const tabs = [
    {
      key: ROUTES.ADMIN_SETTINGS_USER.tabs.keys.general,
      label: ROUTES.ADMIN_SETTINGS_USER.tabs.labels.general,
      component: isLoading ? <TabSkeleton /> : <>general</>,
    },
    {
      key: ROUTES.ADMIN_SETTINGS_USER.tabs.keys.more,
      label: ROUTES.ADMIN_SETTINGS_USER.tabs.labels.more,
      component: isLoading ? <TabSkeleton /> : <>more</>,
    },
  ];
  const handleChange = async (value: string) => {
    const id = router.query.slug?.[0] as string;
    const slug = [id];
    if (value !== ROUTES.ADMIN_SETTINGS_USER.tabs.keys.general) slug.push(value);
    await router.push({ pathname: ROUTES.ADMIN_SETTINGS_USER.path, query: { slug } });
  };

  return <MuiTabs active={active} tabs={tabs} onChange={handleChange} padding />;
});
