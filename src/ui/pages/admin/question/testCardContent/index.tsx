import React from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { Box, Stack } from '@mui/material';
import { FormField, FormSection } from '@components/form';
import { useLocale } from '@hooks/useLocale';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';

export const TestCardContent = observer(() => {
  const { data } = useViewModel<IQuestionAdminViewModel>(
    VIEW_MODEL.QuestionAdmin
  );
  const { fDateTime } = useLocale();

  return (
    <Stack height="100%" spacing="20px">
      <FormSection>
        <FormField title="User name">
          <Box>{data?.user?.username}</Box>
        </FormField>
        {data && (
          <FormField title="Updated at">
            <Box>{fDateTime(new Date(data.updatedAt))}</Box>
          </FormField>
        )}
      </FormSection>
    </Stack>
  );
});
