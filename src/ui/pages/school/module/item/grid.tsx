import { observer } from 'mobx-react';
import { Grid, Stack } from '@mui/material';
import { useModuleSchoolItemStore } from '@store/modules/school/module/item/hook';
import { BlockGridItem } from '@ui/pages/school/module/item/item';

export const ModuleGrid = observer(() => {
  const { data: userModule } = useModuleSchoolItemStore();
  const spacing = 3;

  return (
    <Stack padding={spacing} paddingTop={0}>
      <Grid container spacing={spacing}>
        {userModule?.userBlocks?.map((userBlock) => (
          <Grid key={userModule.id} item xs={12} sm={6} md={4} lg={3}>
            <BlockGridItem userBlock={userBlock} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
});
