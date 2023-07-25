import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useService } from '@hooks/useService';
import { SERVICE } from '@service/ids';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { IUserService } from '@service/modules/entities/user/interface';
import { IUserViewModel } from '@viewModel/modules/entities/user/interface';
import { UserPage } from '@ui/pages/admin/settings/user/userPage';
import { observer } from 'mobx-react';
import { getCookieToken } from '@utils/cookie/getCookieToken';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { query } = context;
  const token = getCookieToken(context);
  const serviceUser = useService<IUserService>(SERVICE.User);

  const users = (await serviceUser.getUsers(query, token)) || null;

  return { props: { users } };
};

const Users = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { users } = props;
  const { setList: setUsers, clearList: clearUsers } =
    useViewModel<IUserViewModel>(VIEW_MODEL.User);

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USERS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USERS.path },
    },
  ];
  const router = useRouter();
  const onNewCallback = (id: string) => {
    const query: ParsedUrlQuery = { id };
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USER.path,
      query,
    });
  };

  useEffect(() => {
    setUsers(users);
    return () => {
      clearUsers();
    };
  });

  return (
    <UserPage
      breadCrumbs={breadCrumbs}
      // onNewCallback={onNewCallback}
    />
  );
};

Users.Layout = MasterSchool;
export default observer(Users);
