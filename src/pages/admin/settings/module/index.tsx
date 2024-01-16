import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { Panel } from '@ui/layout/page/panel';

const Modules = (props: any) => {
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTES.HOME.label,
      url: { pathname: ROUTES.HOME.path },
    },
    {
      label: ROUTES.ADMIN_SETTINGS_MODULES.label,
      url: { pathname: ROUTES.ADMIN_SETTINGS_MODULES.path },
    },
  ];
  return (
    <MasterAuth>
      <Page {...props} breadCrumbs={breadCrumbs} right={<Panel />}>
        <Panel>modules</Panel>
      </Page>
    </MasterAuth>
  );
};

export default Modules;
