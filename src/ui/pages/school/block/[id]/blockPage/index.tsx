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
import { MaterialCard } from '@ui/pages/school/block/[id]/tabs/tabMaterials/materialCard';
import { TaskCard } from '@ui/pages/school/block/[id]/tabs/tabTasks/taskCard';
import { QuestionCard } from '@ui/pages/school/block/[id]/tabs/tabQuestions/questionCard';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';
import { IBlockUserViewModel } from '@viewModel/modules/entities/block/user/interface';
import { BlockContent } from '@ui/pages/school/block/[id]/blockContent';
import { TitleBlock } from '@ui/components/title/titleBlock';
import { Stack } from '@mui/material';
import { IconButton } from '@components/iconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

export const BlockPage = observer(() => {
  const { data: userModule } = useViewModel<IModuleUserViewModel>(
    VIEW_MODEL.ModuleUser
  );
  const {
    data: userBlock,
    tab,
    refresh,
  } = useViewModel<IBlockUserViewModel>(VIEW_MODEL.BlockUser);

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
      label: ROUTER_CONST_SCHOOL.SCHOOL_MODULES.label,
      url: { pathname: ROUTER_CONST_SCHOOL.SCHOOL_MODULES.path },
    },
    {
      label:
        userModule && userModule.module ? userModule.module.name : 'loading...',
      url: {
        pathname: ROUTER_CONST_SCHOOL.SCHOOL_MODULE.path,
        query: { id: userModule?.id },
      },
    },
    {
      label: userBlock && userBlock.block ? userBlock.block.name : 'loading...',
      url: {
        pathname: ROUTER_CONST_SCHOOL.SCHOOL_BLOCK.path,
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
      quickFilter={
        <Stack direction="row" spacing={2}>
          <ModuleProgress value={progress} width="150px" />
          <IconButton onClick={() => refresh()}>
            <RefreshIcon />
          </IconButton>
        </Stack>
      }
      className={cls}
      pageRight={getPageRight()}
    >
      <BlockContent />
    </Page>
  );
});
