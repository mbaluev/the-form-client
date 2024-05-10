import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { PageSchoolModules } from '@ui/pages/school/module/index/page';
import { useModuleSchoolListStore } from '@store/modules/school/module/list/hook';
import { useEffect } from 'react';

const SchoolModules = (props: any) => {
  const { getData, setData } = useModuleSchoolListStore();

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

  useEffect(() => {
    getData();
    return () => {
      setData();
    };
  });

  return (
    <MasterAuth>
      <Page {...props} breadCrumbs={breadCrumbs}>
        <PageSchoolModules />
      </Page>
    </MasterAuth>
  );
};

export default SchoolModules;
