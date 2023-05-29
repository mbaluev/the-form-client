import React, { ChangeEvent } from 'react';
import { Accordion, TAccordionColor } from '@components/accordion';
import { Button } from '@components/button';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { FormField } from '@components/form';
import { CheckboxFieldControl } from '@components/fields';
import { IQuestionUserDTO } from 'controller/model/entities/question';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';
import { classNames } from '@utils/classNames';
import './index.scss';

interface IProps {
  index: number;
  total: number;
  question: IQuestionUserDTO;
}
export const TestItem = observer((props: IProps) => {
  const { index, total, question } = props;

  const { play, prev, next, finish, expand, changeAnswer } =
    useViewModel<IQuestionUserViewModel>(VIEW_MODEL.QuestionUser);

  const changeAnswerHandler = (
    questionId: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    changeAnswer(questionId, e.target.name, e.target.checked);
  };
  const finishHandler = () => {
    window.scrollTo(0, 0);
    finish();
  };

  const footerButtons = [];
  if (index > 0) {
    footerButtons.push(
      <Button
        color="blue"
        variant="text"
        size="medium"
        children="Previous"
        startIcon={<NavigateBeforeIcon />}
        onClick={prev}
        disabled={!play}
      />
    );
  }
  if (index < total - 1) {
    footerButtons.push(
      <Button
        color="blue"
        variant="text"
        size="medium"
        children="Next"
        endIcon={<NavigateNextIcon />}
        onClick={next}
        disabled={!play}
      />
    );
  } else {
    footerButtons.push(
      <Button
        color="green"
        variant="text"
        size="medium"
        children="Finish"
        startIcon={<SportsScoreIcon />}
        onClick={finishHandler}
        disabled={!play}
      />
    );
  }
  let color: TAccordionColor = undefined;
  if (question.complete === false) color = 'red';

  const cls = classNames('test-item');

  return (
    <Accordion
      className={cls}
      title={`Question ${index + 1}`}
      footerButtons={footerButtons}
      expanded={question.expanded}
      onExpand={() => expand(index)}
      color={color}
    >
      <FormField title={question.title} classNameLabel="color_black">
        {question.options.map((option) => {
          const checked = question.answers.includes(option.id);
          return (
            <CheckboxFieldControl
              key={option.id}
              name={option.id}
              label={option.title}
              checked={checked}
              onChange={(e) => changeAnswerHandler(question.id, e)}
              disabled={!play}
            />
          );
        })}
      </FormField>
    </Accordion>
  );
});
