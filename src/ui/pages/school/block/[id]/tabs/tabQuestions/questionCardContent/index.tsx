import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { FormField, FormSection } from '@components/form';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';
import { CheckboxFieldControl } from '@components/fields';
import { RadioGroupFieldControl } from '@components/fields';
import { Typography } from '@mui/material';

export const QuestionCardContent = observer(() => {
  const { data, changeAnswer, saveQuestionAnswers, isStart } = useViewModel<IQuestionUserViewModel>(
    VIEW_MODEL.QuestionUser
  );

  const changeOptionCheckbox = async (e: ChangeEvent<HTMLInputElement>) => {
    changeAnswer(e.target.name, e.target.checked);
    await saveQuestionAnswers();
  };
  const changeOptionRadio = async (e: ChangeEvent<HTMLInputElement>) => {
    changeAnswer(e.target.value, true);
    await saveQuestionAnswers();
  };
  if (!data) return null;

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
                onChange={changeOptionCheckbox}
                disabled={!isStart}
                error={error}
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
            onChange={changeOptionRadio}
            disabled={!isStart}
            error={data.error}
          />
        </FormField>
      )}
      {data.commentText && (
        <FormField title="Comment">
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>{data.commentText}</Typography>
        </FormField>
      )}
    </FormSection>
  );
});
