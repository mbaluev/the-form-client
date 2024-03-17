import { observer } from 'mobx-react';
import { useModuleSchoolListStore } from '@store/modules/school/module/list/hook';
import { Grid, Stack } from '@mui/material';
import { ModuleGridItem } from '@ui/pages/school/module/index/item';

export const ModuleGrid = observer(() => {
  const { data: userModules } = useModuleSchoolListStore();
  const spacing = 3;

  return (
    <Stack padding={spacing} paddingTop={0}>
      <Grid container spacing={spacing}>
        {userModules?.map((userModule) => (
          <Grid key={userModule.id} item xs={12} sm={6} md={4} lg={3}>
            <ModuleGridItem userModule={userModule} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
});
