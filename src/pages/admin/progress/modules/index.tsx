import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { useService } from '@hooks/useService';
import { SERVICE } from '@service/ids';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { observer } from 'mobx-react';
import { getCookieToken } from '@utils/cookie/getCookieToken';
import { IModuleService } from '@service/modules/entities/module/interface';
import { IModuleAdminViewModel } from '@viewModel/modules/entities/module/admin/interface';
import { ModulesPage } from '@ui/pages/admin/progress/modules/modulesPage';
import { useRouter } from 'next/router';
import { IUserService } from '@service/modules/entities/user/interface';
import { IUserAdminViewModel } from '@viewModel/modules/entities/user/admin/interface';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const userId = query.userId as string;
  let user;

  const token = getCookieToken(context);
  const serviceModule = useService<IModuleService>(SERVICE.Module);
  const serviceUser = useService<IUserService>(SERVICE.User);

  const userModules =
    (await serviceModule.getModulesAdmin(query, token)) || null;
  if (userId)
    user = (await serviceUser.getUser(userId, undefined, token)) || null;

  return { props: { userModules, user } };
};

const Modules = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { userModules, user } = props;
  const { setList: setModules, clearList: clearModules } =
    useViewModel<IModuleAdminViewModel>(VIEW_MODEL.ModuleAdmin);
  const { setData: setUser, clearData: clearUser } =
    useViewModel<IUserAdminViewModel>(VIEW_MODEL.UserAdmin);

  const router = useRouter();
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
      label: user
        ? user.username
        : ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_MODULES.label,
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_MODULES.path,
        query: router.query,
      },
    },
  ];

  useEffect(() => {
    setModules(userModules);
    setUser(user);
    return () => {
      clearModules();
      clearUser();
    };
  });

  return <ModulesPage breadCrumbs={breadCrumbs} />;
};

Modules.Layout = MasterSchool;
export default observer(Modules);
