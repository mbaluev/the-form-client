import React from 'react';
import { classNames } from '@utils/classNames';
import { Form, FormSection } from '@components/form';
import { Alert } from '@components/alert';
import ReplayIcon from '@mui/icons-material/Replay';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Toolbar } from '@components/toolbar';
import { IconButton } from '@components/iconButton';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';
import { Loader } from '@components/loader';
import { TestItem } from '@ui/pages/school/block/tabs/tabTest/testItem';
import './index.scss';

interface IPassedProps {
  complete: number;
  total: number;
}
const AlertPassed = (props: IPassedProps) => {
  const { complete, total } = props;
  return (
    <Alert
      type="success"
      title={`Test passed (${complete}/${total})`}
      variant="outlined"
      shadow={false}
      border={false}
    />
  );
};

interface IFailedProps {
  complete: number;
  total: number;
  play: boolean;
  onRepeat: () => void;
}
const AlertFailed = (props: IFailedProps) => {
  const { complete, total, play, onRepeat } = props;
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
  const cls = classNames('test-list__top');
  return (
    <div className={cls}>
      <Toolbar itemsLeft={buttons} />
      <Alert
        type="error"
        title={`Test failed (${complete}/${total}). Please try again`}
        variant="outlined"
        shadow={false}
        border={false}
      />
    </div>
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
  const cls = classNames('test-list__top');
  return (
    <div className={cls}>
      <Toolbar itemsLeft={buttons} />
      <Alert
        type="info"
        title={`Click play button to start test`}
        variant="outlined"
        shadow={false}
        border={false}
      />
    </div>
  );
};

export const TestList = observer(() => {
  const { list, status, play, repeat, isDataLoading } =
    useViewModel<IQuestionUserViewModel>(VIEW_MODEL.QuestionUser);

  const cls = classNames('test-list');

  return (
    <Form className={cls}>
      <Loader loading={isDataLoading} backdrop />
      {status.code === 'new' && <AlertStart play={play} onStart={repeat} />}
      {status.code === 'success' && (
        <AlertPassed complete={status.complete} total={status.total} />
      )}
      {status.code === 'fail' && (
        <AlertFailed
          complete={status.complete}
          total={status.total}
          play={play}
          onRepeat={repeat}
        />
      )}
      <FormSection>
        {list?.map((q, i, arr) => (
          <TestItem key={q.id} index={i} total={arr.length} question={q} />
        ))}
      </FormSection>
    </Form>
  );
});
