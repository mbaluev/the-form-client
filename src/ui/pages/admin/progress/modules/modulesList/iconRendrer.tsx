import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Stack } from '@mui/material';
import { IconModule } from '@ui/components/icon/iconModule';

export const IconRenderer = (props: ICellRendererParams) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" height="100%">
      <IconModule userModule={props.data} />
    </Stack>
  );
};
