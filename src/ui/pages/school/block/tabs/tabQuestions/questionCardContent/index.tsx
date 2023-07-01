import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { FormField, FormSection } from '@components/form';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';
import { CheckboxFieldControl } from '@components/fields';
import { RadioGroupFieldControl } from '@components/fields';
import { Button } from '@components/button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SportsScoreIcon from '@mui/icons-material/SportsScore';

export const QuestionCardContent = observer(() => {
  const { data, changeAnswer, saveQuestionAnswers } =
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
          {data.questionOptions.map((item, index) => {
            const checked = Boolean(
              data.questionAnswers.find((d) => d === item.id)
            );
            return (
              <CheckboxFieldControl
                key={index}
                label={item.title}
                name={item.id}
                value={checked}
                onChange={changeOptionCheckbox}
                // error
                // helperText="helperText"
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
            value={data.questionAnswers[0]}
            onChange={changeOptionRadio}
            // error
            // helperText="helperText"
          />
        </FormField>
      )}
      <FormField>
        <Button variant="outlined" startIcon={<ArrowBackIcon />}>
          Previous question
        </Button>
        <Button endIcon={<ArrowForwardIcon />}>Next question</Button>
        <Button startIcon={<SportsScoreIcon />} color="green">
          Finish
        </Button>
      </FormField>
    </FormSection>
  );
});
