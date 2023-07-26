import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Stack } from '@mui/material';
import { IconMaterials } from '@ui/components/icon/iconMaterials';
import { IconTasks } from '@ui/components/icon/iconTasks';
import { IconQuestions } from '@ui/components/icon/iconQuestions';

export const IconRenderer = (props: ICellRendererParams) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" height="100%">
      <IconMaterials userBlock={props.data} />
      <IconTasks userBlock={props.data} admin />
      <IconQuestions userBlock={props.data} />
    </Stack>
  );
};
