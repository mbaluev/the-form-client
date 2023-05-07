import React from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@components/iconButton';
import { Toolbar } from '@components/toolbar';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IMaterialUserViewModel } from '@viewModel/modules/material/user/interface';
import CloseIcon from '@mui/icons-material/Close';

export const MaterialCardActions = observer(() => {
  const { clearData } = useViewModel<IMaterialUserViewModel>(
    VIEW_MODEL.MaterialUser
  );

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
