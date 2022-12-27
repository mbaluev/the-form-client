import { MasterDev } from '@ui/masters/masterDev';
import { ButtonControls } from '@ui/pages/dev/button/buttonControls';
import { Page } from '@ui/layout/page';

const Button = () => {
  return (
    <Page title="Button">
      <ButtonControls />
    </Page>
  );
};

Button.Layout = MasterDev;
export default Button;
