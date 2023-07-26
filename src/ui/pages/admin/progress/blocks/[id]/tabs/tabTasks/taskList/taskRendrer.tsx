import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Tag } from '@components/tag';
import { Stack, Typography } from '@mui/material';
import { IconTask } from '@ui/components/icon/iconTask';

export const TaskRenderer = (params: ICellRendererParams) => {
  const index = Number(params.node.rowIndex) + 1;
  const name = params.data?.task?.document?.name;
  const type = params.data?.task?.document?.documentType?.name;
  return (
    <Stack direction="row" spacing={2} alignItems="center" height="100%">
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        height="100%"
        flex="1 1 auto"
      >
        <Typography>{index}.</Typography>
        <IconTask userTask={params.data} admin />
        <Typography style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {name}
        </Typography>
      </Stack>
      <Tag tag={type} color="blue" />
    </Stack>
  );
};
