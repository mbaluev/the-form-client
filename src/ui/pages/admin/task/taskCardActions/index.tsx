import React from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@components/iconButton';
import { Toolbar } from '@components/toolbar';
import { useRouter } from 'next/router';
import { useViewModel } from '@hooks/useViewModel';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import HistoryIcon from '@mui/icons-material/History';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { VIEW_MODEL } from '@viewModel/ids';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';
import { ITaskUserDocumentViewModel } from '@viewModel/modules/entities/task/userDocument/interface';

export const TaskCardActions = observer(() => {
  const router = useRouter();
  const { data, complete, getData, getList } =
    useViewModel<ITaskAdminViewModel>(VIEW_MODEL.TaskAdmin);

  const { modalNew, changeModalField } =
    useViewModel<ITaskUserDocumentViewModel>(VIEW_MODEL.TaskUserDocument);

  const handleComplete = async () => {
    await complete();
    if (data?.id) await getData(data.id);
    await getList();
  };
  const handleNew = async () => {
    const document = data?.task.document;
    modalNew();
    changeModalField('sent', false);
    changeModalField('taskId', data?.task.id);
    changeModalField('document.documentTypeId', document?.documentTypeId);
    changeModalField('document.documentType', document?.documentType);
  };
  const handleHistory = async () => {};
  const handleClose = async () => {
    await router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_TASKS.path,
    });
  };

  const disabledComplete = data?.sent === null || data?.complete;
  const disabledNew = data?.sent === null || data?.complete;
  const disabledHistory = data?.sent === null;

  return (
    <Toolbar
      itemsLeft={[
        <IconButton
          onClick={handleComplete}
          tooltip="Complete"
          disabled={disabledComplete}
        >
          <CheckIcon />
        </IconButton>,
        <IconButton onClick={handleNew} tooltip="Send" disabled={disabledNew}>
          <AddIcon />
        </IconButton>,
        <IconButton
          onClick={handleHistory}
          tooltip="History"
          disabled={disabledHistory}
        >
          <HistoryIcon />
        </IconButton>,
        <IconButton onClick={handleClose} tooltip="Close">
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
});