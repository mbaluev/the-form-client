import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { Progress } from '@ui/layout/card/progress';
import { TitleDivider } from '@ui/layout/card/divider';
import { General } from '@ui/pages/company/register/general';
import { Contact } from '@ui/pages/company/register/contact';
import { useCompanyViewStore } from '@store/modules/onboard/company/view/useCompanyViewStore';
import Divider from '@mui/material/Divider';

export const Content = observer(() => {
  const { isLoading } = useCompanyViewStore();
  return (
    <Stack spacing={2}>
      {isLoading ? <Progress /> : <TitleDivider />}
      <Stack spacing={4}>
        <General />
        <Divider />
        <Contact />
      </Stack>
    </Stack>
  );
});
