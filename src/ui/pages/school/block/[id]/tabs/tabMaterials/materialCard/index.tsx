import React from 'react';
import { Page } from '@ui/layout/page';
import { observer } from 'mobx-react';
import { Page204 } from '@ui/pages/errors/204';
import { IMaterialUserViewModel } from '@viewModel/modules/entities/material/user/interface';
import { MaterialCardContent } from '@ui/pages/school/block/[id]/tabs/tabMaterials/materialCardContent';
import { MaterialCardActions } from '@ui/pages/school/block/[id]/tabs/tabMaterials/materialCardActions';
import { TitleMaterial } from '@ui/components/title/titleMaterial';
import { TagMaterial } from '@ui/components/tag/tagMaterial';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';

export const MaterialCard = observer(() => {
  const { data, isDataLoading } = useViewModel<IMaterialUserViewModel>(
    VIEW_MODEL.MaterialUser
  );

  if (!data || isDataLoading) {
    return <Page204 loading={isDataLoading} />;
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
