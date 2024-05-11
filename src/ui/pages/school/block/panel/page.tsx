/* eslint-disable sonarjs/cognitive-complexity */
import { observer } from 'mobx-react';
import { PageContent } from '@ui/layout/page/pageContent';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';
import { Panel } from '@ui/layout/page/panel';
import { ErrorCode } from '@ui/layout/page/errorCode';
import { useMaterialSchoolItemStore } from '@store/modules/school/material/item/hook';
import { useRouter } from 'next/router';
import { useBlockSchoolItemStore } from '@store/modules/school/block/item/hook';
import { PagePanelNoData } from '@ui/pages/school/block/panel/noData';
import { Panels } from '@ui/pages/school/block/panel/panels';
import { Title } from '@ui/pages/school/block/panel/title';
import { useTaskSchoolItemStore } from '@store/modules/school/task/item/hook';
import { useQuestionSchoolItemStore } from '@store/modules/school/question/item/hook';
import { useEffect } from 'react';
import { ROUTES } from '@settings/routes';
import { Quick } from '@ui/pages/school/block/panel/quick';
import { SubTitle } from '@ui/pages/school/block/panel/subtitle';

export const PagePanel = observer(() => {
  const { data: userBlock } = useBlockSchoolItemStore();
  const {
    data: userMaterial,
    isDataLoading: isLoadingMaterial,
    getData: getMaterial,
    setData: setMaterial,
  } = useMaterialSchoolItemStore();
  const {
    data: userTask,
    isDataLoading: isLoadingTask,
    getData: getTask,
    setData: setTask,
  } = useTaskSchoolItemStore();
  const {
    data: userQuestion,
    isDataLoading: isLoadingQuestion,
    getData: getQuestion,
    setData: setQuestion,
  } = useQuestionSchoolItemStore();

  const router = useRouter();
  const tab = router.query.slug?.[1] as string;
  const id = router.query.slug?.[2] as string;

  useEffect(() => {
    if (id) {
      if (tab === ROUTES.SCHOOL_BLOCK.tabs.keys.materials) getMaterial(id);
      if (tab === ROUTES.SCHOOL_BLOCK.tabs.keys.homework) getTask(id);
      if (tab === ROUTES.SCHOOL_BLOCK.tabs.keys.test) getQuestion(id);
    }
    return () => {
      setMaterial();
      setTask();
      setQuestion();
    };
  }, [id]);

  if (isLoadingMaterial || isLoadingTask || isLoadingQuestion) {
    return (
      <Panel sx={{ p: 3 }}>
        <TabSkeleton />
      </Panel>
    );
  }

  if (!userMaterial && !userTask && !userQuestion) {
    return (
      <Panel sx={{ pt: 20 }}>
        <PagePanelNoData />
      </Panel>
    );
  }

  if (!userBlock?.enable) {
    return <ErrorCode code="403" description="Access denied" />;
  }

  return (
    <PageContent title={<Title />} subtitle={<SubTitle />} quick={<Quick />}>
      <Panels />
    </PageContent>
  );
});
