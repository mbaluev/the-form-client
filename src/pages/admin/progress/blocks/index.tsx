import { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { observer } from 'mobx-react';
import { IBlockAdminViewModel } from '@viewModel/modules/entities/block/admin/interface';
import { useRouter } from 'next/router';
import { BlocksPage } from 'ui/pages/admin/progress/blocks/index/blocksPage';
import { IModuleAdminViewModel } from '@viewModel/modules/entities/module/admin/interface';

const UserBlocks = () => {
  const { getList: getBlocks, clearList: clearBlocks } = useViewModel<IBlockAdminViewModel>(
    VIEW_MODEL.BlockAdmin
  );
  const {
    getData: getModule,
    clearData: clearModule,
    data: userModule,
  } = useViewModel<IModuleAdminViewModel>(VIEW_MODEL.ModuleAdmin);

  const router = useRouter();
  const userModuleId = router.query.userModuleId as string;
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
    if (userModuleId) {
      getBlocks(router.query);
      getModule(userModuleId);
    }
    return () => {
      clearBlocks();
      clearModule();
    };
  }, [userModuleId]);

  return <BlocksPage breadCrumbs={breadCrumbs} />;
};

UserBlocks.Layout = MasterSchool;
export default observer(UserBlocks);
