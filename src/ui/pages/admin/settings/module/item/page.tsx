import { PageContent } from '@ui/layout/page/pageContent';
import { Title } from '@ui/pages/admin/settings/module/item/title';
import { Quick } from '@ui/pages/admin/settings/module/item/quick';
import { Details } from '@ui/pages/admin/settings/module/item/details';
import { observer } from 'mobx-react';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';
import NoData from '@components/noData';
import { Panel } from '@ui/layout/page/panel';
import { useRouter } from 'next/router';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useModuleItemStore } from '@store/modules/entities/module/item/useModuleItemStore';
import { SubTitle } from '@ui/pages/admin/settings/module/item/subtitle';
import { Tabs } from '@ui/pages/admin/settings/module/item/tabs';
import { Separator } from '@ui/pages/admin/settings/module/item/separator';

export const PageModule = observer(() => {
  const { data, isDataLoading } = useModuleItemStore();
  const router = useRouter();
  const id = router.query.slug?.[0];
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
        <NoData icon={<SearchOffIcon />} message="No content. Please select item" />
      </Panel>
    );
  return (
    <PageContent
      title={<Title />}
      quick={<Quick />}
      subtitle={<SubTitle />}
      separator={<Separator />}
    >
      {isCreate ? <Details /> : <Tabs />}
    </PageContent>
  );
});