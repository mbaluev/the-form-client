import React from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@components/iconButton';
import { Toolbar } from '@components/toolbar';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IBlockViewModel } from '@viewModel/modules/entities/block/interface';
import { DialogConfirm } from '@ui/dialogs/common/dialogConfirm';

interface IProps {
  onClose?: () => void;
  onDelete?: () => Promise<void>;
}

export const BlockCardActions = observer((props: IProps) => {
  const { onClose, onDelete } = props;

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
  } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);

  const handleDelete = async () => {
    addDeleteId(data?.id);
    deleteOpen();
  };
  const handleDeleteSubmit = async () => {
    const result = await deleteSubmit();
    if (result && onDelete) await onDelete();
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
          <IconButton onClick={onClose} tooltip="Close">
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
        title="Delete block"
        message="Are you sure you want to delete block?"
      />
    </React.Fragment>
  );
});
