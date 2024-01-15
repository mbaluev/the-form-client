import { PageContent } from '@ui/layout/page/pageContent';
import { Title } from '@ui/pages/admin/settings/user/item/title';
import { Quick } from '@ui/pages/admin/settings/user/item/quick';
import { Content } from '@ui/pages/admin/settings/user/item/content';
import { observer } from 'mobx-react';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';
import NoData from '@components/noData';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import { Panel } from '@ui/layout/page/panel';

export const PageUser = observer(() => {
  const { data, isDataLoading } = useUserItemStore();
  if (isDataLoading)
    return (
      <Panel sx={{ p: 3 }}>
        <TabSkeleton />
      </Panel>
    );
  if (!data)
    return (
      <Panel sx={{ pt: 20 }}>
        <NoData icon={<NewspaperOutlinedIcon />} message="No content. Please select item" />
      </Panel>
    );
  return (
    <PageContent title={<Title />} quick={<Quick />}>
      <Content />
    </PageContent>
  );
});
