import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { FormField, FormSection } from '@components/form';
import { CheckboxFieldControl } from '@components/fields';
import { RadioGroupFieldControl } from '@components/fields';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';

export const QuestionCardContent = observer(() => {
  const { data } = useViewModel<IQuestionAdminViewModel>(
    VIEW_MODEL.QuestionAdmin
  );

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
            const commentText = questionAnswer?.commentText;

            return (
              <CheckboxFieldControl
                key={i}
                label={item.title}
                name={item.id}
                value={checked}
                error={error}
                helperText={commentText}
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
            helperText={data.userQuestionAnswers?.[0]?.commentText}
            disabled
          />
        </FormField>
      )}
    </FormSection>
  );
});
