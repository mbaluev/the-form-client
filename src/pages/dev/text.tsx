import { MasterDev } from '@ui/masters/masterDev';
import { TextFieldControls } from '@ui/pages/dev/fields/textFieldControls';
import { Page } from '@ui/layout/page';

const Text = () => {
  return (
    <Page title="Text">
      <TextFieldControls />
    </Page>
  );
};

Text.Layout = MasterDev;
export default Text;
