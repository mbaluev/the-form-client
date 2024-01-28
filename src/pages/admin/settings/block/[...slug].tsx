import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { FormProvider, useForm } from 'react-hook-form';
import { Skeleton } from '@mui/material';
import { useBlockItemStore } from '@store/modules/entities/block/item/useBlockItemStore';
import { IBlockDTO } from '@model/entities/block';
import { DEFAULT_BLOCK } from '@model/entities/block/default';
import { PageBlock } from '@ui/pages/admin/settings/block/item/page';
import { PageBlocks } from '@ui/pages/admin/settings/block/index/page';
import { useModuleListStore } from '@store/modules/entities/module/list/useModuleListStore';

const Block = (props: any) => {
  const router = useRouter();
  const id = router.query.slug?.[0] as string;
  const {
    getData: getBlock,
    setData: setBlock,
    data: block,
    isDataLoading: loadingBlock,
  } = useBlockItemStore();
  const { getData: getModules, setData: setModules } = useModuleListStore();

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTES.HOME.label,
      url: { pathname: ROUTES.HOME.path },
    },
    {
      label: ROUTES.ADMIN_SETTINGS_BLOCKS.label,
      url: { pathname: ROUTES.ADMIN_SETTINGS_BLOCKS.path },
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
    getModules();
    return () => setModules();
  }, []);

  useEffect(() => {
    if (id) getBlock(id);
    return () => setBlock();
  }, [id]);

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
