import { observer } from 'mobx-react';
import { List } from '@ui/layout/list/list';
import { Filter } from '@ui/layout/list/filter';
import { Toolbar } from '@ui/layout/list/toolbar';
import { Stack, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';
import { IBlockDTO } from '@model/entities/block';
import { useBlockListStore } from '@store/modules/entities/block/list/useBlockListStore';
import { Item } from '@ui/pages/admin/settings/block/index/item';
import { ParsedUrlQuery } from 'querystring';

interface IProps {
  query?: ParsedUrlQuery;
}

export const BlocksList = observer((props: IProps) => {
  const { query } = props;
  const dataModel = useBlockListStore();
  const router = useRouter();
  const theme = useTheme();
  const handleClick = async (id: string) => {
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path,
      query: { slug: [id] },
    });
  };
  const handleCreate = async () => {
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path,
      query: { slug: [ROUTES.ADMIN_SETTINGS_BLOCK.tabs.keys.create] },
    });
  };
  return (
    <Stack spacing={2} height="100%">
      <Stack spacing={2}>
        <Filter dataModel={dataModel} padding />
        <Toolbar dataModel={dataModel} padding handleCreate={handleCreate} query={query} />
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
          query={query}
        />
      </Stack>
    </Stack>
  );
});
