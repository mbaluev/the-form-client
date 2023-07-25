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
import { IUserService } from '@service/modules/entities/user/interface';
import { IUserAdminViewModel } from '@viewModel/modules/entities/user/admin/interface';
import { Page } from '@ui/layout/page';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const token = getCookieToken(context);
  const serviceUser = useService<IUserService>(SERVICE.User);

  const users = (await serviceUser.getUsersAdmin(undefined, token)) || null;

  return { props: { users } };
};

const Users = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { users } = props;
  const { setList: setUsers, clearList: clearUsers } =
    useViewModel<IUserAdminViewModel>(VIEW_MODEL.UserAdmin);

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_USERS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_USERS.path },
    },
  ];

  useEffect(() => {
    setUsers(users);
    return () => {
      clearUsers();
    };
  });

  return (
    <Page
      title={ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_USERS.label}
      breadCrumbs={breadCrumbs}
      padding={false}
    />
  );
};

Users.Layout = MasterSchool;
export default observer(Users);
