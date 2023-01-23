import React from 'react';
import { FormField } from '@components/form';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { ITaskViewModel } from '@viewModel/modules/task/interface';
import { IconButton } from '@components/iconButton';
import { Delete } from '@mui/icons-material';
import { NoData } from '@components/noData';
import { Divider } from '@mui/material';
import './index.scss';

export const TaskAnswers = observer(() => {
  const { isModalLoading, modalData, removeAnswer } =
    useViewModel<ITaskViewModel>(VIEW_MODEL.Task);

  if (isModalLoading) return null;

  if (!modalData?.taskAnswers || modalData?.taskAnswers.length === 0) {
    return (
      <div className="task-answers">
        <NoData message="No answers found" messageClassName="color_red" />
      </div>
    );
  }

  return (
    <div className="task-answers">
      {modalData?.taskAnswers.map((answer, index) => (
        <React.Fragment key={index}>
          {index > 0 && <Divider />}
          <FormField
            actions={[
              <IconButton
                tooltip="Delete"
                onClick={() => removeAnswer(answer.id)}
              >
                <Delete />
              </IconButton>,
            ]}
          >
            <div className="dialog-task__answer">{`${answer.type}: ${answer.title}`}</div>
          </FormField>
        </React.Fragment>
      ))}
    </div>
  );
});
