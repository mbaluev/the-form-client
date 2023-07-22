import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';
import { IconQuestion } from '@ui/components/icons/iconQuestion';

export const QuestionTitle = observer(() => {
  const { data: userQuestion } = useViewModel<IQuestionUserViewModel>(
    VIEW_MODEL.QuestionUser
  );
  const position = userQuestion?.question?.position;
  return (
    <Stack direction="row" spacing={2}>
      <IconQuestion userQuestion={userQuestion} style={{ marginTop: '4px' }} />
      {position ? <div>{`Question #${position}`}</div> : undefined}
    </Stack>
  );
});
