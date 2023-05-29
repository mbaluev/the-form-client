import React from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@components/iconButton';
import { Toolbar } from '@components/toolbar';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import CloseIcon from '@mui/icons-material/Close';
import { ITaskUserViewModel } from '@viewModel/modules/entities/task/user/interface';
import AddIcon from '@mui/icons-material/Add';
import { ITaskUserDocumentViewModel } from '@viewModel/modules/entities/task/userDocument/interface';

export const TaskCardActions = observer(() => {
  const { clearData } = useViewModel<ITaskUserViewModel>(VIEW_MODEL.TaskUser);

  const { data: dataTask } = useViewModel<ITaskUserViewModel>(
    VIEW_MODEL.TaskUser
  );
  const { modalNew, changeModalField } =
    useViewModel<ITaskUserDocumentViewModel>(VIEW_MODEL.TaskUserDocument);

  const handleNew = async () => {
    const document = dataTask?.document;
    modalNew();
    changeModalField('sent', true);
    changeModalField('taskId', dataTask?.id);
    changeModalField('document.documentTypeId', document?.documentTypeId);
    changeModalField('document.documentType', document?.documentType);
  };
  const handleClose = async () => clearData();

  return (
    <Toolbar
      itemsLeft={[
        <IconButton onClick={handleNew} tooltip="Send">
          <AddIcon />
        </IconButton>,
        <IconButton onClick={handleClose} tooltip="Close">
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
});
