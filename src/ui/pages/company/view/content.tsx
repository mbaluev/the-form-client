import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { General } from '@ui/pages/company/view/general';
import { Contact } from '@ui/pages/company/view/contact';
import Divider from '@mui/material/Divider';

export const Content = observer(() => {
  return (
    <Stack spacing={4}>
      <General />
      <Divider />
      <Contact />
    </Stack>
  );
});
