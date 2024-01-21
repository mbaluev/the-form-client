import { Tabs as MuiTabs } from '@theme/tabs';
import { ROUTES } from '@settings/routes';
import { useRouter } from 'next/router';
import { Details } from '@ui/pages/admin/settings/block/item/details';
import { useBlockItemStore } from '@store/modules/entities/block/item/useBlockItemStore';
import { observer } from 'mobx-react';

export const Tabs = observer(() => {
  const router = useRouter();
  const active = router.query.slug?.[1] as string;
  const { isSaveLoading } = useBlockItemStore();

  const tabs = [
    {
      key: ROUTES.ADMIN_SETTINGS_BLOCK.tabs.keys.details,
      label: ROUTES.ADMIN_SETTINGS_BLOCK.tabs.labels.details,
      component: <Details />,
    },
    {
      key: ROUTES.ADMIN_SETTINGS_BLOCK.tabs.keys.materials,
      label: ROUTES.ADMIN_SETTINGS_BLOCK.tabs.labels.materials,
      component: <>materials</>,
    },
    {
      key: ROUTES.ADMIN_SETTINGS_BLOCK.tabs.keys.homework,
      label: ROUTES.ADMIN_SETTINGS_BLOCK.tabs.labels.homework,
      component: <>homework</>,
    },
    {
      key: ROUTES.ADMIN_SETTINGS_BLOCK.tabs.keys.test,
      label: ROUTES.ADMIN_SETTINGS_BLOCK.tabs.labels.test,
      component: <>test</>,
    },
  ];
  const handleChange = async (value: string) => {
    const id = router.query.slug?.[0] as string;
    const slug = [id];
    if (value !== ROUTES.ADMIN_SETTINGS_BLOCK.tabs.keys.details) slug.push(value);
    await router.push({ pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path, query: { slug } });
  };

  return (
    <MuiTabs active={active} tabs={tabs} onChange={handleChange} loading={isSaveLoading} padding />
  );
});
