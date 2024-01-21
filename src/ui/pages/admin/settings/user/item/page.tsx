import { PageContent } from '@ui/layout/page/pageContent';
import { Title } from '@ui/pages/admin/settings/user/item/title';
import { Quick } from '@ui/pages/admin/settings/user/item/quick';
import { Content } from '@ui/pages/admin/settings/user/item/content';
import { observer } from 'mobx-react';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';
import NoData from '@components/noData';
import { Panel } from '@ui/layout/page/panel';
import { useRouter } from 'next/router';
import { SeparatorBase } from '@ui/layout/card/separator';
import { SubTitle } from '@ui/pages/admin/settings/user/item/subtitle';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useFormContext, useWatch } from 'react-hook-form';
import { IUserDTO } from '@model/entities/user';

export const PageUser = observer(() => {
  const { isDataLoading } = useUserItemStore();

  const router = useRouter();
  const id = router.query.id;
  const isCreate = id === 'create';

  const { control } = useFormContext<IUserDTO>();
  const hasData = useWatch({ control, name: 'id' });

  if (isDataLoading) {
    return (
      <Panel sx={{ p: 3 }}>
        <TabSkeleton />
      </Panel>
    );
  }
  if (!hasData && !isCreate) {
    return (
      <Panel sx={{ pt: 20 }}>
        <NoData icon={<SearchOffIcon />} message="No content. Please select item" />
      </Panel>
    );
  }

  return (
    <PageContent
      title={<Title />}
      subtitle={<SubTitle />}
      quick={<Quick />}
      separator={<SeparatorBase />}
    >
      <Content />
    </PageContent>
  );
});
