import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { useService } from '@hooks/useService';
import { SERVICE } from '@service/ids';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { observer } from 'mobx-react';
import { IBlockService } from '@service/modules/entities/block/interface';
import { IBlockViewModel } from '@viewModel/modules/entities/block/interface';
import { BlockPage } from '@ui/pages/admin/settings/block/blockPage';
import { IModuleService } from '@service/modules/entities/module/interface';
import { IModuleViewModel } from '@viewModel/modules/entities/module/interface';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { FilterText } from '@ui/filter/filterText';
import { useRouter } from 'next/router';
import { CellClickedEvent } from 'ag-grid-community';
import { ParsedUrlQuery } from 'querystring';
import { getCookieToken } from '@utils/cookie/getCookieToken';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ moduleId: string }>
) => {
  const { params, query } = context;
  const id = params?.moduleId;
  const token = getCookieToken(context);
  const serviceModule = useService<IModuleService>(SERVICE.Module);
  const serviceBlock = useService<IBlockService>(SERVICE.Block);

  const modules = (await serviceModule.getModules(undefined, token)) || null;
  const module = (await serviceModule.getModule(id, undefined, token)) || null;
  const blocks =
    (await serviceBlock.getBlocks({ ...query, moduleId: id }, token)) || null;

  return { props: { modules, module, blocks } };
};

const Blocks = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { modules, module, blocks } = props;
  const {
    setList: setModules,
    setData: setModule,
    setModuleData,
    clearList: clearModules,
    clearData: clearModule,
    clearModuleData,
  } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);
  const {
    setList: setBlocks,
    clearList: clearBlocks,
    clearData: clearBlock,
    clearBlockData,
  } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULES.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULES.path },
    },
    {
      label: module ? `${module?.title}. ${module.name}` : 'Not found',
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULE.path,
        query: { moduleId: module?.id },
      },
      disabled: !Boolean(module),
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULE_BLOCKS.label,
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULE_BLOCKS.path,
        query: { moduleId: module?.id },
      },
      disabled: !Boolean(module),
    },
  ];
  const filtersLeft: JSX.Element[] = [
    <FilterText
      name="search"
      placeholder="Search"
      style={{ flexBasis: '100%' }}
    />,
  ];
  const router = useRouter();
  const onClick = (params: CellClickedEvent) => {
    const query: ParsedUrlQuery = { ...router.query, blockId: params.data.id };
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULE_BLOCK.path,
      query,
    });
  };
  const onDelete = async () => {
    await clearBlock();
    await clearBlockData();
    await router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULE.path,
      query: { moduleId: module?.id },
    });
  };

  useEffect(() => {
    setModules(modules);
    setModule(module);
    setModuleData(module);
    setBlocks(blocks);
    return () => {
      clearModules();
      clearModule();
      clearModuleData();
      clearBlocks();
    };
  });

  return (
    <BlockPage
      breadCrumbs={breadCrumbs}
      filtersLeft={filtersLeft}
      onClick={onClick}
      onDelete={onDelete}
    />
  );
};

Blocks.Layout = MasterSchool;
export default observer(Blocks);
