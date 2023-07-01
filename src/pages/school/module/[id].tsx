import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { ModulePage } from '@ui/pages/school/module/[id]/modulePage';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { useService } from '@hooks/useService';
import { IModuleService } from '@service/modules/entities/module/interface';
import { SERVICE } from '@service/ids';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { Loader } from '@components/loader';
import { observer } from 'mobx-react';
import { getCookieToken } from '@utils/cookie/getCookieToken';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { params, query } = context;
  const id = params?.id;
  const token = getCookieToken(context);
  const serviceModule = useService<IModuleService>(SERVICE.Module);

  const modules = (await serviceModule.getModulesUser(query, token)) || null;
  const module =
    (await serviceModule.getModuleUser(id, undefined, token)) || null;

  return { props: { modules, module } };
};

const Module = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { modules, module } = props;
  const {
    setList: setModules,
    setData: setModule,
    clearList: clearModules,
    clearData: clearModule,
  } = useViewModel<IModuleUserViewModel>(VIEW_MODEL.ModuleUser);

  useEffect(() => {
    setModules(modules);
    setModule(module);
    return () => {
      clearModules();
      clearModule();
    };
  });

  const router = useRouter();
  if (router.isFallback || !module) return <Loader loading={true} relative />;
  return <ModulePage />;
};

Module.Layout = MasterSchool;
export default observer(Module);