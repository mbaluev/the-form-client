import React from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@components/iconButton';
import { Toolbar } from '@components/toolbar';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import CloseIcon from '@mui/icons-material/Close';
import { ITaskUserViewModel } from '@viewModel/modules/task/user/interface';
import AddIcon from '@mui/icons-material/Add';

export const TaskCardActions = observer(() => {
  const { clearData } = useViewModel<ITaskUserViewModel>(VIEW_MODEL.TaskUser);

  const handleSend = async () => {};
  const handleClose = async () => clearData();

  return (
    <Toolbar
      itemsLeft={[
        <IconButton onClick={handleSend} tooltip="Send homework">
          <AddIcon />
        </IconButton>,
        <IconButton onClick={handleClose} tooltip="Close">
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
});
