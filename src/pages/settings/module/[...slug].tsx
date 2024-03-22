import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { FormProvider, useForm } from 'react-hook-form';
import { Skeleton } from '@mui/material';
import { useModuleSettingsItemStore } from '@store/modules/settings/module/item/hook';
import { IModuleDTO } from '@model/entities/module';
import { DEFAULT_MODULE } from '@model/entities/module/default';
import { PageModule } from '@ui/pages/settings/module/item/page';
import { PageModules } from '@ui/pages/settings/module/index/page';

const Module = (props: any) => {
  const router = useRouter();
  const id = router.query.slug?.[0] as string;
  const {
    getData: getModule,
    setData: setModule,
    data: module,
    isDataLoading: loadingModule,
  } = useModuleSettingsItemStore();

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTES.HOME.label,
      url: { pathname: ROUTES.HOME.path },
    },
    {
      label: ROUTES.SETTINGS_MODULES.label,
      url: { pathname: ROUTES.SETTINGS_MODULES.path },
    },
    {
      label: loadingModule ? (
        <Skeleton width={100} />
      ) : module ? (
        module.title
      ) : (
        ROUTES.SETTINGS_MODULE.label
      ),
      url: { pathname: ROUTES.SETTINGS_MODULE.path, query: router.query },
    },
  ];

  useEffect(() => {
    if (id) getModule(id);
    return () => setModule();
  }, [id]);

  const methods = useForm<IModuleDTO>({ mode: 'all', defaultValues: DEFAULT_MODULE });
  useEffect(() => {
    methods.reset(module || DEFAULT_MODULE);
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

export default observer(Module);
