import React from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@components/iconButton';
import { Toolbar } from '@components/toolbar';
import { useViewModel } from '@hooks/useViewModel';
import CloseIcon from '@mui/icons-material/Close';
import { VIEW_MODEL } from '@viewModel/ids';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';

export const QuestionCardActions = observer(() => {
  const { stop } = useViewModel<IQuestionAdminViewModel>(VIEW_MODEL.QuestionAdmin);

  const handleClose = () => stop();

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
