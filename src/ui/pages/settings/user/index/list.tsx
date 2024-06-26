import { observer } from 'mobx-react';
import { List } from '@ui/layout/list/list';
import { Filter } from '@ui/layout/list/filter';
import { Toolbar } from '@ui/layout/list/toolbar';
import { Stack, useTheme } from '@mui/material';
import { useUserSettingsListStore } from '@store/modules/settings/user/list/hook';
import { IUserDTO } from '@model/entities/user';
import { Item } from '@ui/pages/settings/user/index/item';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';
import { useEffect } from 'react';

export const UsersList = observer(() => {
  const dataModel = useUserSettingsListStore();
  const router = useRouter();
  const theme = useTheme();

  const handleClick = async (id: string) => {
    await router.push({
      pathname: ROUTES.SETTINGS_USER.path,
      query: { slug: [id] },
    });
  };
  const handleCreate = async () => {
    await router.push({
      pathname: ROUTES.SETTINGS_USER_CREATE.path,
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
          itemRenderer={(item: IUserDTO) => <Item item={item} />}
          rowStyleGetter={(item: IUserDTO) => {
            if (router.pathname === ROUTES.SETTINGS_USER.path) {
              const id = router.query.id as string;
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
