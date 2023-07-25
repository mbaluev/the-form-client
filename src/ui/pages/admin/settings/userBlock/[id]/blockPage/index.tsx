import React from 'react';
import { observer } from 'mobx-react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { Page } from '@ui/layout/page';
import { classNames } from '@utils/classNames';
import {
  getProgress,
  ModuleProgress,
} from '@ui/pages/school/module/index/moduleProgress';
import { SubTitleBlock } from '@ui/components/subTitle/subTitleBlock';
import { BlockTabNames } from '@ui/components/blockTab/blockTabNames';
import { MaterialCard } from '@ui/pages/admin/settings/userBlock/[id]/tabs/tabMaterials/materialCard';
import { TaskCard } from '@ui/pages/admin/settings/userBlock/[id]/tabs/tabTasks/taskCard';
import { QuestionCard } from '@ui/pages/admin/settings/userBlock/[id]/tabs/tabQuestions/questionCard';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IBlockAdminViewModel } from '@viewModel/modules/entities/block/admin/interface';
import { IModuleAdminViewModel } from '@viewModel/modules/entities/module/admin/interface';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { BlockContent } from '@ui/pages/admin/settings/userBlock/[id]/blockContent';
import { TitleBlock } from '@ui/components/title/titleBlock';

export const BlockPage = observer(() => {
  const { data: userModule } = useViewModel<IModuleAdminViewModel>(
    VIEW_MODEL.ModuleAdmin
  );
  const { data: userBlock, tab } = useViewModel<IBlockAdminViewModel>(
    VIEW_MODEL.BlockAdmin
  );

  const cls = classNames('block-page', {
    'block-page_complete': Boolean(userModule && userModule.complete),
  });
  const progress = getProgress([
    Boolean(userBlock?.completeMaterials),
    Boolean(userBlock?.completeQuestions),
    Boolean(userBlock?.completeTasks),
  ]);

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USER_BLOCKS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USER_BLOCKS.path },
    },
    {
      label:
        userModule && userBlock
          ? `${userBlock.user?.username} - 
             ${userModule.module?.title}. ${userModule.module?.name} - 
             ${userBlock.block?.title}. ${userBlock.block?.name}`
          : 'loading...',
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USER_BLOCK.path,
        query: { id: userBlock?.id },
      },
    },
  ];

  const getPageRight = () => {
    if (tab === BlockTabNames.materials) return <MaterialCard />;
    if (tab === BlockTabNames.homeworks) return <TaskCard />;
    if (tab === BlockTabNames.questions) return <QuestionCard />;
    return undefined;
  };

  return (
    <Page
      title={<TitleBlock userBlock={userBlock} />}
      subTitle={<SubTitleBlock userBlock={userBlock} />}
      breadCrumbs={breadCrumbs}
      quickFilter={<ModuleProgress value={progress} width="150px" />}
      className={cls}
      pageRight={getPageRight()}
    >
      <BlockContent />
    </Page>
  );
});
