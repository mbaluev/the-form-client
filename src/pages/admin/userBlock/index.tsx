import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { useService } from '@hooks/useService';
import { SERVICE } from '@service/ids';
import { IBlockService } from '@service/modules/entities/block/interface';
import { IModuleService } from '@service/modules/entities/module/interface';
import { IModuleViewModel } from '@viewModel/modules/entities/module/interface';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { FilterSelect } from '@ui/filter/filterSelect';
import { FilterText } from '@ui/filter/filterText';
import { observer } from 'mobx-react';
import { getCookieToken } from '@utils/cookie/getCookieToken';
import { IBlockAdminViewModel } from '@viewModel/modules/entities/block/admin/interface';
import { UserBlocksPage } from '@ui/pages/admin/userBlock/index/userBlocksPage';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { query } = context;
  const token = getCookieToken(context);
  const serviceBlock = useService<IBlockService>(SERVICE.Block);
  const serviceModule = useService<IModuleService>(SERVICE.Module);

  const userBlocks = (await serviceBlock.getBlocksAdmin(query, token)) || null;
  const modules = (await serviceModule.getModules(undefined, token)) || null;

  return { props: { userBlocks, modules } };
};

const UserBlocks = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { userBlocks: blocksAdmin, modules } = props;
  const { setList: setBlocksAdmin, clearList: clearBlocksAdmin } =
    useViewModel<IBlockAdminViewModel>(VIEW_MODEL.BlockAdmin);
  const { setList: setModules, clearList: clearModules } =
    useViewModel<IModuleViewModel>(VIEW_MODEL.Module);

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_USER_BLOCKS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_USER_BLOCKS.path },
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

  useEffect(() => {
    setBlocksAdmin(blocksAdmin);
    setModules(modules);
    return () => {
      clearBlocksAdmin();
      clearModules();
    };
  });

  return <UserBlocksPage breadCrumbs={breadCrumbs} />;
};

UserBlocks.Layout = MasterSchool;
export default observer(UserBlocks);
