import React from 'react';
import { Page } from '@ui/layout/page';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Page204 } from '@ui/pages/errors/204';
import { Loader } from '@components/loader';
import { IMaterialUserViewModel } from '@viewModel/modules/material/user/interface';
import { MaterialTabs } from '@ui/pages/school/block/tabs/tabMaterials/materialTabs';
import { MaterialCardActions } from '@ui/pages/school/block/tabs/tabMaterials/materialCardActions';
import { MaterialLabel } from '@ui/pages/school/block/tabs/tabMaterials/materialLabel';

export const MaterialCard = observer(() => {
  const { data, isDataLoading } = useViewModel<IMaterialUserViewModel>(
    VIEW_MODEL.MaterialUser
  );

  if (!data) return <Page204 />;

  return (
    <Page title={<MaterialLabel />} quickFilter={<MaterialCardActions />}>
      <Loader loading={isDataLoading} />
      <MaterialTabs />
    </Page>
  );
});
