import { ReactNode, useEffect } from 'react';
import { MENU_CONFIG_DEV } from '@app/settings/menu/dev';
import { Layout } from '@ui/layout/layout';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import cookie from '@utils/cookie';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';

interface IProps {
  children?: ReactNode;
}

export const MasterDev = (props: IProps) => {
  const { children } = props;

  const router = useRouter();
  useEffect(() => {
    const token = getCookie(cookie.names.token);
    if (!token)
      router.push({
        pathname: ROUTER_CONST_SCHOOL.ACCOUNT_SIGN_IN.path,
      });
  }, [router.asPath]);

  return (
    <Layout
      menuProps={{ items: MENU_CONFIG_DEV }}
      notifications
      globalSearch
      support
    >
      {children}
    </Layout>
  );
};
