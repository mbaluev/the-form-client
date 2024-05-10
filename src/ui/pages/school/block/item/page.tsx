import { observer } from 'mobx-react';
import { PageContent } from '@ui/layout/page/pageContent';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';
import { Panel } from '@ui/layout/page/panel';
import NoData from '@components/noData';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Tabs } from '@ui/pages/school/block/item/tabs';
import { useBlockSchoolItemStore } from '@store/modules/school/block/item/hook';
import { TitleBlock } from '@ui/components/title/titleBlock';
import { SubTitleBlock } from '@ui/components/subTitle/subTitleBlock';
import { ProgressBar } from '@ui/components/progress';
import { getProgress } from '@ui/components/progress/getProgress';
import { ErrorCode } from '@ui/layout/page/errorCode';

export const PageBlock = observer(() => {
  const { data: userBlock, isDataLoading } = useBlockSchoolItemStore();
  const progressValues = [
    Boolean(userBlock?.completeMaterials),
    Boolean(userBlock?.completeQuestions),
    Boolean(userBlock?.completeTasks),
  ];
  const progress = getProgress(progressValues);

  if (isDataLoading) {
    return (
      <Panel sx={{ p: 3 }}>
        <TabSkeleton />
      </Panel>
    );
  }

  if (!userBlock) {
    return (
      <Panel sx={{ pt: 20 }}>
        <NoData icon={<SearchOffIcon />} message="No content. Block not found" />
      </Panel>
    );
  }

  if (!userBlock.enable) {
    return <ErrorCode code="403" description="Access denied" />;
  }

  return (
    <PageContent
      title={<TitleBlock userBlock={userBlock} />}
      subtitle={<SubTitleBlock userBlock={userBlock} />}
      quick={<ProgressBar value={progress} sx={{ margin: 1, width: 150 }} />}
    >
      <Tabs />
    </PageContent>
  );
});
