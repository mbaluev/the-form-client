import { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { IModuleAdminViewModel } from '@viewModel/modules/entities/module/admin/interface';
import { IBlockAdminViewModel } from '@viewModel/modules/entities/block/admin/interface';
import { IMaterialAdminViewModel } from '@viewModel/modules/entities/material/admin/interface';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';
import { BlockPage } from '@ui/pages/admin/progress/blocks/[id]/blockPage';
import { useRouter } from 'next/router';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';

const Block = () => {
  const {
    getData: getModule,
    clearData: clearModule,
    data: userModule,
  } = useViewModel<IModuleAdminViewModel>(VIEW_MODEL.ModuleAdmin);
  const {
    getData: getBlock,
    clearData: clearBlock,
    data: userBlock,
  } = useViewModel<IBlockAdminViewModel>(VIEW_MODEL.BlockAdmin);

  const { clearData: clearMaterial } = useViewModel<IMaterialAdminViewModel>(
    VIEW_MODEL.MaterialAdmin
  );
  const { clearData: clearTask } = useViewModel<ITaskAdminViewModel>(
    VIEW_MODEL.TaskAdmin
  );
  const { clearData: clearQuestion } = useViewModel<IQuestionAdminViewModel>(
    VIEW_MODEL.QuestionAdmin
  );

  const router = useRouter();
  const userBlockId = router.query.id as string;
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
        query: { userModuleId: userModule?.id },
      },
    },
    {
      label:
        userBlock && userBlock.block
          ? userBlock.block.name
          : ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_BLOCK.label,
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_BLOCK.path,
        query: router.query,
      },
    },
  ];

  useEffect(() => {
    if (userBlockId) {
      getModule(undefined, { userBlockId });
      getBlock(userBlockId);
    }
    return () => {
      clearModule();
      clearBlock();
      clearMaterial();
      clearTask();
      clearQuestion();
    };
  }, [userBlockId]);

  return <BlockPage breadCrumbs={breadCrumbs} />;
};

Block.Layout = MasterSchool;
export default observer(Block);
