import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Skeleton } from '@mui/material';
import { PageBlock } from '@ui/pages/school/block/item/page';
import { useBlockSchoolItemStore } from '@store/modules/school/block/item/hook';
import { useModuleSchoolItemStore } from '@store/modules/school/module/item/hook';
import { PagePanel } from '@ui/pages/school/block/panel/page';

const SchoolBlock = (props: any) => {
  const router = useRouter();
  const id = router.query.slug?.[0] as string;
  const {
    getData: getBlock,
    setData: setBlock,
    data: block,
    isDataLoading: loadingBlock,
  } = useBlockSchoolItemStore();
  const {
    getDataByBlockId: getModule,
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
      url: { pathname: ROUTES.SCHOOL_MODULE.path, query: { id: module?.id } },
    },
    {
      label: loadingBlock ? (
        <Skeleton width={100} />
      ) : block && block.block ? (
        block.block.name
      ) : (
        ROUTES.SCHOOL_BLOCK.label
      ),
      url: { pathname: ROUTES.SCHOOL_BLOCK.path, query: { slug: [id] } },
    },
  ];

  useEffect(() => {
    if (id) {
      getBlock(id);
      getModule(id);
    }
    return () => {
      setBlock();
      setModule();
    };
  }, [id]);

  // const methods = useForm<IBlockDTO>({ mode: 'all', defaultValues: DEFAULT_BLOCK });
  // useEffect(() => {
  //   methods.reset(block || DEFAULT_BLOCK);
  // }, [block]);

  return (
    <MasterAuth>
      {/*<FormProvider {...methods}>*/}
      <Page {...props} breadCrumbs={breadCrumbs} right={<PagePanel />}>
        <PageBlock />
      </Page>
      {/*</FormProvider>*/}
    </MasterAuth>
  );
};

export default observer(SchoolBlock);
