import React from 'react';
import { Page } from '@ui/layout/page';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Loader } from '@components/loader';
import { TitleQuestion } from '@ui/components/title/titleQuestion';
import { QuestionCardContent } from '@ui/pages/admin/userBlock/[id]/tabs/tabQuestions/questionCardContent';
import { ErrorPage } from '@ui/pages/errors/errorPage';
import { QuestionCardActions } from '@ui/pages/admin/userBlock/[id]/tabs/tabQuestions/questionCardActions';
import { Stack } from '@mui/material';
import { QuestionCardButtons } from '@ui/pages/admin/userBlock/[id]/tabs/tabQuestions/questionCardButtons';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { IButtonProps } from '@components/button';
import { Page204 } from '@ui/pages/errors/204';
import { TagQuestion } from '@ui/components/tag/tagQuestion';
import { IBlockAdminViewModel } from '@viewModel/modules/entities/block/admin/interface';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';

export const QuestionCard = observer(() => {
  const { data: block } = useViewModel<IBlockAdminViewModel>(
    VIEW_MODEL.BlockAdmin
  );
  const { data, list, isDataLoading, isListLoading, start } =
    useViewModel<IQuestionAdminViewModel>(VIEW_MODEL.QuestionAdmin);

  const handleStart = () => start();

  if (isListLoading || isDataLoading) {
    return (
      <Page>
        <Stack justifyContent="space-between" flex="1 1 auto">
          <Loader loading relative />
          {isDataLoading && <QuestionCardButtons />}
        </Stack>
      </Page>
    );
  }

  if (
    !list ||
    (list && list.length === 0) ||
    (!data && block?.completeQuestions)
  ) {
    return <Page204 />;
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
    return (
      <ErrorPage
        className="color_grey-120"
        icon={<ChecklistIcon className="color_grey-50" />}
        message="Please select item or click to start"
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
      <Stack justifyContent="space-between" flex="1 1 auto">
        <QuestionCardContent />
        <QuestionCardButtons />
      </Stack>
    </Page>
  );
});
