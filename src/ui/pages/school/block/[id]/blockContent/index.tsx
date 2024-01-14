import React from 'react';
import { Page403 } from '@ui/pages/errors/403';
import { observer } from 'mobx-react';
import { Loader } from '@components/loader';
import { useViewModel } from '@hooks/useViewModel';
import { IBlockUserViewModel } from '@viewModel/modules/entities/block/user/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { BlockTabs } from '@ui/pages/school/block/[id]/blockTabs';
import { Box } from '@mui/material';

export const BlockContent = observer(() => {
  const { data: userBlock } = useViewModel<IBlockUserViewModel>(VIEW_MODEL.BlockUser);
  if (!userBlock) return <Loader loading relative />;
  return userBlock.enable ? (
    <Box flex="1 1 auto">
      <BlockTabs />
    </Box>
  ) : (
    <Page403 />
  );
});
