import { Layout } from '@ui/layout/layout';
import { observer } from 'mobx-react';
import { ReactNode } from 'react';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import { Intro } from '@ui/pages/index/intro';
import { Page } from '@ui/layout/page';

interface IProps {
  children?: ReactNode;
}

export const MasterAuth = observer((props: IProps) => {
  const { children } = props;
  const { isAuth } = useAuthStore();
  return (
    <Layout>
      {isAuth ? (
        children
      ) : (
        <Page>
          <Intro />
        </Page>
      )}
    </Layout>
  );
});
