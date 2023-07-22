import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { ModulePage } from '@ui/pages/school/module/[id]/modulePage';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { useService } from '@hooks/useService';
import { IModuleService } from '@service/modules/entities/module/interface';
import { SERVICE } from '@service/ids';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { observer } from 'mobx-react';
import { getCookieToken } from '@utils/cookie/getCookieToken';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { params } = context;
  const id = params?.id;
  const token = getCookieToken(context);
  const serviceModule = useService<IModuleService>(SERVICE.Module);

  const module =
    (await serviceModule.getModuleUser(id, undefined, token)) || null;

  return { props: { module } };
};

const Module = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { module } = props;
  const { setData: setModule, clearData: clearModule } =
    useViewModel<IModuleUserViewModel>(VIEW_MODEL.ModuleUser);

  useEffect(() => {
    setModule(module);
    return () => {
      clearModule();
    };
  });

  return <ModulePage />;
};

Module.Layout = MasterSchool;
export default observer(Module);
