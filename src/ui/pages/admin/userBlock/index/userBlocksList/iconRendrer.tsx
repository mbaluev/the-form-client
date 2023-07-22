import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Stack } from '@mui/material';
import { IconMaterial } from '@ui/components/icons/iconMaterial';
import { IconTask } from '@ui/components/icons/iconTask';
import { IconQuestion } from '@ui/components/icons/iconQuestion';

export const IconRenderer = (props: ICellRendererParams) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" height="100%">
      <IconMaterial userBlock={props.data} />
      <IconTask userBlock={props.data} admin />
      <IconQuestion userBlock={props.data} />
    </Stack>
  );
};
