import { MasterDev } from '@ui/masters/masterDev';
import { CheckboxFieldControls } from '@ui/pages/dev/fields/checkboxFieldControls';
import { Page } from '@ui/layout/page';

const Checkbox = () => {
  return (
    <Page title="Checkbox">
      <CheckboxFieldControls />
    </Page>
  );
};

Checkbox.Layout = MasterDev;
export default Checkbox;
