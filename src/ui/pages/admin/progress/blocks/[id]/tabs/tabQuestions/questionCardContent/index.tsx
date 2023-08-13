import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { FormField, FormSection } from '@components/form';
import { CheckboxFieldControl } from '@components/fields';
import { RadioGroupFieldControl } from '@components/fields';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';
import { Box, Stack, Typography } from '@mui/material';
import { IconButton } from '@components/iconButton';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Tooltip } from '@components/tooltip';
import { DialogQuestionAdminComment } from '@ui/dialogs/admin/dialogQuestionAdminComment';
import { useState } from 'react';

export const QuestionCardContent = observer(() => {
  const { data, setModalData, clearModalData, clearModalChanges, modalSubmit } =
    useViewModel<IQuestionAdminViewModel>(VIEW_MODEL.QuestionAdmin);

  if (!data) return null;

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = async () => {
    setModalData(data);
    await clearModalChanges();
    setOpen(true);
  };
  const handleClose = async () => {
    await clearModalData();
    await clearModalChanges();
    setOpen(false);
  };
  const handleSubmit = async () => {
    await modalSubmit();
    setOpen(false);
  };

  return (
    <FormSection>
      <FormField title="Title">{data.question?.title}</FormField>
      {data.question?._type === 'checkbox' && (
        <FormField title="Select options">
          {data.question?.questionOptions?.map((item, i) => {
            const questionAnswer = data.userQuestionAnswers?.find(
              (d) => d.questionOptionId === item.id
            );
            const checked = Boolean(questionAnswer);
            const error = Boolean(data?.error);
            return (
              <CheckboxFieldControl
                key={i}
                label={item.title}
                name={item.id}
                value={checked}
                error={error}
                disabled
              />
            );
          })}
        </FormField>
      )}
      {data.question?._type === 'radio' && (
        <FormField title="Select option">
          <RadioGroupFieldControl
            items={data.question?.questionOptions?.map((item) => ({
              value: item.id,
              label: item.title,
            }))}
            value={data.userQuestionAnswers?.[0]?.questionOptionId}
            error={data.error}
            disabled
          />
        </FormField>
      )}
      {data.error && (
        <Stack direction="row" spacing={3}>
          <Box sx={{ flex: '1 1 auto' }}>
            <FormField title="Comment">
              <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                {data.commentText || '-'}
              </Typography>
            </FormField>
          </Box>
          <Tooltip title="Edit comment">
            <IconButton color="red" onClick={handleOpen}>
              <EditNoteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
      <DialogQuestionAdminComment
        isOpen={open}
        onClose={handleClose}
        onCancel={handleClose}
        onSubmit={handleSubmit}
      />
    </FormSection>
  );
});
