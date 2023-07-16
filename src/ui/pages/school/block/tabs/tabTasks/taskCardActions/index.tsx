import React from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@components/iconButton';
import { Toolbar } from '@components/toolbar';
import { useViewModel } from '@hooks/useViewModel';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { VIEW_MODEL } from '@viewModel/ids';
import { ITaskUserViewModel } from '@viewModel/modules/entities/task/user/interface';
import { ITaskUserDocumentViewModel } from '@viewModel/modules/entities/task/userDocument/interface';

export const TaskCardActions = observer(() => {
  const { data, clearData } = useViewModel<ITaskUserViewModel>(
    VIEW_MODEL.TaskUser
  );
  const { modalNew, changeModalField } =
    useViewModel<ITaskUserDocumentViewModel>(VIEW_MODEL.TaskUserDocument);

  const handleNew = async () => {
    modalNew();
    changeModalField('userTaskId', data?.id);
    changeModalField(
      'document.documentTypeId',
      data?.task?.document?.documentTypeId
    );
    changeModalField(
      'document.documentType',
      data?.task?.document?.documentType
    );
  };
  const handleClose = async () => clearData();

  const disabledNew = data?.sent || data?.complete;

  return (
    <Toolbar
      itemsLeft={[
        <IconButton onClick={handleNew} tooltip="Send" disabled={disabledNew}>
          <AddIcon />
        </IconButton>,
        <IconButton onClick={handleClose} tooltip="Close">
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
});
