import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { PageContent } from '@ui/layout/page/pageContent';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';
import { Panel } from '@ui/layout/page/panel';
import NoData from '@components/noData';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useBlockSettingsItemStore } from '@store/modules/settings/block/item/hook';
import { Tabs } from '@ui/pages/settings/block/item/tabs';
import { Title } from '@ui/pages/settings/block/item/title';
import { Quick } from '@ui/pages/settings/block/item/quick';
import { Details } from '@ui/pages/settings/block/item/details';
import { SubTitle } from '@ui/pages/settings/block/item/subtitle';
import { Separator } from '@ui/pages/settings/block/item/separator';
import { ROUTES } from '@settings/routes';

export const PageBlock = observer(() => {
  const { data, isDataLoading } = useBlockSettingsItemStore();

  const router = useRouter();
  const isCreate = router.pathname === ROUTES.SETTINGS_BLOCK_CREATE.path;

  if (!isCreate) {
    if (isDataLoading) {
      return (
        <Panel sx={{ p: 3 }}>
          <TabSkeleton />
        </Panel>
      );
    }
    if (!data) {
      return (
        <Panel sx={{ pt: 20 }}>
          <NoData icon={<SearchOffIcon />} message="No content. Please select item" />
        </Panel>
      );
    }
  }

  return (
    <PageContent
      title={<Title />}
      subtitle={<SubTitle />}
      quick={<Quick />}
      separator={<Separator />}
    >
      {isCreate ? <Details /> : <Tabs />}
    </PageContent>
  );
});
