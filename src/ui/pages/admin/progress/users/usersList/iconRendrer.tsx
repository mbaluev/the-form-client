import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Stack } from '@mui/material';
import { IconModules } from '@ui/components/icon/iconModules';

export const IconRenderer = (props: ICellRendererParams) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" height="100%">
      <IconModules userModules={props.data.userModules} />
    </Stack>
  );
};
