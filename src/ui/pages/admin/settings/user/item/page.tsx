import { PageContent } from '@ui/layout/page/pageContent';
import { Title } from '@ui/pages/admin/settings/user/item/title';
import { Quick } from '@ui/pages/admin/settings/user/item/quick';
import { Content } from '@ui/pages/admin/settings/user/item/content';

export const PageUser = () => {
  return (
    <PageContent title={<Title />} quick={<Quick />}>
      <Content />
    </PageContent>
  );
};
