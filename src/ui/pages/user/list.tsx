import { PageContent } from '@ui/layout/page/pageContent';
import { Quick } from '@ui/pages/user/quick';
import { Title } from '@ui/pages/user/title';
import { SubTitle } from '@ui/pages/user/subtitle';
import { Tabs } from '@ui/pages/user/tabs';
import { SeparatorBase } from '@ui/layout/card/separator';

export const UserList = () => {
  return (
    <PageContent
      title={<Title />}
      subtitle={<SubTitle />}
      quick={<Quick />}
      separator={<SeparatorBase />}
    >
      <Tabs />
    </PageContent>
  );
};
