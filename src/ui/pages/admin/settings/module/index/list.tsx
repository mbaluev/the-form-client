import { observer } from 'mobx-react';
import { List } from '@ui/layout/list/list';
import { Filter } from '@ui/layout/list/filter';
import { Toolbar } from '@ui/layout/list/toolbar';
import { Stack, useTheme } from '@mui/material';
import { Item } from '@ui/pages/admin/settings/module/index/item';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';
import { useModuleSettingsListStore } from '@store/modules/settings/module/list/hook';
import { IModuleDTO } from '@model/entities/module';
import { useEffect } from 'react';

export const ModulesList = observer(() => {
  const dataModel = useModuleSettingsListStore();
  const router = useRouter();
  const theme = useTheme();

  const handleClick = async (id: string) => {
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_MODULE.path,
      query: { slug: [id] },
    });
  };
  const handleCreate = async () => {
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_MODULE_CREATE.path,
    });
  };

  useEffect(() => {
    dataModel.getData();
  }, []);

  return (
    <Stack spacing={2} height="100%">
      <Stack spacing={2}>
        <Filter dataModel={dataModel} padding />
        <Toolbar dataModel={dataModel} padding handleCreate={handleCreate} />
      </Stack>
      <Stack flexGrow={1} overflow="hidden">
        <List
          dataModel={dataModel}
          itemRenderer={(item: IModuleDTO) => <Item item={item} />}
          rowStyleGetter={(item: IModuleDTO) => {
            if (router.pathname === ROUTES.ADMIN_SETTINGS_MODULE.path) {
              const id = router.query.slug?.[0] as string;
              if (item.id === id) return { backgroundColor: theme.palette.fGrey[10] };
            }
          }}
          handleClick={handleClick}
          estimateSize={38}
        />
      </Stack>
    </Stack>
  );
});
