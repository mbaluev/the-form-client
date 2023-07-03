import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { FormField, FormSection } from '@components/form';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';
import { CheckboxFieldControl } from '@components/fields';
import { RadioGroupFieldControl } from '@components/fields';

export const QuestionCardContent = observer(() => {
  const { data, changeAnswer, saveQuestionAnswers, isStart } =
    useViewModel<IQuestionUserViewModel>(VIEW_MODEL.QuestionUser);

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
      <FormField title="Title">{data.title}</FormField>
      {data.type === 'checkbox' && (
        <FormField title="Select options">
          {data.questionOptions.map((item, i) => {
            const questionAnswer = data.questionAnswers?.find(
              (d) => d.questionOptionId === item.id
            );
            const checked = Boolean(questionAnswer);
            const error = Boolean(data?.error);
            const comment = questionAnswer?.comment;

            return (
              <CheckboxFieldControl
                key={i}
                label={item.title}
                name={item.id}
                value={checked}
                onChange={changeOptionCheckbox}
                disabled={!isStart}
                error={error}
                helperText={comment}
              />
            );
          })}
        </FormField>
      )}
      {data.type === 'radio' && (
        <FormField title="Select option">
          <RadioGroupFieldControl
            items={data.questionOptions.map((item) => ({
              value: item.id,
              label: item.title,
            }))}
            value={data.questionAnswers?.[0]?.questionOptionId}
            onChange={changeOptionRadio}
            disabled={!isStart}
            error={data.error}
            helperText={data.questionAnswers?.[0]?.comment}
          />
        </FormField>
      )}
    </FormSection>
  );
});
