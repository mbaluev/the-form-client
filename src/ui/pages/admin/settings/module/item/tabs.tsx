import { Tabs as MuiTabs } from '@theme/tabs';
import { ROUTES } from '@settings/routes';
import { useRouter } from 'next/router';
import { Content } from '@ui/pages/admin/settings/module/item/content';

export const Tabs = () => {
  const router = useRouter();
  const active = router.query.slug?.[1] as string;

  const tabs = [
    {
      key: ROUTES.ADMIN_SETTINGS_MODULE.tabs.keys.details,
      label: ROUTES.ADMIN_SETTINGS_MODULE.tabs.labels.details,
      component: <Content />,
    },
    {
      key: ROUTES.ADMIN_SETTINGS_MODULE.tabs.keys.blocks,
      label: ROUTES.ADMIN_SETTINGS_MODULE.tabs.labels.blocks,
      component: <>blocks</>,
    },
  ];
  const handleChange = async (value: string) => {
    const id = router.query.slug?.[0] as string;
    const slug = [id];
    if (value !== ROUTES.ADMIN_SETTINGS_MODULE.tabs.keys.details) slug.push(value);
    await router.push({ pathname: ROUTES.ADMIN_SETTINGS_MODULE.path, query: { slug } });
  };

  return <MuiTabs active={active} tabs={tabs} onChange={handleChange} padding />;
};
