import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';

const SchoolModules = (props: any) => {
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTES.HOME.label,
      url: { pathname: ROUTES.HOME.path },
    },
    {
      label: ROUTES.SCHOOL_MODULES.label,
      url: { pathname: ROUTES.SCHOOL_MODULES.path },
    },
  ];

  return (
    <MasterAuth>
      <Page {...props} breadCrumbs={breadCrumbs}>
        ...
      </Page>
    </MasterAuth>
  );
};

export default SchoolModules;
