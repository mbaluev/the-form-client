import { observer } from 'mobx-react';
import { List } from '@ui/layout/list/list';
import { Filter } from '@ui/layout/list/filter';
import { Toolbar } from '@ui/layout/list/toolbar';
import { Stack, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Item } from '@ui/pages/admin/settings/block/item/questions/item';
import { ROUTES } from '@settings/routes';
import { QuestionDialog } from '@ui/pages/admin/settings/block/item/questions/dialog';
import { Avatar } from '@ui/pages/admin/settings/block/item/questions/avatar';
import { DialogConfirm } from '@ui/dialogs/dialogConfirm';
import { useQuestionSettingsListStore } from '@store/modules/settings/question/list/hook';
import { IQuestionDTO } from '@model/entities/question';

export const QuestionsList = observer(() => {
  const dataModel = useQuestionSettingsListStore();
  const router = useRouter();
  const blockId = router.query.slug?.[0] as string;
  const tab = router.query.slug?.[1] as string;
  const questionId = router.query.slug?.[2] as string;
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
          avatarRenderer={(item: IQuestionDTO) => <Avatar item={item} />}
          itemRenderer={(item: IQuestionDTO) => <Item item={item} />}
          rowStyleGetter={(item: IQuestionDTO) => {
            if (router.pathname === ROUTES.ADMIN_SETTINGS_BLOCK.path && item.id === questionId) {
              return { backgroundColor: theme.palette.fGrey[10] };
            }
          }}
          handleClick={handleClick}
          estimateSize={62}
          checkbox
        />
      </Stack>
      <QuestionDialog open={Boolean(questionId)} />
      <DialogConfirm
        open={dataModel.isDeleteOpen}
        isLoading={dataModel.isDeleteLoading}
        onClose={dataModel.deleteClose}
        onSubmit={handleDeleteSubmit}
        title="Delete questions"
        message="Are you sure you want to delete selected questions?"
      />
    </Stack>
  );
});
