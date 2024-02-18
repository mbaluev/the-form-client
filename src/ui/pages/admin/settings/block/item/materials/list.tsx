import { observer } from 'mobx-react';
import { List } from '@ui/layout/list/list';
import { Filter } from '@ui/layout/list/filter';
import { Toolbar } from '@ui/layout/list/toolbar';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMaterialListStore } from '@store/modules/entities/material/list/useMaterialListStore';
import { IMaterialDTO } from '@model/entities/material';
import { Item } from '@ui/pages/admin/settings/block/item/materials/item';
import { Download } from '@ui/pages/admin/settings/block/item/materials/download';

export const MaterialsList = observer(() => {
  const dataModel = useMaterialListStore();
  const router = useRouter();
  const blockId = router.query.slug?.[0];
  // const theme = useTheme();

  const handleClick = async (id: string) => {
    console.log('click:', id);
    // await router.push({
    //   pathname: ROUTES.ADMIN_SETTINGS_USER.path,
    //   query: { slug: [id] },
    // });
  };
  const handleCreate = async () => {
    console.log('create');
    // await router.push({
    //   pathname: ROUTES.ADMIN_SETTINGS_USER_CREATE.path,
    // });
  };

  useEffect(() => {
    dataModel.getData({ blockId });
  }, []);

  return (
    <Stack spacing={2} height="100%">
      <Stack spacing={2}>
        <Filter dataModel={dataModel} padding />
        <Toolbar
          dataModel={dataModel}
          padding
          handleCreate={handleCreate}
          query={{ blockId }}
          checkbox
        />
      </Stack>
      <Stack flexGrow={1} overflow="hidden">
        <List
          dataModel={dataModel}
          itemRenderer={(item: IMaterialDTO) => <Item item={item} />}
          moreRenderer={(item: IMaterialDTO) => <Download item={item} />}
          // rowStyleGetter={(item: IMaterialDTO) => {
          //   if (router.pathname === ROUTES.ADMIN_SETTINGS_USER.path) {
          //     const id = router.query.id as string;
          //     if (item.id === id) return { backgroundColor: theme.palette.fGrey[10] };
          //   }
          // }}
          handleClick={handleClick}
          estimateSize={62}
          checkbox
        />
      </Stack>
    </Stack>
  );
});
