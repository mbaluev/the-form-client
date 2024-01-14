import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { IconQuestion } from '@ui/components/icon/iconQuestion';
import { Stack, Typography } from '@mui/material';

export const QuestionRenderer = (params: ICellRendererParams) => {
  const position = params.data?.question?.position;
  const title = params.data.question?.title;
  return (
    <Stack direction="row" spacing={2} alignItems="center" height="100%">
      <Stack direction="row" spacing={2} alignItems="center" height="100%" flex="1 1 auto">
        <Typography>{position}.</Typography>
        <IconQuestion userQuestion={params.data} />
        <Typography style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</Typography>
      </Stack>
    </Stack>
  );
};
