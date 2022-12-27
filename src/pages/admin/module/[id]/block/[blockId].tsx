import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { useService } from '@hooks/useService';
import { SERVICE } from '@service/ids';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { observer } from 'mobx-react';
import { IBlockService } from '@service/modules/block/interface';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { BlockPage } from '@ui/pages/admin/block/blockPage';
import { IModuleService } from '@service/modules/module/interface';
import { IModuleViewModel } from '@viewModel/modules/module/interface';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { FilterText } from '@ui/filter/filterText';
import { useRouter } from 'next/router';
import { CellClickedEvent } from 'ag-grid-community';
import { ParsedUrlQuery } from 'querystring';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string; blockId: string }>
) => {
  const { params, query } = context;
  const serviceModule = useService<IModuleService>(SERVICE.Module);
  const serviceBlock = useService<IBlockService>(SERVICE.Block);

  const modules = (await serviceModule.getModules()) || null;
  const module = (await serviceModule.getModule(params?.id)) || null;
  const blocks =
    (await serviceBlock.getBlocksByModuleId(params?.id, query)) || null;
  const block = (await serviceBlock.getBlock(params?.blockId, query)) || null;

  return { props: { modules, module, blocks, block } };
};

const Block = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { modules, module, blocks, block } = props;
  const {
    setList: setModules,
    setData: setModule,
    setModuleData,
  } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);
  const {
    setList: setBlocks,
    setData: setBlock,
    setBlockData,
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
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_MODULE_BLOCKS.label,
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_MODULE_BLOCKS.path,
        query: {
          id: module?.id,
        },
      },
      disabled: !Boolean(module),
    },
    {
      label: block ? `${block?.title}. ${block.name}` : 'Not found',
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_MODULE_BLOCK.path,
        query: { id: module?.id, blockId: block?.id },
      },
      disabled: !Boolean(block),
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
      pathname: ROUTER_CONST_SCHOOL.ADMIN_MODULE_BLOCK.path,
      query,
    });
  };
  const onClose = async () => {
    await router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_MODULE.path,
      query: { id: module?.id },
    });
  };
  const onDelete = async () => {
    await clearBlock();
    await clearBlockData();
    await router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_MODULE_BLOCKS.path,
      query: { id: module?.id },
    });
  };
  const onNewCallback = (id: string) => {
    const query: ParsedUrlQuery = { id: module?.id, blockId: id };
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_MODULE_BLOCK.path,
      query,
    });
  };

  useEffect(() => {
    setModules(modules);
    setModule(module);
    setModuleData(module);
    setBlocks(blocks);
    setBlock(block);
    setBlockData(block);
  });

  return (
    <BlockPage
      breadCrumbs={breadCrumbs}
      filtersLeft={filtersLeft}
      onClick={onClick}
      onClose={onClose}
      onDelete={onDelete}
      // onNewCallback={onNewCallback}
    />
  );
};

Block.Layout = MasterSchool;
export default observer(Block);
