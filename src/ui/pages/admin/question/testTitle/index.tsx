import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';
import { TestIcon } from '@ui/pages/admin/question/testList/testIcon';

export const TestTitle = observer(() => {
  const { data } = useViewModel<IQuestionAdminViewModel>(
    VIEW_MODEL.QuestionAdmin
  );
  return (
    <Stack direction="row" spacing="10px">
      <TestIcon data={data} style={{ marginTop: '4px' }} />
      {data ? <div>{data.question?.block?.name}</div> : undefined}
    </Stack>
  );
});
