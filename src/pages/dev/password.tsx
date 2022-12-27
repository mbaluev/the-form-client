import { MasterDev } from '@ui/masters/masterDev';
import { PasswordFieldControls } from '@ui/pages/dev/fields/passwordFieldControls';
import { Page } from '@ui/layout/page';

const Password = () => {
  return (
    <Page title="Password">
      <PasswordFieldControls />
    </Page>
  );
};

Password.Layout = MasterDev;
export default Password;
