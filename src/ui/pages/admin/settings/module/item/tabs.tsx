import { ITabDTO, Tabs as MuiTabs } from '@theme/tabs';
import { ROUTES } from '@settings/routes';
import { useRouter } from 'next/router';
import { Details } from '@ui/pages/admin/settings/module/item/details';
import { useModuleItemStore } from '@store/modules/entities/module/item/useModuleItemStore';
import { observer } from 'mobx-react';
import { BlocksList } from '@ui/pages/admin/settings/module/item/blocks';

export const Tabs = observer(() => {
  const { isSaveLoading } = useModuleItemStore();

  const router = useRouter();
  const id = router.query.slug?.[0] as string;
  const active = router.query.slug?.[1] as string;

  const tabs: ITabDTO[] = [
    {
      key: ROUTES.ADMIN_SETTINGS_MODULE.tabs.keys.details,
      label: ROUTES.ADMIN_SETTINGS_MODULE.tabs.labels.details,
      component: <Details />,
      sxPanel: { overflow: 'auto' },
    },
    {
      key: ROUTES.ADMIN_SETTINGS_MODULE.tabs.keys.blocks,
      label: ROUTES.ADMIN_SETTINGS_MODULE.tabs.labels.blocks,
      component: <BlocksList />,
      sxPanel: { overflow: 'hidden', pb: 0 },
    },
  ];
  const handleChange = async (value: string) => {
    const slug = [id];
    if (value !== ROUTES.ADMIN_SETTINGS_MODULE.tabs.keys.details) slug.push(value);
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_MODULE.path,
      query: { ...router.query, slug },
    });
  };

  return (
    <MuiTabs active={active} tabs={tabs} onChange={handleChange} loading={isSaveLoading} padding />
  );
});
