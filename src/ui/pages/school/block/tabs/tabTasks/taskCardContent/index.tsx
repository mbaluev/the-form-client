import React from 'react';
import { observer } from 'mobx-react';
import { NoData } from '@components/noData';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

export const TaskCardContent = observer(() => {
  return (
    <NoData
      icon={<DoNotDisturbIcon />}
      message={`Click to "+" button at upper right corner to send your homework`}
    />
  );
});
