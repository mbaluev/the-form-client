import { MasterDev } from '@ui/masters/masterDev';
import { ToggleButtonControls } from '@ui/pages/dev/fields/toggleButtonControls';
import { Page } from '@ui/layout/page';

const Toggle = () => {
  return (
    <Page title="Toggle">
      <ToggleButtonControls />
    </Page>
  );
};

Toggle.Layout = MasterDev;
export default Toggle;
