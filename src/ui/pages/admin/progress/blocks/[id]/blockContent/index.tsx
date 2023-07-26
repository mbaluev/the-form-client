import React from 'react';
import { observer } from 'mobx-react';
import { Loader } from '@components/loader';
import { useViewModel } from '@hooks/useViewModel';
import { IBlockAdminViewModel } from '@viewModel/modules/entities/block/admin/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { BlockTabs } from '@ui/pages/admin/progress/blocks/[id]/blockTabs';
import { Box } from '@mui/material';

export const BlockContent = observer(() => {
  const { data: userBlock } = useViewModel<IBlockAdminViewModel>(
    VIEW_MODEL.BlockAdmin
  );
  if (!userBlock) return <Loader loading relative />;
  return (
    <Box flex="1 1 auto">
      <BlockTabs />
    </Box>
  );
});
