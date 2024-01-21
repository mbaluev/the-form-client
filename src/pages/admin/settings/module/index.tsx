import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { PageModules } from '@ui/pages/admin/settings/module/index/page';
import { PageModule } from '@ui/pages/admin/settings/module/item/page';
import { FormProvider, useForm } from 'react-hook-form';
import { DEFAULT_MODULE } from '@model/entities/module/default';
import { IModuleDTO } from '@model/entities/module';

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
  const methods = useForm<IModuleDTO>({ mode: 'all', defaultValues: DEFAULT_MODULE });
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
