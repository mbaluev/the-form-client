import { observer } from 'mobx-react';
import { List } from '@ui/layout/list/list';
import { Filter } from '@ui/layout/list/filter';
import { Toolbar } from '@ui/layout/list/toolbar';
import { Stack, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { IMaterialUserDTO } from '@model/entities/material';
import { Item } from '@ui/pages/school/block/item/materials/item';
import { Download } from 'ui/components/action';
import { ROUTES } from '@settings/routes';
import { useMaterialSchoolListStore } from '@store/modules/school/material/list/hook';
import { Avatar } from '@ui/pages/school/block/item/materials/avatar';

export const MaterialsList = observer(() => {
  const dataModel = useMaterialSchoolListStore();
  const router = useRouter();
  const blockId = router.query.slug?.[0] as string;
  const tab = ROUTES.SCHOOL_BLOCK.tabs.keys.materials;
  const materialId = router.query.slug?.[2] as string;
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
          avatarRenderer={(item: IMaterialUserDTO) => <Avatar item={item} />}
          itemRenderer={(item: IMaterialUserDTO) => <Item item={item} />}
          moreRenderer={(item: IMaterialUserDTO) => <Download doc={item.material?.document} />}
          rowStyleGetter={(item: IMaterialUserDTO) => {
            if (router.pathname === ROUTES.SCHOOL_BLOCK.path && item.id === materialId) {
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
