import { PageContent } from '@ui/layout/page/pageContent';
import { Quick } from '@ui/pages/user/quick';
import { Title } from '@ui/pages/user/title';
import { SubTitle } from '@ui/pages/user/subtitle';
import { Content } from '@ui/pages/user/content';

export const User = () => {
  return (
    <PageContent title={<Title />} subtitle={<SubTitle />} quick={<Quick />}>
      <Content />
    </PageContent>
  );
};
