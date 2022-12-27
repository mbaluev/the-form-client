import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IModuleViewModel } from '@viewModel/modules/module/interface';
import { useService } from '@hooks/useService';
import { IModuleService } from '@service/modules/module/interface';
import { SERVICE } from '@service/ids';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { observer } from 'mobx-react';
import { ModulePage } from '@ui/pages/admin/module/modulePage';
import { IBlockService } from '@service/modules/block/interface';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { params, query } = context;
  const serviceModule = useService<IModuleService>(SERVICE.Module);
  const serviceBlock = useService<IBlockService>(SERVICE.Block);

  const modules = (await serviceModule.getModules(query)) || null;
  const module = (await serviceModule.getModule(params?.id, query)) || null;
  const blocks = (await serviceBlock.getBlocksByModuleId(params?.id)) || null;

  return { props: { modules, module, blocks } };
};

const Module = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { modules, module, blocks } = props;
  const {
    setList: setModules,
    setData: setModule,
    setModuleData,
  } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);
  const {
    setList: setBlocks,
    clearData: clearBlock,
    clearBlockData,
  } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_MODULES.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_MODULES.path },
    },
    {
      label: module ? `${module?.title}. ${module.name}` : 'Not found',
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_MODULE.path,
        query: { id: module?.id },
      },
      disabled: !Boolean(module),
    },
  ];
  const router = useRouter();
  const onNewCallback = (id: string) => {
    const query: ParsedUrlQuery = { id };
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_MODULE.path,
      query,
    });
  };

  useEffect(() => {
    setModules(modules);
    setModule(module);
    setModuleData(module);
    setBlocks(blocks);
    clearBlock();
    clearBlockData();
  });

  return (
    <ModulePage
      breadCrumbs={breadCrumbs}
      // onNewCallback={onNewCallback}
    />
  );
};

Module.Layout = MasterSchool;
export default observer(Module);
