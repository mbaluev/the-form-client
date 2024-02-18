import { ITabDTO, Tabs as MuiTabs } from '@theme/tabs';
import { ROUTES } from '@settings/routes';
import { useRouter } from 'next/router';
import { Details } from '@ui/pages/admin/settings/block/item/details';
import { useBlockItemStore } from '@store/modules/entities/block/item/useBlockItemStore';
import { observer } from 'mobx-react';
import { MaterialsList } from '@ui/pages/admin/settings/block/item/materials/list';

export const Tabs = observer(() => {
  const { isSaveLoading } = useBlockItemStore();

  const router = useRouter();
  const id = router.query.slug?.[0] as string;
  const active = router.query.slug?.[1] as string;

  const tabs: ITabDTO[] = [
    {
      key: ROUTES.ADMIN_SETTINGS_BLOCK.tabs.keys.details,
      label: ROUTES.ADMIN_SETTINGS_BLOCK.tabs.labels.details,
      component: <Details />,
      sxPanel: { overflow: 'auto' },
    },
    {
      key: ROUTES.ADMIN_SETTINGS_BLOCK.tabs.keys.materials,
      label: ROUTES.ADMIN_SETTINGS_BLOCK.tabs.labels.materials,
      component: <MaterialsList />,
      sxPanel: { overflow: 'hidden', pb: 0 },
    },
    {
      key: ROUTES.ADMIN_SETTINGS_BLOCK.tabs.keys.homework,
      label: ROUTES.ADMIN_SETTINGS_BLOCK.tabs.labels.homework,
      component: <>homework</>,
      sxPanel: { overflow: 'hidden', pb: 0 },
    },
    {
      key: ROUTES.ADMIN_SETTINGS_BLOCK.tabs.keys.test,
      label: ROUTES.ADMIN_SETTINGS_BLOCK.tabs.labels.test,
      component: <>test</>,
      sxPanel: { overflow: 'hidden', pb: 0 },
    },
  ];
  const handleChange = async (value: string) => {
    const slug = [id];
    if (value !== ROUTES.ADMIN_SETTINGS_BLOCK.tabs.keys.details) slug.push(value);
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path,
      query: { ...router.query, slug },
    });
  };

  return (
    <MuiTabs active={active} tabs={tabs} onChange={handleChange} loading={isSaveLoading} padding />
  );
});
