import { PageContent } from '@ui/layout/page/pageContent';
import { Title } from '@ui/pages/admin/settings/user/item/title';
import { SubTitle } from '@ui/pages/admin/settings/user/item/subtitle';
import { Quick } from '@ui/pages/admin/settings/user/item/quick';
import { Tabs } from '@ui/pages/admin/settings/user/item/tabs';

export const PageUser = () => {
  return (
    <PageContent title={<Title />} subtitle={<SubTitle />} quick={<Quick />}>
      <Tabs />
    </PageContent>
  );
};
