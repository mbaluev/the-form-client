import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { BlockPage } from 'ui/pages/school/block/[id]/blockPage';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useService } from '@hooks/useService';
import { IModuleService } from '@service/modules/entities/module/interface';
import { SERVICE } from '@service/ids';
import { IBlockService } from '@service/modules/entities/block/interface';
import { observer } from 'mobx-react';
import { getCookieToken } from '@utils/cookie/getCookieToken';
import { IModuleAdminViewModel } from '@viewModel/modules/entities/module/admin/interface';
import { IBlockAdminViewModel } from '@viewModel/modules/entities/block/admin/interface';
import { IMaterialAdminViewModel } from '@viewModel/modules/entities/material/admin/interface';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { params } = context;
  const token = getCookieToken(context);

  const serviceModule = useService<IModuleService>(SERVICE.Module);
  const serviceBlock = useService<IBlockService>(SERVICE.Block);

  const query = { userBlockId: params?.id };
  const userModule =
    (await serviceModule.getModuleUser(undefined, query, token)) || null;
  const userBlock =
    (await serviceBlock.getBlockAdmin(query.userBlockId, undefined, token)) ||
    null;

  return {
    props: { userModule, userBlock },
    notFound: !Boolean(userModule) || !Boolean(userBlock),
  };
};

const Block = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { userModule, userBlock } = props;
  const { setData: setModule, clearData: clearModule } =
    useViewModel<IModuleAdminViewModel>(VIEW_MODEL.ModuleAdmin);
  const {
    tab,
    setData: setBlock,
    clearData: clearBlock,
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

  useEffect(() => {
    setModule(userModule);
    setBlock(userBlock);
    return () => {
      clearModule();
      clearBlock();
      clearMaterial();
      clearTask();
      clearQuestion();
    };
  });

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_USER_BLOCKS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_USER_BLOCKS.path },
    },
    {
      label:
        userModule && userBlock
          ? `${userBlock.user?.username} - 
             ${userModule.module?.title}. ${userModule.module?.name} - 
             ${userBlock.block?.title}. ${userBlock.block?.name}`
          : 'loading...',
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_USER_BLOCK.path,
        query: { id: userBlock?.id },
      },
    },
  ];

  return (
    <BlockPage
      userModule={userModule}
      userBlock={userBlock}
      breadCrumbs={breadCrumbs}
      tab={tab}
    />
  );
};

Block.Layout = MasterSchool;
export default observer(Block);
