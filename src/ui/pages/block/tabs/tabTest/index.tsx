import React, { useState } from 'react';
import { classNames } from '@utils/classNames';
import { Form, FormField, FormSection } from '@components/form';
import { Accordion } from '@components/accordion';
import { RadioGroupFieldControl } from '@components/fields';
import { Alert } from '@components/alert';
import { Button } from '@components/button';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import ReplayIcon from '@mui/icons-material/Replay';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Toolbar } from '@components/toolbar';
import { IconButton } from '@components/iconButton';

const MOCK_SUCCESS_START = undefined;
const MOCK_QUEST = [
  {
    title: 'Question 1',
    question: 'Question 1',
    options: [
      {
        value: '1',
        label: 'options 1',
      },
      {
        value: '2',
        label: 'options 2',
      },
    ],
    expanded: false,
  },
  {
    title: 'Question 2',
    question: 'Question 2',
    options: [
      {
        value: '1',
        label: 'options 1',
      },
      {
        value: '2',
        label: 'options 2',
      },
    ],
    expanded: false,
  },
  {
    title: 'Question 3',
    question: 'Question 3',
    options: [
      {
        value: '1',
        label: 'options 1',
      },
      {
        value: '2',
        label: 'options 2',
      },
    ],
    expanded: false,
  },
];

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

export const TabTest = () => {
  const cls = classNames('tab-test');
  const [quest, setQuest] = useState<any[]>(MOCK_QUEST);
  const [success, setSuccess] = useState<boolean | undefined>(
    MOCK_SUCCESS_START
  );
  const [play, setPlay] = useState<boolean>(false);

  const goTopHandler = () => window.scrollTo(0, 0);
  const prevHandler = (index: number) => {
    const newQuest = [...quest];
    newQuest.forEach((q, i) => (q.expanded = i === index - 1));
    setQuest(newQuest);
  };
  const nextHandler = (index: number) => {
    const newQuest = [...quest];
    newQuest.forEach((q, i) => (q.expanded = i === index + 1));
    setQuest(newQuest);
  };
  const finishHandlerSuccess = () => {
    const newQuest = [...quest];
    newQuest.forEach((q) => (q.expanded = false));
    setQuest(newQuest);
    setSuccess(true);
    setPlay(false);
    goTopHandler();
  };
  const finishHandlerFailed = () => {
    const newQuest = [...quest];
    newQuest.forEach((q) => (q.expanded = false));
    setQuest(newQuest);
    setSuccess(false);
    setPlay(false);
    goTopHandler();
  };
  const expandHandler = (index: number) => {
    const newQuest = [...quest];
    newQuest.forEach((file, i) => {
      file.expanded = i === index;
    });
    setQuest(newQuest);
  };
  const repeatHandler = () => {
    const newQuest = [...quest];
    newQuest.forEach((q, i) => (q.expanded = i === 0));
    setQuest(newQuest);
    setPlay(true);
  };

  return (
    <Form className={cls}>
      {success === undefined && (
        <AlertStart play={play} onStart={repeatHandler} />
      )}
      {success === true && <AlertPassed />}
      {success === false && (
        <AlertFailed play={play} onRepeat={repeatHandler} />
      )}
      <FormSection>
        {quest.map((q, index, arr) => {
          const footerButtons = [];
          if (index > 0) {
            footerButtons.push(
              <Button
                color="blue"
                variant="text"
                size="medium"
                children="Previous"
                startIcon={<NavigateBeforeIcon />}
                onClick={() => prevHandler(index)}
                disabled={!play}
              />
            );
          }
          if (index < arr.length - 1) {
            footerButtons.push(
              <Button
                color="blue"
                variant="text"
                size="medium"
                children="Next"
                endIcon={<NavigateNextIcon />}
                onClick={() => nextHandler(index)}
                disabled={!play}
              />
            );
          } else {
            footerButtons.push(
              <Button
                color="green"
                variant="text"
                size="medium"
                children="Finish success"
                startIcon={<SportsScoreIcon />}
                onClick={finishHandlerSuccess}
                disabled={!play}
              />
            );
            footerButtons.push(
              <Button
                color="red"
                variant="text"
                size="medium"
                children="Finish failed"
                startIcon={<SportsScoreIcon />}
                onClick={finishHandlerFailed}
                disabled={!play}
              />
            );
          }
          return (
            <Accordion
              key={index}
              title={q.title}
              footerButtons={footerButtons}
              expanded={q.expanded}
              onExpand={() => expandHandler(index)}
            >
              <FormField title={q.question} classNameLabel="color_black">
                <RadioGroupFieldControl items={q.options} disabled={success} />
              </FormField>
            </Accordion>
          );
        })}
      </FormSection>
    </Form>
  );
};
