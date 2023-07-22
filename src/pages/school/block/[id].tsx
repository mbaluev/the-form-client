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
import { IBlockUserViewModel } from '@viewModel/modules/entities/block/user/interface';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';
import { IMaterialUserViewModel } from '@viewModel/modules/entities/material/user/interface';
import { ITaskUserViewModel } from '@viewModel/modules/entities/task/user/interface';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';
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
    (await serviceBlock.getBlockUser(query.userBlockId, undefined, token)) ||
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
    useViewModel<IModuleUserViewModel>(VIEW_MODEL.ModuleUser);
  const {
    tab,
    setData: setBlock,
    clearData: clearBlock,
  } = useViewModel<IBlockUserViewModel>(VIEW_MODEL.BlockUser);

  const { clearData: clearMaterial } = useViewModel<IMaterialUserViewModel>(
    VIEW_MODEL.MaterialUser
  );
  const { clearData: clearTask } = useViewModel<ITaskUserViewModel>(
    VIEW_MODEL.TaskUser
  );
  const { clearData: clearQuestion } = useViewModel<IQuestionUserViewModel>(
    VIEW_MODEL.QuestionUser
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
      label: ROUTER_CONST_SCHOOL.SCHOOL_MODULES.label,
      url: { pathname: ROUTER_CONST_SCHOOL.SCHOOL_MODULES.path },
    },
    {
      label: userModule
        ? `${userModule.module?.title}. ${userModule.module?.name}`
        : 'loading...',
      url: {
        pathname: ROUTER_CONST_SCHOOL.SCHOOL_MODULE.path,
        query: { id: userModule?.id },
      },
    },
    {
      label: userBlock
        ? `${userBlock.block?.title}. ${userBlock.block?.name}`
        : 'loading...',
      url: {
        pathname: ROUTER_CONST_SCHOOL.SCHOOL_BLOCK.path,
        query: { id: userBlock?.id },
      },
      // neighbors: userModule?.userBlocks?.map((d) => {
      //   return {
      //     label: `${d.block?.title}. ${d.block?.name}`,
      //     url: {
      //       pathname: ROUTER_CONST_SCHOOL.SCHOOL_BLOCK.path,
      //       query: { id: d.id },
      //     },
      //     disabled: !d.enable,
      //     complete: d.complete,
      //     selected: d.id === userBlock?.id,
      //   };
      // }),
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
