import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { Panel } from '@ui/layout/page/panel';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';

const Module = (props: any) => {
  const router = useRouter();
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTES.HOME.label,
      url: { pathname: ROUTES.HOME.path },
    },
    {
      label: ROUTES.ADMIN_SETTINGS_MODULES.label,
      url: { pathname: ROUTES.ADMIN_SETTINGS_MODULES.path },
    },
    {
      label: ROUTES.ADMIN_SETTINGS_MODULE.label,
      url: { pathname: ROUTES.ADMIN_SETTINGS_MODULE.path, query: router.query },
    },
  ];

  return (
    <MasterAuth>
      <Page {...props} breadCrumbs={breadCrumbs} right={<Panel />}>
        <Panel>module</Panel>
      </Page>
    </MasterAuth>
  );
};

export default observer(Module);
