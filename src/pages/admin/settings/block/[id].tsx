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
import { FilterSelect } from '@ui/filter/filterSelect';
import { FilterText } from '@ui/filter/filterText';
import { useRouter } from 'next/router';
import { CellClickedEvent } from 'ag-grid-community';
import { ParsedUrlQuery } from 'querystring';
import { getCookieToken } from '@utils/cookie/getCookieToken';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { params, query } = context;
  const id = params?.id;
  const token = getCookieToken(context);
  const serviceBlock = useService<IBlockService>(SERVICE.Block);
  const serviceModule = useService<IModuleService>(SERVICE.Module);

  const blocks = (await serviceBlock.getBlocks(query, token)) || null;
  const block = (await serviceBlock.getBlock(id, undefined, token)) || null;
  const modules = (await serviceModule.getModules(undefined, token)) || null;

  return { props: { blocks, block, modules } };
};

const Block = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { blocks, block, modules } = props;
  const {
    setList: setBlocks,
    setData: setBlock,
    setBlockData,
    clearList: clearBlocks,
    clearData: clearBlock,
    clearBlockData,
  } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);
  const { setList: setModules, clearList: clearModules } =
    useViewModel<IModuleViewModel>(VIEW_MODEL.Module);

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCKS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCKS.path },
    },
    {
      label: block ? `${block?.title}. ${block.name}` : 'Not found',
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCK.path,
        query: { id: block?.id },
      },
      disabled: !Boolean(block),
    },
  ];
  const filtersLeft: JSX.Element[] = [
    <FilterSelect
      name="moduleId"
      placeholder="Module"
      style={{ flexBasis: '50%' }}
      items={modules?.map((item) => {
        return {
          value: item.id,
          label: item.title,
        };
      })}
    />,
    <FilterText
      name="search"
      placeholder="Search"
      style={{ flexBasis: '50%' }}
    />,
  ];
  const router = useRouter();
  const onClick = (params: CellClickedEvent) => {
    const query: ParsedUrlQuery = { ...router.query, id: params.data.id };
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCK.path,
      query,
    });
  };
  const onClose = async () => {
    await router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCKS.path,
    });
  };
  const onDelete = async () => {
    await clearBlock();
    await clearBlockData();
    await router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCKS.path,
    });
  };
  const onNewCallback = (id: string) => {
    const query: ParsedUrlQuery = { id: id };
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCK.path,
      query,
    });
  };

  useEffect(() => {
    setBlocks(blocks);
    setBlock(block);
    setBlockData(block);
    setModules(modules);
    return () => {
      clearBlocks();
      clearBlock();
      clearBlockData();
      clearModules();
    };
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
