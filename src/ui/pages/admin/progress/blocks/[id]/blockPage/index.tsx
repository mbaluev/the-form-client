import { observer } from 'mobx-react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { Page } from '@ui/layout/page';
import { classNames } from '@utils/classNames';
import { getProgress, ModuleProgress } from '@ui/pages/school/module/index/moduleProgress';
import { SubTitleBlock } from '@ui/components/subTitle/subTitleBlock';
import { BlockTabNames } from '@ui/components/blockTab/blockTabNames';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IBlockAdminViewModel } from '@viewModel/modules/entities/block/admin/interface';
import { IModuleAdminViewModel } from '@viewModel/modules/entities/module/admin/interface';
import { TitleBlock } from '@ui/components/title/titleBlock';
import { BlockContent } from '@ui/pages/admin/progress/blocks/[id]/blockContent';
import { MaterialCard } from '@ui/pages/admin/progress/blocks/[id]/tabs/tabMaterials/materialCard';
import { TaskCard } from '@ui/pages/admin/progress/blocks/[id]/tabs/tabTasks/taskCard';
import { QuestionCard } from '@ui/pages/admin/progress/blocks/[id]/tabs/tabQuestions/questionCard';
import { IconButton } from '@components/iconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Stack } from '@mui/material';

interface IProps {
  breadCrumbs: TBreadCrumb[];
}

export const BlockPage = observer((props: IProps) => {
  const { breadCrumbs } = props;
  const { data: userModule } = useViewModel<IModuleAdminViewModel>(VIEW_MODEL.ModuleAdmin);
  const {
    data: userBlock,
    tab,
    refresh,
  } = useViewModel<IBlockAdminViewModel>(VIEW_MODEL.BlockAdmin);

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
