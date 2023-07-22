import React from 'react';
import { observer } from 'mobx-react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { Page } from '@ui/layout/page';
import { classNames } from '@utils/classNames';
import { BlockContent } from '@ui/pages/school/block/[id]/blockContent';
import {
  getProgress,
  ModuleProgress,
} from '@ui/pages/school/module/index/moduleProgress';
import { BlockSubTitle } from '@ui/pages/school/block/[id]/blockSubTitle';
import { BlockTabNames } from '@ui/pages/school/block/[id]/blockTabs';
import { MaterialCard } from '@ui/pages/school/block/[id]/tabs/tabMaterials/materialCard';
import { TaskCard } from '@ui/pages/school/block/[id]/tabs/tabTasks/taskCard';
import { QuestionCard } from '@ui/pages/school/block/[id]/tabs/tabQuestions/questionCard';
import { IModuleUserDTO } from '@model/entities/module';
import { IBlockUserDTO } from '@model/entities/block';
import './index.scss';

interface IProps {
  userModule?: IModuleUserDTO | null;
  userBlock?: IBlockUserDTO | null;
  breadCrumbs: TBreadCrumb[];
  tab: string;
}

export const BlockPage = observer((props: IProps) => {
  const { userModule, userBlock, breadCrumbs, tab } = props;

  const cls = classNames('block-page', {
    'block-page_complete': Boolean(userModule && userModule.complete),
  });
  const progress = getProgress([
    Boolean(userBlock?.completeMaterials),
    Boolean(userBlock?.completeQuestions),
    Boolean(userBlock?.completeTasks),
  ]);

  const getPageRight = () => {
    if (tab === BlockTabNames.materials) return <MaterialCard />;
    if (tab === BlockTabNames.tasks) return <TaskCard />;
    if (tab === BlockTabNames.questions) return <QuestionCard />;
    return undefined;
  };

  return (
    <Page
      title={userBlock?.block?.name}
      subTitle={<BlockSubTitle userBlock={userBlock} />}
      breadCrumbs={breadCrumbs}
      quickFilter={<ModuleProgress value={progress} />}
      className={cls}
      pageRight={getPageRight()}
    >
      <BlockContent userBlock={userBlock} />
    </Page>
  );
});
