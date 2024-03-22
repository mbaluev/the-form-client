import { PageContent } from '@ui/layout/page/pageContent';
import { Title } from '@ui/pages/settings/user/item/title';
import { Quick } from '@ui/pages/settings/user/item/quick';
import { observer } from 'mobx-react';
import { useUserSettingsItemStore } from '@store/modules/settings/user/item/hook';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';
import NoData from '@components/noData';
import { Panel } from '@ui/layout/page/panel';
import { useRouter } from 'next/router';
import { SubTitle } from '@ui/pages/settings/user/item/subtitle';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Separator } from '@ui/pages/settings/user/item/separator';
import { Details } from '@ui/pages/settings/user/item/details';
import { ROUTES } from '@settings/routes';

export const PageUser = observer(() => {
  const { data, isDataLoading } = useUserSettingsItemStore();

  const router = useRouter();
  const isCreate = router.pathname === ROUTES.SETTINGS_USER_CREATE.path;

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
      <Details />
    </PageContent>
  );
});
