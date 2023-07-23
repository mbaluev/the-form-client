import React from 'react';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { observer } from 'mobx-react';
import { IconButton } from '@components/iconButton';
import { useRouter } from 'next/router';
import { Toolbar } from '@components/toolbar';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useViewModel } from '@hooks/useViewModel';
import { IModuleViewModel } from '@viewModel/modules/entities/module/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { DialogConfirm } from '@ui/dialogs/common/dialogConfirm';
import DeleteIcon from '@mui/icons-material/Delete';

export const ModuleCardActions = observer(() => {
  const {
    data,
    hasChanges,
    saveData,
    isDeleteOpen,
    isDeleteLoading,
    addDeleteId,
    deleteOpen,
    deleteClose,
    deleteSubmit,
    hasErrors,
  } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);

  const router = useRouter();
  const handleDelete = async () => {
    addDeleteId(data?.id);
    deleteOpen();
  };
  const handleClose = async () => {
    await router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_MODULES.path,
    });
  };
  const handleDeleteSubmit = async () => {
    const result = await deleteSubmit();
    if (result) {
      await router.push({
        pathname: ROUTER_CONST_SCHOOL.ADMIN_MODULES.path,
      });
    }
  };

  return (
    <React.Fragment>
      <Toolbar
        itemsLeft={[
          <IconButton
            onClick={saveData}
            tooltip="Save changes"
            disabled={!hasChanges || hasErrors}
          >
            <SaveIcon />
          </IconButton>,
          <IconButton onClick={handleDelete} tooltip="Delete">
            <DeleteIcon />
          </IconButton>,
          <IconButton onClick={handleClose} tooltip="Close">
            <CloseIcon />
          </IconButton>,
        ]}
      />
      <DialogConfirm
        isOpen={isDeleteOpen}
        isLoading={isDeleteLoading}
        onClose={deleteClose}
        onCancel={deleteClose}
        onSubmit={handleDeleteSubmit}
        title="Delete module"
        message="Are you sure you want to delete module?"
      />
    </React.Fragment>
  );
});
