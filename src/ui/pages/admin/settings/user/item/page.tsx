import { PageContent } from '@ui/layout/page/pageContent';
import { Title } from '@ui/pages/admin/settings/user/item/title';
import { Quick } from '@ui/pages/admin/settings/user/item/quick';
import { Content } from '@ui/pages/admin/settings/user/item/content';
import { observer } from 'mobx-react';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';
import Custom204 from '@pages/204';

export const PageUser = observer(() => {
  const { data } = useUserItemStore();
  if (!data) return <Custom204 />;
  return (
    <PageContent title={<Title />} quick={<Quick />}>
      <Content />
    </PageContent>
  );
});
