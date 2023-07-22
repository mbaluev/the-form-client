import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { useService } from '@hooks/useService';
import { IModuleService } from '@service/modules/entities/module/interface';
import { SERVICE } from '@service/ids';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ModulesPage } from '@ui/pages/school/module/index/modulesPage';
import { observer } from 'mobx-react';
import { getCookieToken } from '@utils/cookie/getCookieToken';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { query } = context;
  const token = getCookieToken(context);
  const serviceModule = useService<IModuleService>(SERVICE.Module);
  const modules = (await serviceModule.getModulesUser(query, token)) || [];
  return { props: { modules } };
};

const Module = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { modules } = props;
  const { setList: setModules, clearList: clearModules } =
    useViewModel<IModuleUserViewModel>(VIEW_MODEL.ModuleUser);

  useEffect(() => {
    setModules(modules);
    return () => {
      clearModules();
    };
  });

  return <ModulesPage />;
};

Module.Layout = MasterSchool;
export default observer(Module);
