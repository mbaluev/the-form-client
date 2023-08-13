import React from 'react';
import { Page } from '@ui/layout/page';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { TitleQuestion } from '@ui/components/title/titleQuestion';
import { QuestionCardContent } from '@ui/pages/school/block/[id]/tabs/tabQuestions/questionCardContent';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';
import { ErrorPage } from '@ui/pages/errors/errorPage';
import { QuestionCardActions } from '@ui/pages/school/block/[id]/tabs/tabQuestions/questionCardActions';
import { Stack } from '@mui/material';
import { QuestionCardButtons } from '@ui/pages/school/block/[id]/tabs/tabQuestions/questionCardButtons';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { IButtonProps } from '@components/button';
import { Page204 } from '@ui/pages/errors/204';
import { IBlockUserViewModel } from '@viewModel/modules/entities/block/user/interface';
import { TagQuestion } from '@ui/components/tag/tagQuestion';

export const QuestionCard = observer(() => {
  const { data: block } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  const { data, list, isDataLoading, start, finish, isFinish } =
    useViewModel<IQuestionUserViewModel>(VIEW_MODEL.QuestionUser);

  const handleStart = () => start();
  const handleFinish = () => finish();

  if (
    !list ||
    (list && list.length === 0) ||
    (!data && block?.completeQuestions) ||
    isDataLoading
  ) {
    return <Page204 loading={isDataLoading} />;
  }

  if (!data && !block?.completeQuestions) {
    const buttons: IButtonProps[] = [
      {
        color: 'blue',
        variant: 'contained',
        children: 'Start',
        onClick: handleStart,
      },
    ];
    if (isFinish) {
      buttons.push({
        color: 'green',
        variant: 'contained',
        children: 'Finish (send your answers)',
        startIcon: <SportsScoreIcon />,
        onClick: handleFinish,
      });
    }
    return (
      <ErrorPage
        className="color_grey-120"
        icon={<ChecklistIcon className="color_grey-50" />}
        message="Complete a test"
        buttons={buttons}
      />
    );
  }

  return (
    <Page
      title={<TitleQuestion userQuestion={data} />}
      subTitle={<TagQuestion userQuestion={data} />}
      quickFilter={<QuestionCardActions />}
    >
      <Stack justifyContent="space-between" flex="1 1 auto" spacing={3}>
        <QuestionCardContent />
        <QuestionCardButtons />
      </Stack>
    </Page>
  );
});
