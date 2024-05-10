import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { FormProvider, useForm } from 'react-hook-form';
import { Skeleton } from '@mui/material';
import { IModuleUserDTO } from '@model/entities/module';
import { DEFAULT_MODULE_USER } from '@model/entities/module/default';
import { useModuleSchoolItemStore } from '@store/modules/school/module/item/hook';
import { PageSchoolModule } from '@ui/pages/school/module/item/page';

const SchoolModule = (props: any) => {
  const router = useRouter();
  const id = router.query.id as string;
  const {
    getData: getModule,
    setData: setModule,
    data: module,
    isDataLoading: loadingModule,
  } = useModuleSchoolItemStore();

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTES.HOME.label,
      url: { pathname: ROUTES.HOME.path },
    },
    {
      label: ROUTES.SCHOOL_MODULES.label,
      url: { pathname: ROUTES.SCHOOL_MODULES.path },
    },
    {
      label: loadingModule ? (
        <Skeleton width={100} />
      ) : module && module.module ? (
        module.module.name
      ) : (
        ROUTES.SCHOOL_MODULE.label
      ),
      url: { pathname: ROUTES.SCHOOL_MODULE.path, query: { id } },
    },
  ];

  useEffect(() => {
    if (id) getModule(id);
    return () => setModule();
  }, [id]);

  const methods = useForm<IModuleUserDTO>({ mode: 'all', defaultValues: DEFAULT_MODULE_USER });
  useEffect(() => {
    methods.reset(module || DEFAULT_MODULE_USER);
  }, [module]);

  return (
    <MasterAuth>
      <FormProvider {...methods}>
        <Page {...props} breadCrumbs={breadCrumbs}>
          <PageSchoolModule />
        </Page>
      </FormProvider>
    </MasterAuth>
  );
};

export default observer(SchoolModule);
