import React from 'react';
import { Page } from '@ui/layout/page';
import { observer } from 'mobx-react';
import { Page204 } from '@ui/pages/errors/204';
import { Loader } from '@components/loader';
import { MaterialCardContent } from '@ui/pages/admin/settings/userBlock/[id]/tabs/tabMaterials/materialCardContent';
import { MaterialCardActions } from '@ui/pages/admin/settings/userBlock/[id]/tabs/tabMaterials/materialCardActions';
import { TitleMaterial } from '@ui/components/title/titleMaterial';
import { TagMaterial } from '@ui/components/tag/tagMaterial';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IMaterialAdminViewModel } from '@viewModel/modules/entities/material/admin/interface';

export const MaterialCard = observer(() => {
  const { data, isDataLoading, isListLoading } =
    useViewModel<IMaterialAdminViewModel>(VIEW_MODEL.MaterialAdmin);

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
      title={<TitleMaterial userMaterial={data} />}
      subTitle={<TagMaterial userMaterial={data} />}
      quickFilter={<MaterialCardActions />}
    >
      <MaterialCardContent />
    </Page>
  );
});
