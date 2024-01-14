import { PageContent } from '@ui/layout/page/pageContent';
import { Title } from '@ui/pages/admin/settings/user/index/title';
import { SeparatorBase } from '@ui/layout/card/separator';
import { UsersList } from '@ui/pages/admin/settings/user/index/list';

export const PageUsers = () => {
  return (
    <PageContent title={<Title />} separator={<SeparatorBase />}>
      <UsersList />
    </PageContent>
  );
};
