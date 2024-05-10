import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { FormProvider, useForm } from 'react-hook-form';
import { Skeleton } from '@mui/material';
import { useBlockSettingsItemStore } from '@store/modules/settings/block/item/hook';
import { IBlockDTO } from '@model/entities/block';
import { DEFAULT_BLOCK } from '@model/entities/block/default';
import { PageBlock } from '@ui/pages/settings/block/item/page';
import { PageBlocks } from '@ui/pages/settings/block/index/page';
import { useModuleSettingsListStore } from '@store/modules/settings/module/list/hook';
import { useFilterStore } from '@store/modules/common/filter/useFilterStore';
import { useModuleSettingsItemStore } from '@store/modules/settings/module/item/hook';

const Block = (props: any) => {
  const router = useRouter();
  const id = router.query.slug?.[0] as string;
  const {
    getData: getBlock,
    setData: setBlock,
    data: block,
    isDataLoading: loadingBlock,
  } = useBlockSettingsItemStore();
  const {
    getData: getModule,
    setData: setModule,
    data: module,
    isDataLoading: loadingModule,
  } = useModuleSettingsItemStore();
  const { getData: getModules, setData: setModules } = useModuleSettingsListStore();
  const { filters } = useFilterStore();

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTES.HOME.label,
      url: { pathname: ROUTES.HOME.path },
    },
  ];
  if (module) {
    breadCrumbs.push({
      label: loadingModule ? (
        <Skeleton width={100} />
      ) : module ? (
        module.title
      ) : (
        ROUTES.SETTINGS_MODULE.label
      ),
      url: {
        pathname: ROUTES.SETTINGS_MODULE.path,
        query: { slug: [filters.moduleId, ROUTES.SETTINGS_MODULE.tabs.keys.blocks] },
      },
    });
  } else {
    breadCrumbs.push({
      label: ROUTES.SETTINGS_BLOCKS.label,
      url: { pathname: ROUTES.SETTINGS_BLOCKS.path },
    });
  }
  breadCrumbs.push({
    label: loadingBlock ? (
      <Skeleton width={100} />
    ) : block ? (
      block.title
    ) : (
      ROUTES.SETTINGS_BLOCK.label
    ),
    url: { pathname: ROUTES.SETTINGS_BLOCK.path, query: router.query },
  });

  useEffect(() => {
    getModules();
    return () => setModules();
  }, []);

  useEffect(() => {
    if (id) getBlock(id);
    return () => setBlock();
  }, [id]);

  useEffect(() => {
    if (filters.moduleId) getModule(filters.moduleId);
    return () => setModule();
  }, [filters.moduleId]);

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

export default observer(Block);
