import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { IMaterialUserViewModel } from '@viewModel/modules/material/user/interface';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Stack } from '@mui/material';

export const MaterialLabel = observer(() => {
  const { data } = useViewModel<IMaterialUserViewModel>(
    VIEW_MODEL.MaterialUser
  );
  const icon = data?.complete ? (
    <CheckCircleIcon className="color_blue" sx={{ marginTop: '4px' }} />
  ) : (
    <RadioButtonUncheckedIcon
      className="color_grey-50"
      sx={{ marginTop: '4px' }}
    />
  );
  const label = data ? <div>{data.document.name}</div> : undefined;
  return (
    <Stack direction="row" spacing="10px">
      {icon}
      {label}
    </Stack>
  );
});
