import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { useService } from '@hooks/useService';
import { SERVICE } from '@service/ids';
import { IBlockService } from '@service/modules/entities/block/interface';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { observer } from 'mobx-react';
import { getCookieToken } from '@utils/cookie/getCookieToken';
import { IBlockAdminViewModel } from '@viewModel/modules/entities/block/admin/interface';
import { IModuleService } from '@service/modules/entities/module/interface';
import { useRouter } from 'next/router';
import { BlocksPage } from 'ui/pages/admin/progress/blocks/index/blocksPage';
import { IModuleAdminViewModel } from '@viewModel/modules/entities/module/admin/interface';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const userModuleId = query.userModuleId as string;
  let userModule = null;

  const token = getCookieToken(context);
  const serviceBlock = useService<IBlockService>(SERVICE.Block);
  const serviceModule = useService<IModuleService>(SERVICE.Module);

  const userBlocks = (await serviceBlock.getBlocksAdmin(query, token)) || null;
  if (userModuleId)
    userModule =
      (await serviceModule.getModuleAdmin(userModuleId, undefined, token)) ||
      null;

  return { props: { userBlocks, userModule } };
};

const UserBlocks = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { userBlocks, userModule } = props;
  const { setList: setBlocks, clearList: clearBlocks } =
    useViewModel<IBlockAdminViewModel>(VIEW_MODEL.BlockAdmin);
  const { setData: setModule, clearData: clearModule } =
    useViewModel<IModuleAdminViewModel>(VIEW_MODEL.ModuleAdmin);

  const router = useRouter();
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_USERS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_USERS.path },
    },
    {
      label:
        userModule && userModule.user
          ? userModule.user.username
          : ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_MODULES.label,
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_MODULES.path,
        query: { userId: userModule?.userId },
      },
    },
    {
      label:
        userModule && userModule.module
          ? userModule.module.name
          : ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_BLOCKS.label,
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_BLOCKS.path,
        query: router.query,
      },
    },
  ];

  useEffect(() => {
    setBlocks(userBlocks);
    setModule(userModule);
    return () => {
      clearBlocks();
      clearModule();
    };
  });

  return <BlocksPage breadCrumbs={breadCrumbs} />;
};

UserBlocks.Layout = MasterSchool;
export default observer(UserBlocks);
