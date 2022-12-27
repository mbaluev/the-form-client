import React from 'react';
import { MasterDev } from '@ui/masters/masterDev';
import { IndexContent } from '@ui/pages/dev/index/indexContent';
import { Page } from '@ui/layout/page';
import { IconButton } from '@components/iconButton';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

const Index = () => {
  return (
    <Page
      title="All fields"
      quickFilter={
        <IconButton>
          <MoreHorizOutlinedIcon />
        </IconButton>
      }
    >
      <IndexContent />
    </Page>
  );
};

Index.Layout = MasterDev;
export default Index;
