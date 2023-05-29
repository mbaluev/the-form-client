import React from 'react';
import { Page } from '@ui/layout/page';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Page204 } from '@ui/pages/errors/204';
import { Loader } from '@components/loader';
import { IMaterialUserViewModel } from '@viewModel/modules/entities/material/user/interface';
import { MaterialCardContent } from 'ui/pages/school/block/tabs/tabMaterials/materialCardContent';
import { MaterialCardActions } from '@ui/pages/school/block/tabs/tabMaterials/materialCardActions';
import { MaterialTitle } from '@ui/pages/school/block/tabs/tabMaterials/materialTitle';
import { MaterialSubTitle } from '@ui/pages/school/block/tabs/tabMaterials/materialSubTitle';

export const MaterialCard = observer(() => {
  const { data, isDataLoading, isListLoading } =
    useViewModel<IMaterialUserViewModel>(VIEW_MODEL.MaterialUser);

  if (isListLoading || isDataLoading) {
    return (
      <Page>
        <Loader loading />
      </Page>
    );
  }

  if (!data) {
    return <Page204 />;
  }

  return (
    <Page
      title={<MaterialTitle />}
      subTitle={<MaterialSubTitle />}
      quickFilter={<MaterialCardActions />}
    >
      <MaterialCardContent />
    </Page>
  );
});
