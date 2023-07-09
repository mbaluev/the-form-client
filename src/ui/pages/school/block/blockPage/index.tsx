import React from 'react';
import { observer } from 'mobx-react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { Page } from '@ui/layout/page';
import { classNames } from '@utils/classNames';
import { BlockContent } from '@ui/pages/school/block/blockContent';
import {
  getProgress,
  ModuleProgress,
} from '@ui/pages/school/module/index/moduleProgress';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { BlockSubTitle } from '@ui/pages/school/block/blockSubTitle';
import { IBlockUserViewModel } from '@viewModel/modules/entities/block/user/interface';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';
import { BlockTabNames } from '@ui/pages/school/block/blockTabs';
import { MaterialCard } from '@ui/pages/school/block/tabs/tabMaterials/materialCard';
import { TaskCard } from '@ui/pages/school/block/tabs/tabTasks/taskCard';
import './index.scss';
import { QuestionCard } from '@ui/pages/school/block/tabs/tabQuestions/questionCard';

export const BlockPage = observer(() => {
  const { data: userModule } = useViewModel<IModuleUserViewModel>(
    VIEW_MODEL.ModuleUser
  );
  const { data: userBlock, tab } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.SCHOOL_MODULES.label,
      url: { pathname: ROUTER_CONST_SCHOOL.SCHOOL_MODULES.path },
    },
    {
      label: userModule
        ? `${userModule.module?.title}. ${userModule.module?.name}`
        : 'loading...',
      url: {
        pathname: ROUTER_CONST_SCHOOL.SCHOOL_MODULE.path,
        query: { id: userModule?.id },
      },
    },
    {
      label: userBlock
        ? `${userBlock.block?.title}. ${userBlock.block?.name}`
        : 'loading...',
      url: { pathname: ROUTER_CONST_SCHOOL.SCHOOL_MODULE.path },
      neighbors: userModule?.userBlocks?.map((d) => {
        return {
          label: `${d.block?.title}. ${d.block?.name}`,
          url: {
            pathname: ROUTER_CONST_SCHOOL.SCHOOL_BLOCK.path,
            query: { id: d.id },
          },
          disabled: !d.enable,
          complete: d.complete,
          selected: d.id === userBlock?.id,
        };
      }),
    },
  ];
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
      subTitle={<BlockSubTitle />}
      breadCrumbs={breadCrumbs}
      quickFilter={<ModuleProgress value={progress} />}
      className={cls}
      pageRight={getPageRight()}
    >
      <BlockContent />
    </Page>
  );
});
