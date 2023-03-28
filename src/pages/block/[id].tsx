import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { BlockPage } from '@ui/pages/block/blockPage';
import { useViewModel } from '@hooks/useViewModel';
import { IModuleViewModel } from '@viewModel/modules/module/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useService } from '@hooks/useService';
import { IModuleService } from '@service/modules/module/interface';
import { SERVICE } from '@service/ids';
import { IBlockService } from '@service/modules/block/interface';
import { observer } from 'mobx-react';
import { Loader } from '@components/loader';
import { useRouter } from 'next/router';
import { getCookieToken } from '@utils/cookie/getCookieToken';

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
  const { setData: setModule, setModuleData } = useViewModel<IModuleViewModel>(
    VIEW_MODEL.Module
  );
  const { setData: setBlock, setBlockData } = useViewModel<IBlockViewModel>(
    VIEW_MODEL.Block
  );
  useEffect(() => {
    setModule(module);
    setModuleData(module);
    setBlock(block);
    setBlockData(block);
  });
  const router = useRouter();
  if (router.isFallback || !block) return <Loader loading={true} relative />;
  return <BlockPage />;
};

Block.Layout = MasterSchool;
export default observer(Block);
