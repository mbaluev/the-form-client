import { PageContent } from '@ui/layout/page/pageContent';
import { SeparatorBase } from '@ui/layout/card/separator';
import { TitleModules } from '@ui/components/title/titleModules';
import { SubTitleModules } from '@ui/components/subTitle/subTitleModules';
import { observer } from 'mobx-react';
import { useModuleSchoolListStore } from '@store/modules/school/module/list/hook';
import { ProgressBar } from '@ui/components/progress';
import { getProgress } from '@ui/components/progress/getProgress';
import { Panel } from '@ui/layout/page/panel';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';
import { ModuleGrid } from '@ui/pages/school/module/index/grid';

export const PageSchoolModules = observer(() => {
  const { data: userModules, isLoading } = useModuleSchoolListStore();
  const progressValues = userModules?.reduce((prevUserModules: boolean[], currUserModule) => {
    const currUserModuleData = currUserModule?.userBlocks?.reduce(
      (prev: boolean[], curr) =>
        prev.concat([
          Boolean(curr.completeMaterials),
          Boolean(curr.completeQuestions),
          Boolean(curr.completeTasks),
        ]),
      []
    );
    return currUserModuleData ? prevUserModules.concat(currUserModuleData) : prevUserModules;
  }, []);
  const progress = getProgress(progressValues);

  if (isLoading) {
    return (
      <Panel sx={{ p: 3 }}>
        <TabSkeleton />
      </Panel>
    );
  }

  return (
    <PageContent
      separator={<SeparatorBase />}
      title={<TitleModules userModules={userModules} />}
      subtitle={<SubTitleModules userModules={userModules} />}
      quick={<ProgressBar value={progress} sx={{ margin: 1, width: 200 }} />}
    >
      <ModuleGrid />
    </PageContent>
  );
});
