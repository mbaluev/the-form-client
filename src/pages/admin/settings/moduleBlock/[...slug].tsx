import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { PageBlocks } from '@ui/pages/admin/settings/block/index/page';
import { PageBlock } from '@ui/pages/admin/settings/block/item/page';
import { useEffect } from 'react';
import { useBlockItemStore } from '@store/modules/entities/block/item/useBlockItemStore';
import { useModuleListStore } from '@store/modules/entities/module/list/useModuleListStore';
import { FormProvider, useForm } from 'react-hook-form';
import { IBlockDTO } from '@model/entities/block';
import { DEFAULT_BLOCK } from '@model/entities/block/default';
import { useModuleItemStore } from '@store/modules/entities/module/item/useModuleItemStore';
import { Skeleton } from '@mui/material';

const ModuleBlock = (props: any) => {
  const {
    getData: getModule,
    setData: setModule,
    data: module,
    isDataLoading: loadingModule,
  } = useModuleItemStore();
  const {
    getData: getBlock,
    setData: setBlock,
    data: block,
    isDataLoading: loadingBlock,
  } = useBlockItemStore();
  const { getData: getModules, data: modules } = useModuleListStore();

  const router = useRouter();
  const moduleId = router.query.slug?.[0] as string;
  const blockId = router.query.slug?.[1] as string;

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
      label: loadingBlock ? (
        <Skeleton width={100} />
      ) : block ? (
        block.title
      ) : (
        ROUTES.ADMIN_SETTINGS_BLOCK.label
      ),
      url: { pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path, query: router.query },
    },
  ];

  useEffect(() => {
    if (!modules) getModules();
  }, []);

  useEffect(() => {
    if (blockId) getBlock(blockId);
    return () => setBlock();
  }, [blockId]);

  useEffect(() => {
    if (moduleId) getModule(moduleId);
    return () => setModule();
  }, [moduleId]);

  const methods = useForm<IBlockDTO>({ mode: 'all', defaultValues: DEFAULT_BLOCK });
  useEffect(() => {
    methods.reset(block || DEFAULT_BLOCK);
  }, [block]);

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

export default observer(ModuleBlock);
