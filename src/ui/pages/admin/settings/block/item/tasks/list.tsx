import { observer } from 'mobx-react';
import { List } from '@ui/layout/list/list';
import { Filter } from '@ui/layout/list/filter';
import { Toolbar } from '@ui/layout/list/toolbar';
import { Chip, Stack, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Item } from '@ui/pages/admin/settings/block/item/tasks/item';
import { ROUTES } from '@settings/routes';
import { TaskDialog } from '@ui/pages/admin/settings/block/item/tasks/dialog';
import { Avatar } from '@ui/pages/admin/settings/block/item/tasks/avatar';
import { DialogConfirm } from '@ui/dialogs/dialogConfirm';
import { useTaskListStore } from '@store/modules/entities/task/list/useTaskListStore';
import { ITaskDTO } from '@model/entities/task';

export const TasksList = observer(() => {
  const dataModel = useTaskListStore();
  const router = useRouter();
  const blockId = router.query.slug?.[0] as string;
  const tab = router.query.slug?.[1] as string;
  const taskId = router.query.slug?.[2] as string;
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
          avatarRenderer={(item: ITaskDTO) => <Avatar item={item} />}
          itemRenderer={(item: ITaskDTO) => <Item item={item} />}
          moreRenderer={(item: ITaskDTO) => (
            <Chip label={item.document?.documentType.name} color="primary" size="small" />
          )}
          rowStyleGetter={(item: ITaskDTO) => {
            if (router.pathname === ROUTES.ADMIN_SETTINGS_BLOCK.path && item.id === taskId) {
              return { backgroundColor: theme.palette.fGrey[10] };
            }
          }}
          handleClick={handleClick}
          estimateSize={62}
          checkbox
        />
      </Stack>
      <TaskDialog open={Boolean(taskId)} />
      <DialogConfirm
        open={dataModel.isDeleteOpen}
        isLoading={dataModel.isDeleteLoading}
        onClose={dataModel.deleteClose}
        onSubmit={handleDeleteSubmit}
        title="Delete tasks"
        message="Are you sure you want to delete selected tasks?"
      />
    </Stack>
  );
});
