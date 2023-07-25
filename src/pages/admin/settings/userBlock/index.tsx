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
import { UserBlocksPage } from '@ui/pages/admin/settings/userBlock/index/userBlocksPage';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const token = getCookieToken(context);
  const serviceBlock = useService<IBlockService>(SERVICE.Block);

  const userBlocks =
    (await serviceBlock.getBlocksAdmin(undefined, token)) || null;

  return { props: { userBlocks } };
};

const UserBlocks = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { userBlocks } = props;
  const { setList: setBlocks, clearList: clearBlocks } =
    useViewModel<IBlockAdminViewModel>(VIEW_MODEL.BlockAdmin);

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USER_BLOCKS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USER_BLOCKS.path },
    },
  ];

  useEffect(() => {
    setBlocks(userBlocks);
    return () => {
      clearBlocks();
    };
  });

  return <UserBlocksPage breadCrumbs={breadCrumbs} />;
};

UserBlocks.Layout = MasterSchool;
export default observer(UserBlocks);
