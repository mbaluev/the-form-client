import React from 'react';
import { Page } from '@ui/layout/page';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Loader } from '@components/loader';
import { QuestionTitle } from '@ui/pages/school/block/tabs/tabQuestions/questionTitle';
import { QuestionCardContent } from '@ui/pages/school/block/tabs/tabQuestions/questionCardContent';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import { ErrorPage } from '@ui/pages/errors/errorPage';
import { QuestionCardActions } from '@ui/pages/school/block/tabs/tabQuestions/questionCardActions';

export const QuestionCard = observer(() => {
  const { data, isDataLoading, isListLoading, start } =
    useViewModel<IQuestionUserViewModel>(VIEW_MODEL.QuestionUser);

  const handleStart = () => start();

  if (isListLoading || isDataLoading) {
    return (
      <Page>
        <Loader loading />
      </Page>
    );
  }

  if (!data) {
    return (
      <ErrorPage
        className="color_grey-120"
        icon={<PlayCircleOutlineOutlinedIcon className="color_grey-50" />}
        message={`Click to start a test`}
        button={{
          color: 'blue',
          variant: 'contained',
          children: 'Start',
          onClick: handleStart,
        }}
      />
    );
  }

  return (
    <Page title={<QuestionTitle />} quickFilter={<QuestionCardActions />}>
      <QuestionCardContent />
    </Page>
  );
});
