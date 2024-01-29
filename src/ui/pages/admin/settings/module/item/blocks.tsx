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
import { useEffect } from 'react';

export const BlocksList = observer(() => {
  const dataModel = useBlockListStore();
  const router = useRouter();
  const theme = useTheme();
  const moduleId = router.query.slug?.[0] as string;

  const handleClick = async (id: string) => {
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path,
      query: { slug: [id], moduleId },
    });
  };
  const handleCreate = async () => {
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_BLOCK_CREATE.path,
      query: { moduleId },
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