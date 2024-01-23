import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { observer } from 'mobx-react';
import { FormProvider, useForm } from 'react-hook-form';
import { IBlockDTO } from '@model/entities/block';
import { DEFAULT_BLOCK } from '@model/entities/block/default';
import { PageBlock } from '@ui/pages/admin/settings/block/item/page';
import { PageBlocks } from '@ui/pages/admin/settings/block/index/page';
import { useRouter } from 'next/router';
import { useModuleItemStore } from '@store/modules/entities/module/item/useModuleItemStore';
import { useModuleListStore } from '@store/modules/entities/module/list/useModuleListStore';
import { Skeleton } from '@mui/material';
import { useEffect } from 'react';

const ModuleBlockCreate = (props: any) => {
  const {
    getData: getModule,
    setData: setModule,
    data: module,
    isDataLoading: loadingModule,
  } = useModuleItemStore();
  const { getData: getModules, data: modules } = useModuleListStore();

  const router = useRouter();
  const moduleId = router.query.slug?.[0] as string;

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
      label: loadingModule ? (
        <Skeleton width={100} />
      ) : module ? (
        module.title
      ) : (
        ROUTES.ADMIN_SETTINGS_MODULE.label
      ),
      url: { pathname: ROUTES.ADMIN_SETTINGS_MODULE.path, query: router.query },
    },
    {
      label: ROUTES.ADMIN_SETTINGS_BLOCKS.label,
      url: {
        pathname: ROUTES.ADMIN_SETTINGS_MODULE.path,
        query: ROUTES.ADMIN_SETTINGS_MODULE.tabs.keys.blocks,
      },
    },
    {
      label: ROUTES.ADMIN_SETTINGS_MODULE_BLOCK_CREATE.label,
      url: {
        pathname: ROUTES.ADMIN_SETTINGS_MODULE_BLOCK_CREATE.path,
        query: router.query,
      },
    },
  ];

  useEffect(() => {
    if (!modules) getModules();
  }, []);

  useEffect(() => {
    if (moduleId) getModule(moduleId);
    return () => setModule();
  }, [moduleId]);

  const methods = useForm<IBlockDTO>({ mode: 'all', defaultValues: DEFAULT_BLOCK });

  useEffect(() => {
    methods.setValue('moduleId', moduleId);
  }, [moduleId]);

  return (
    <MasterAuth>
      <FormProvider {...methods}>
        <Page {...props} breadCrumbs={breadCrumbs} right={<PageBlock />}>
          <PageBlocks />
        </Page>
      </FormProvider>
    </MasterAuth>
  );
};

export default observer(ModuleBlockCreate);
