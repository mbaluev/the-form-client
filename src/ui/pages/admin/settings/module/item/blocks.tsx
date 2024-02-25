import { observer } from 'mobx-react';
import { List } from '@ui/layout/list/list';
import { Filter } from '@ui/layout/list/filter';
import { Toolbar } from '@ui/layout/list/toolbar';
import { Stack, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';
import { IBlockDTO } from '@model/entities/block';
import { useBlockSettingsListStore } from '@store/modules/settings/block/list/hook';
import { Item } from '@ui/pages/admin/settings/block/index/item';
import { useEffect } from 'react';
import { ParsedUrlQuery } from 'querystring';

export const BlocksList = observer(() => {
  const dataModel = useBlockSettingsListStore();
  const router = useRouter();
  const theme = useTheme();
  const moduleId = router.query.slug?.[0] as string;

  const handleClick = async (id: string) => {
    const query: ParsedUrlQuery = { slug: [id], moduleId };
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path,
      query,
    });
  };
  const handleCreate = async () => {
    const query: ParsedUrlQuery = { moduleId };
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_BLOCK_CREATE.path,
      query,
    });
  };

  useEffect(() => {
    dataModel.getData({ moduleId });
  }, [moduleId]);

  return (
    <Stack spacing={2} height="100%">
      <Stack spacing={2}>
        <Filter dataModel={dataModel} padding />
        <Toolbar dataModel={dataModel} padding handleCreate={handleCreate} query={{ moduleId }} />
      </Stack>
      <Stack flexGrow={1} overflow="hidden">
        <List
          dataModel={dataModel}
          itemRenderer={(item: IBlockDTO) => <Item item={item} />}
          rowStyleGetter={(item: IBlockDTO) => {
            if (router.pathname === ROUTES.ADMIN_SETTINGS_BLOCK.path) {
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
