import React, { ChangeEvent } from 'react';
import { classNames } from '@utils/classNames';
import { Form, FormField, FormSection } from '@components/form';
import { Accordion, TAccordionColor } from '@components/accordion';
import { CheckboxFieldControl } from '@components/fields';
import { Alert } from '@components/alert';
import { Button } from '@components/button';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import ReplayIcon from '@mui/icons-material/Replay';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Toolbar } from '@components/toolbar';
import { IconButton } from '@components/iconButton';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { IQuestionUserViewModel } from '@viewModel/modules/question/user/interface';
import { Loader } from '@components/loader';

const AlertPassed = () => {
  return (
    <Alert
      type="success"
      message="Test passed (7/10)"
      shadow={false}
      variant="outlined"
    />
  );
};

interface IFailedProps {
  play: boolean;
  onRepeat: () => void;
}
const AlertFailed = (props: IFailedProps) => {
  const { play, onRepeat } = props;
  const buttons = [
    <IconButton
      color="red"
      tooltip="Try again"
      onClick={onRepeat}
      disabled={play}
    >
      <ReplayIcon />
    </IconButton>,
  ];
  return (
    <React.Fragment>
      <Alert
        type="error"
        message="Test failed (2/10). Please try again"
        shadow={false}
        variant="outlined"
      />
      <Toolbar itemsLeft={buttons} />
    </React.Fragment>
  );
};

interface IStartProps {
  play: boolean;
  onStart: () => void;
}
const AlertStart = (props: IStartProps) => {
  const { play, onStart } = props;
  const buttons = [
    <IconButton
      color="blue"
      tooltip="Start test"
      onClick={onStart}
      disabled={play}
    >
      <PlayArrowIcon />
    </IconButton>,
  ];
  return <Toolbar itemsLeft={buttons} />;
};

export const TestList = observer(() => {
  const {
    list,
    status,
    play,
    prev,
    next,
    repeat,
    finish,
    expand,
    changeAnswer,
    isDataLoading,
  } = useViewModel<IQuestionUserViewModel>(VIEW_MODEL.QuestionUser);

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

  const cls = classNames('tab-test');

  return (
    <Form className={cls}>
      <Loader loading={isDataLoading} backdrop />
      {status.code === 'new' && <AlertStart play={play} onStart={repeat} />}
      {status.code === 'success' && <AlertPassed />}
      {status.code === 'fail' && <AlertFailed play={play} onRepeat={repeat} />}
      <FormSection>
        {list?.map((q, i, arr) => {
          const footerButtons = [];
          if (i > 0) {
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
          if (i < arr.length - 1) {
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
          if (q.complete === true) color = 'green';
          if (q.complete === false) color = 'red';
          return (
            <Accordion
              key={q.id}
              title={`Question ${i + 1}`}
              footerButtons={footerButtons}
              expanded={q.expanded}
              onExpand={() => expand(i)}
              color={color}
            >
              <FormField title={q.title} classNameLabel="color_black">
                {q.options.map((option) => {
                  const checked = q.answers.includes(option.id);
                  return (
                    <CheckboxFieldControl
                      key={option.id}
                      name={option.id}
                      label={option.title}
                      checked={checked}
                      onChange={(e) => changeAnswerHandler(q.id, e)}
                      disabled={!play}
                    />
                  );
                })}
              </FormField>
            </Accordion>
          );
        })}
      </FormSection>
    </Form>
  );
});
