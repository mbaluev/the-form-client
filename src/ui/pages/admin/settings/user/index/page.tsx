import { PageContent } from '@ui/layout/page/pageContent';
import { Quick } from '@ui/pages/admin/settings/user/index/quick';
import { Title } from '@ui/pages/admin/settings/user/index/title';
import { SubTitle } from '@ui/pages/admin/settings/user/index/subtitle';
import { SeparatorBase } from '@ui/layout/card/separator';

export const PageUsers = () => {
  return (
    <PageContent
      title={<Title />}
      subtitle={<SubTitle />}
      quick={<Quick />}
      separator={<SeparatorBase />}
    >
      users
    </PageContent>
  );
};
