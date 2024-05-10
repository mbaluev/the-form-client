import { observer } from 'mobx-react';
import { List } from '@ui/layout/list/list';
import { Filter } from '@ui/layout/list/filter';
import { Toolbar } from '@ui/layout/list/toolbar';
import { Stack, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ROUTES } from '@settings/routes';
import { Item } from '@ui/pages/school/block/item/questions/item';
import { Avatar } from '@ui/pages/school/block/item/questions/avatar';
import { useQuestionSchoolListStore } from '@store/modules/school/question/list/hook';
import { IQuestionUserDTO } from '@model/entities/question';

export const QuestionsList = observer(() => {
  const dataModel = useQuestionSchoolListStore();
  const router = useRouter();
  const blockId = router.query.slug?.[0] as string;
  const tab = ROUTES.SCHOOL_BLOCK.tabs.keys.test;
  const questionId = router.query.slug?.[2] as string;
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
          avatarRenderer={(item: IQuestionUserDTO) => <Avatar item={item} />}
          itemRenderer={(item: IQuestionUserDTO) => <Item item={item} />}
          rowStyleGetter={(item: IQuestionUserDTO) => {
            if (router.pathname === ROUTES.SCHOOL_BLOCK.path && item.id === questionId) {
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
