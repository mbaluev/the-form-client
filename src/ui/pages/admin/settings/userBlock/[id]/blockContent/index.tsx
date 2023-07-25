import React from 'react';
import { Page403 } from '@ui/pages/errors/403';
import { observer } from 'mobx-react';
import { Loader } from '@components/loader';
import { useViewModel } from '@hooks/useViewModel';
import { IBlockAdminViewModel } from '@viewModel/modules/entities/block/admin/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { BlockTabs } from '@ui/pages/admin/settings/userBlock/[id]/blockTabs';
import { Box } from '@mui/material';

export const BlockContent = observer(() => {
  const { data: userBlock } = useViewModel<IBlockAdminViewModel>(
    VIEW_MODEL.BlockAdmin
  );
  if (!userBlock) return <Loader loading relative />;
  return userBlock.enable ? (
    <Box flex="1 1 auto">
      <BlockTabs />
    </Box>
  ) : (
    <Page403 />
  );
});
