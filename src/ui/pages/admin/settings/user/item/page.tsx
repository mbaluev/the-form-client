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
import { useRouter } from 'next/router';
import { SeparatorBase } from '@ui/layout/card/separator';
import { SubTitle } from '@ui/pages/admin/settings/user/item/subtitle';

export const PageUser = observer(() => {
  const { data, isDataLoading } = useUserItemStore();
  const router = useRouter();
  const id = router.query.id;
  const isCreate = id === 'create';
  if (isDataLoading)
    return (
      <Panel sx={{ p: 3 }}>
        <TabSkeleton />
      </Panel>
    );
  if (!data && !isCreate)
    return (
      <Panel sx={{ pt: 20 }}>
        <NoData icon={<NewspaperOutlinedIcon />} message="No content. Please select item" />
      </Panel>
    );
  return (
    <PageContent
      title={<Title />}
      subtitle={data && (data.active || data.paid || data.admin) && <SubTitle />}
      quick={<Quick />}
      separator={<SeparatorBase />}
    >
      <Content />
    </PageContent>
  );
});
