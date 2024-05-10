import { PageContent } from '@ui/layout/page/pageContent';
import { SeparatorBase } from '@ui/layout/card/separator';
import { observer } from 'mobx-react';
import { ProgressBar } from '@ui/components/progress';
import { getProgress } from '@ui/components/progress/getProgress';
import { Panel } from '@ui/layout/page/panel';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';
import { useModuleSchoolItemStore } from '@store/modules/school/module/item/hook';
import { TitleModule } from '@ui/components/title/titleModule';
import { SubTitleModule } from '@ui/components/subTitle/subTitleModule';
import { ModuleGrid } from '@ui/pages/school/module/item/grid';

export const PageSchoolModule = observer(() => {
  const { data: userModule, isDataLoading } = useModuleSchoolItemStore();
  const progressValues = userModule?.userBlocks?.reduce(
    (prev: boolean[], curr) =>
      prev.concat([
        Boolean(curr.completeMaterials),
        Boolean(curr.completeQuestions),
        Boolean(curr.completeTasks),
      ]),
    []
  );
  const progress = getProgress(progressValues);

  if (isDataLoading) {
    return (
      <Panel sx={{ p: 3 }}>
        <TabSkeleton />
      </Panel>
    );
  }

  return (
    <PageContent
      separator={<SeparatorBase />}
      title={<TitleModule userModule={userModule} />}
      subtitle={<SubTitleModule userModule={userModule} />}
      quick={<ProgressBar value={progress} sx={{ margin: 1, width: 200 }} />}
    >
      <ModuleGrid />
    </PageContent>
  );
});
