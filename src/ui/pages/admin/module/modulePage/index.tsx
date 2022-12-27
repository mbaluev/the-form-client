import React from 'react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { Page } from '@ui/layout/page';
import { observer } from 'mobx-react';
import { ModuleList } from '@ui/pages/admin/module/moduleList';
import { ModuleCard } from '@ui/pages/admin/module/moduleCard';

interface IProps {
  breadCrumbs: TBreadCrumb[];
  onNewCallback?: (id: string) => void;
}

export const ModulePage = observer((props: IProps) => {
  const { breadCrumbs, ...other } = props;

  return (
    <Page
      title="Modules"
      breadCrumbs={breadCrumbs}
      padding={false}
      pageRight={<ModuleCard />}
    >
      <ModuleList {...other} />
    </Page>
  );
});
