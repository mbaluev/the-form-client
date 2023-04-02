import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { BlockPage } from '@ui/pages/block/blockPage';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useService } from '@hooks/useService';
import { IModuleService } from '@service/modules/module/interface';
import { SERVICE } from '@service/ids';
import { IBlockService } from '@service/modules/block/interface';
import { observer } from 'mobx-react';
import { Loader } from '@components/loader';
import { useRouter } from 'next/router';
import { getCookieToken } from '@utils/cookie/getCookieToken';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';
import { IModuleUserViewModel } from '@viewModel/modules/module/user/interface';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { params } = context;
  const id = params?.id;
  const token = getCookieToken(context);

  const serviceModule = useService<IModuleService>(SERVICE.Module);
  const serviceBlock = useService<IBlockService>(SERVICE.Block);

  const query = { blockId: params?.id };
  const module = (await serviceModule.getModuleUser(id, query, token)) || null;
  const block =
    (await serviceBlock.getBlockUser(query.blockId, undefined, token)) || null;

  return {
    props: { module, block },
    notFound: !Boolean(module) || !Boolean(block),
  };
};

const Block = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { module, block } = props;
  const { setData: setModule } = useViewModel<IModuleUserViewModel>(
    VIEW_MODEL.ModuleUser
  );
  const { setData: setBlock } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  useEffect(() => {
    setModule(module);
    setBlock(block);
  });
  const router = useRouter();
  if (router.isFallback || !block) return <Loader loading={true} relative />;
  return <BlockPage />;
};

Block.Layout = MasterSchool;
export default observer(Block);
