import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useService } from '@hooks/useService';
import { IModuleService } from '@service/modules/entities/module/interface';
import { SERVICE } from '@service/ids';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useViewModel } from '@hooks/useViewModel';
import { IModuleViewModel } from '@viewModel/modules/entities/module/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { ModulePage } from '@ui/pages/admin/module/modulePage';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { getCookieToken } from '@utils/cookie/getCookieToken';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { query } = context;
  const token = getCookieToken(context);
  const serviceModule = useService<IModuleService>(SERVICE.Module);

  const modules = (await serviceModule.getModules(query, token)) || [];

  return { props: { modules } };
};

const Modules = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { modules } = props;
  const { setList: setModules, clearList: clearModules } =
    useViewModel<IModuleViewModel>(VIEW_MODEL.Module);

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_MODULES.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_MODULES.path },
    },
  ];
  const router = useRouter();
  const onNewCallback = (id: string) => {
    const query: ParsedUrlQuery = { moduleId: id };
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_MODULE.path,
      query,
    });
  };

  useEffect(() => {
    setModules(modules);
    return () => {
      clearModules();
    };
  });

  return (
    <ModulePage
      breadCrumbs={breadCrumbs}
      // onNewCallback={onNewCallback}
    />
  );
};

Modules.Layout = MasterSchool;
export default observer(Modules);
