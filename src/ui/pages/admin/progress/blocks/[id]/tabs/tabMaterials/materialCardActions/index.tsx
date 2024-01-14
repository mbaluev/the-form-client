import React from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@components/iconButton';
import { Toolbar } from '@components/toolbar';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import CloseIcon from '@mui/icons-material/Close';
import { IMaterialAdminViewModel } from '@viewModel/modules/entities/material/admin/interface';

export const MaterialCardActions = observer(() => {
  const { clearData } = useViewModel<IMaterialAdminViewModel>(VIEW_MODEL.MaterialAdmin);

  const handleClose = async () => {
    clearData();
  };

  return (
    <Toolbar
      itemsLeft={[
        <IconButton onClick={handleClose} tooltip="Close">
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
});
