import { observer } from 'mobx-react';
import { List } from '@ui/layout/list/list';
import { Filter } from '@ui/layout/list/filter';
import { Toolbar } from '@ui/layout/list/toolbar';
import { Stack, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMaterialSettingsListStore } from '@store/modules/settings/material/settings/list/hook';
import { IMaterialDTO } from '@model/entities/material';
import { Item } from '@ui/pages/admin/settings/block/item/materials/item';
import { Download } from 'ui/components/action';
import { ROUTES } from '@settings/routes';
import { MaterialDialog } from '@ui/pages/admin/settings/block/item/materials/dialog';
import { Avatar } from '@ui/pages/admin/settings/block/item/materials/avatar';
import { DialogConfirm } from '@ui/dialogs/dialogConfirm';

export const MaterialsList = observer(() => {
  const dataModel = useMaterialSettingsListStore();
  const router = useRouter();
  const blockId = router.query.slug?.[0] as string;
  const tab = router.query.slug?.[1] as string;
  const materialId = router.query.slug?.[2] as string;
  const theme = useTheme();

  const handleClick = async (id: string) => {
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path,
      query: { ...router.query, slug: [blockId, tab, id] },
    });
  };
  const handleCreate = async () => {
    await router.push({
      pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path,
      query: { ...router.query, slug: [blockId, tab, 'create'] },
    });
  };
  const handleDelete = async () => {
    await dataModel.deleteOpen();
  };
  const handleDeleteSubmit = async () => {
    await dataModel.deleteSubmit();
  };

  useEffect(() => {
    dataModel.getData({ blockId });
  }, []);

  return (
    <Stack spacing={2} height="100%">
      <Filter dataModel={dataModel} padding />
      <Toolbar
        dataModel={dataModel}
        query={{ blockId }}
        checkbox
        padding
        handleCreate={handleCreate}
        handleDelete={handleDelete}
      />
      <Stack flexGrow={1} overflow="hidden">
        <List
          dataModel={dataModel}
          avatarRenderer={(item: IMaterialDTO) => <Avatar item={item} />}
          itemRenderer={(item: IMaterialDTO) => <Item item={item} />}
          moreRenderer={(item: IMaterialDTO) => <Download doc={item.document} />}
          rowStyleGetter={(item: IMaterialDTO) => {
            if (router.pathname === ROUTES.ADMIN_SETTINGS_BLOCK.path && item.id === materialId) {
              return { backgroundColor: theme.palette.fGrey[10] };
            }
          }}
          handleClick={handleClick}
          estimateSize={62}
          checkbox
        />
      </Stack>
      <MaterialDialog open={Boolean(materialId)} />
      <DialogConfirm
        open={dataModel.isDeleteOpen}
        isLoading={dataModel.isDeleteLoading}
        onClose={dataModel.deleteClose}
        onSubmit={handleDeleteSubmit}
        title="Delete materials"
        message="Are you sure you want to delete selected materials?"
      />
    </Stack>
  );
});
