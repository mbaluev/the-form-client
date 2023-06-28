import React from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@components/iconButton';
import { Toolbar } from '@components/toolbar';
import { useViewModel } from '@hooks/useViewModel';
import CloseIcon from '@mui/icons-material/Close';
import { VIEW_MODEL } from '@viewModel/ids';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';

export const QuestionCardActions = observer(() => {
  const { stop } = useViewModel<IQuestionUserViewModel>(
    VIEW_MODEL.QuestionUser
  );

  const handleClose = async () => stop();

  return (
    <Toolbar
      itemsLeft={[
        <IconButton onClick={handleClose} tooltip="Stop">
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
});
