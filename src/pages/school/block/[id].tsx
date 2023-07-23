import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
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
import { BlockPage } from '@ui/pages/school/block/[id]/blockPage';

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
  const { setData: setBlock, clearData: clearBlock } =
    useViewModel<IBlockUserViewModel>(VIEW_MODEL.BlockUser);

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

  return <BlockPage />;
};

Block.Layout = MasterSchool;
export default observer(Block);
