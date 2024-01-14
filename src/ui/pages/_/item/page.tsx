import { PageContent } from '@ui/layout/page/pageContent';
import { Title } from '@ui/pages/_/item/title';
import { SubTitle } from '@ui/pages/_/item/subtitle';
import { Quick } from '@ui/pages/_/item/quick';
import { Tabs } from '@ui/pages/_/item/tabs';

export const PageUser = () => {
  return (
    <PageContent title={<Title />} subtitle={<SubTitle />} quick={<Quick />}>
      <Tabs />
    </PageContent>
  );
};
