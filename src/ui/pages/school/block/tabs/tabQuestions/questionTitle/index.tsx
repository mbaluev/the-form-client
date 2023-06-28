import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';
import { QuestionIcon } from '@ui/pages/school/block/tabs/tabQuestions/questionList/questionIcon';

export const QuestionTitle = observer(() => {
  const { data } = useViewModel<IQuestionUserViewModel>(
    VIEW_MODEL.QuestionUser
  );
  return (
    <Stack direction="row" spacing="10px">
      <QuestionIcon data={data} style={{ marginTop: '4px' }} />
      {data ? <div>{`Question #${data.position}`}</div> : undefined}
    </Stack>
  );
});
