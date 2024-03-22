import { ITabDTO, Tabs as MuiTabs } from '@theme/tabs';
import { ROUTES } from '@settings/routes';
import { useRouter } from 'next/router';
import { Details } from '@ui/pages/settings/module/item/details';
import { useModuleSettingsItemStore } from '@store/modules/settings/module/item/hook';
import { observer } from 'mobx-react';
import { BlocksList } from '@ui/pages/settings/module/item/blocks';

export const Tabs = observer(() => {
  const { isSaveLoading } = useModuleSettingsItemStore();

  const router = useRouter();
  const id = router.query.slug?.[0] as string;
  const active = router.query.slug?.[1] as string;

  const tabs: ITabDTO[] = [
    {
      key: ROUTES.SETTINGS_MODULE.tabs.keys.details,
      label: ROUTES.SETTINGS_MODULE.tabs.labels.details,
      component: <Details />,
      sxPanel: { overflow: 'auto' },
    },
    {
      key: ROUTES.SETTINGS_MODULE.tabs.keys.blocks,
      label: ROUTES.SETTINGS_MODULE.tabs.labels.blocks,
      component: <BlocksList />,
      sxPanel: { overflow: 'hidden', pb: 0 },
    },
  ];
  const handleChange = async (value: string) => {
    const slug = [id];
    if (value !== ROUTES.SETTINGS_MODULE.tabs.keys.details) slug.push(value);
    await router.push({
      pathname: ROUTES.SETTINGS_MODULE.path,
      query: { ...router.query, slug },
    });
  };

  return (
    <MuiTabs active={active} tabs={tabs} onChange={handleChange} loading={isSaveLoading} padding />
  );
});
