import { MasterDev } from '@ui/masters/masterDev';
import { SwitchFieldControls } from '@ui/pages/dev/fields/switchFieldControls';
import { Page } from '@ui/layout/page';

const Switch = () => {
  return (
    <Page title="Switch">
      <SwitchFieldControls />
    </Page>
  );
};

Switch.Layout = MasterDev;
export default Switch;
