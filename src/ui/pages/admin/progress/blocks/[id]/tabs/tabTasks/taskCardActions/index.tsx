import { observer } from 'mobx-react';
import { IconButton } from '@components/iconButton';
import { Toolbar } from '@components/toolbar';
import { useViewModel } from '@hooks/useViewModel';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { VIEW_MODEL } from '@viewModel/ids';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';
import { ITaskAdminDocumentViewModel } from '@viewModel/modules/entities/task/adminDocument/interface';
import CheckIcon from '@mui/icons-material/Check';
import HistoryIcon from '@mui/icons-material/History';

export const TaskCardActions = observer(() => {
  const { data, complete, getData, getList, clearData } = useViewModel<ITaskAdminViewModel>(
    VIEW_MODEL.TaskAdmin
  );

  const { modalNew, changeModalField } = useViewModel<ITaskAdminDocumentViewModel>(
    VIEW_MODEL.TaskAdminDocument
  );

  const handleComplete = async () => {
    await complete();
    if (data?.id) await getData(data.id);
    await getList();
  };
  const handleNew = async () => {
    modalNew();
    changeModalField('userTaskId', data?.id);
    changeModalField('document.documentTypeId', data?.task?.document?.documentTypeId);
    changeModalField('document.documentType', data?.task?.document?.documentType);
  };
  const handleHistory = async () => {};
  const handleClose = async () => clearData();

  const disabledComplete = data?.sent === null || data?.complete;
  const disabledNew = data?.sent === null || data?.complete;
  const disabledHistory = data?.sent === null;

  return (
    <Toolbar
      itemsLeft={[
        <IconButton onClick={handleComplete} tooltip="Complete" disabled={disabledComplete}>
          <CheckIcon />
        </IconButton>,
        <IconButton onClick={handleNew} tooltip="Send" disabled={disabledNew}>
          <AddIcon />
        </IconButton>,
        <IconButton onClick={handleHistory} tooltip="History" disabled={disabledHistory}>
          <HistoryIcon />
        </IconButton>,
        <IconButton onClick={handleClose} tooltip="Close">
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
});
