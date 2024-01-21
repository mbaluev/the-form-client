import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { PageModules } from '@ui/pages/admin/settings/module/index/page';
import { PageModule } from '@ui/pages/admin/settings/module/item/page';
import { FormProvider, useForm } from 'react-hook-form';
import { IUserDTO } from '@model/entities/user';
import { useEffect } from 'react';
import { DEFAULT_MODULE } from '@model/entities/module/default';

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

  const methods = useForm<IUserDTO>({ mode: 'all' });
  useEffect(() => {
    methods.reset(DEFAULT_MODULE);
  }, [module]);

  return (
    <MasterAuth>
      <FormProvider {...methods}>
        <Page {...props} breadCrumbs={breadCrumbs} right={<PageModule />}>
          <PageModules />
        </Page>
      </FormProvider>
    </MasterAuth>
  );
};

export default Modules;
