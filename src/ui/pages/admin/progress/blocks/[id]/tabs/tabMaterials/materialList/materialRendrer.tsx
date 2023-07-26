import { ICellRendererParams } from 'ag-grid-community';
import { IconMaterial } from '@ui/components/icon/iconMaterial';
import { Stack, Typography } from '@mui/material';

export const MaterialRenderer = (params: ICellRendererParams) => {
  const index = Number(params.node.rowIndex) + 1;
  const name = params.data?.material?.document.name;
  return (
    <Stack direction="row" spacing={2} alignItems="center" height="100%">
      <Typography>{index}.</Typography>
      <IconMaterial userMaterial={params.data} />
      <Typography>{name}</Typography>
    </Stack>
  );
};
