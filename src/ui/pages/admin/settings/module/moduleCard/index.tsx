import React from 'react';
import { Page } from '@ui/layout/page';
import { useViewModel } from '@hooks/useViewModel';
import { IModuleViewModel } from '@viewModel/modules/entities/module/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Page204 } from '@ui/pages/errors/204';
import { ModuleTabs } from '@ui/pages/admin/settings/module/moduleTabs';
import { ModuleCardActions } from '@ui/pages/admin/settings/module/moduleCardActions';
import { ModuleLabel } from '@ui/pages/admin/settings/module/moduleLabel';
import { Loader } from '@components/loader';

export const ModuleCard = observer(() => {
  const { moduleData, isDataLoading } = useViewModel<IModuleViewModel>(
    VIEW_MODEL.Module
  );
  if (!moduleData) return <Page204 />;
  return (
    <Page title={<ModuleLabel />} quickFilter={<ModuleCardActions />}>
      <Loader loading={isDataLoading} />
      <ModuleTabs />
    </Page>
  );
});
