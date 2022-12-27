import React from 'react';
import { FormField, FormSection } from '@components/form';
import { IconButton } from '@components/iconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';

export const IconButtonControls = () => {
  return (
    <FormSection cols={4}>
      <FormField title="1. IconButton colors" align="left">
        <IconButton disabled className="field-control">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="grey" className="field-control">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="grey-light" className="field-control">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="blue" className="field-control">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="green" className="field-control">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="red" className="field-control">
          <NotificationsIcon />
        </IconButton>
        <IconButton size="small" className="field-control">
          <NotificationsIcon />
        </IconButton>
        <IconButton size="x-small" className="field-control">
          <NotificationsIcon />
        </IconButton>
      </FormField>
    </FormSection>
  );
};
