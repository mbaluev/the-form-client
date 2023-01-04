import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { useService } from '@hooks/useService';
import { SERVICE } from '@service/ids';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { observer } from 'mobx-react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { IUserService } from '@service/modules/user/interface';
import { IUserViewModel } from '@viewModel/modules/user/interface';
import { UserPage } from '@ui/pages/admin/user/userPage';
import { getCookieToken } from '@utils/cookie/getCookieToken';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { params, query } = context;
  const token = getCookieToken(context);

  const serviceUser = useService<IUserService>(SERVICE.User);

  const users = (await serviceUser.getUsers(query, token)) || null;
  const user = (await serviceUser.getUser(params?.id, query, token)) || null;

  return { props: { users, user, token } };
};

const User = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { users, user } = props;
  const {
    setList: setUsers,
    setData: setUser,
    setUserData,
  } = useViewModel<IUserViewModel>(VIEW_MODEL.User);

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_USERS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_USERS.path },
    },
    {
      label: user ? user.username : 'Not found',
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_USER.path,
        query: { id: user?.id },
      },
      disabled: !Boolean(user),
    },
  ];
  const router = useRouter();
  const onNewCallback = (id: string) => {
    const query: ParsedUrlQuery = { id };
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_USER.path,
      query,
    });
  };

  useEffect(() => {
    setUsers(users);
    setUser(user);
    setUserData(user);
  });

  return (
    <UserPage
      breadCrumbs={breadCrumbs}
      // onNewCallback={onNewCallback}
    />
  );
};

User.Layout = MasterSchool;
export default observer(User);
