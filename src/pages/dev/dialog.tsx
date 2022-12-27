import { MasterDev } from '@ui/masters/masterDev';
import { DialogControls } from '@ui/pages/dev/dialog/dialogControls';
import { Page } from '@ui/layout/page';

const Dialog = () => {
  return (
    <Page title="Dialog">
      <DialogControls />
    </Page>
  );
};

Dialog.Layout = MasterDev;
export default Dialog;
