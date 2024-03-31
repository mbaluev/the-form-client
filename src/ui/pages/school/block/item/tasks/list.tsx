import { observer } from 'mobx-react';
import { List } from '@ui/layout/list/list';
import { Filter } from '@ui/layout/list/filter';
import { Toolbar } from '@ui/layout/list/toolbar';
import { Chip, Stack, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ROUTES } from '@settings/routes';
import { ITaskUserDTO } from '@model/entities/task';
import { useTaskSchoolListStore } from '@store/modules/school/task/list/hook';
import { Item } from '@ui/pages/school/block/item/tasks/item';
import { Avatar } from '@ui/pages/school/block/item/tasks/avatar';

export const TasksList = observer(() => {
  const dataModel = useTaskSchoolListStore();
  const router = useRouter();
  const blockId = router.query.slug?.[0] as string;
  const tab = ROUTES.SCHOOL_BLOCK.tabs.keys.homework;
  const taskId = router.query.slug?.[2] as string;
  const theme = useTheme();

  const handleClick = async (id: string) => {
    await router.push({
      pathname: ROUTES.SCHOOL_BLOCK.path,
      query: { ...router.query, slug: [blockId, tab, id] },
    });
  };

  useEffect(() => {
    dataModel.getData({ blockId });
  }, []);

  return (
    <Stack spacing={2} height="100%">
      <Filter dataModel={dataModel} padding />
      <Toolbar dataModel={dataModel} query={{ blockId }} padding />
      <Stack flexGrow={1} overflow="hidden">
        <List
          dataModel={dataModel}
          avatarRenderer={(item: ITaskUserDTO) => <Avatar item={item} />}
          itemRenderer={(item: ITaskUserDTO) => <Item item={item} />}
          moreRenderer={(item: ITaskUserDTO) => (
            <Chip label={item.task?.document?.documentType.name} color="primary" size="small" />
          )}
          rowStyleGetter={(item: ITaskUserDTO) => {
            if (router.pathname === ROUTES.SCHOOL_BLOCK.path && item.id === taskId) {
              return { backgroundColor: theme.palette.fGrey[10] };
            }
          }}
          handleClick={handleClick}
          estimateSize={62}
        />
      </Stack>
    </Stack>
  );
});
