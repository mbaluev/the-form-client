import { MasterDev } from '@ui/masters/masterDev';
import { SelectFieldControls } from '@ui/pages/dev/fields/selectFieldControls';
import { Page } from '@ui/layout/page';

const Select = () => {
  return (
    <Page title="Select">
      <SelectFieldControls />
    </Page>
  );
};

Select.Layout = MasterDev;
export default Select;
