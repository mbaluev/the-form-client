import { MasterDev } from '@ui/masters/masterDev';
import { MultiSelectFieldControls } from '@ui/pages/dev/fields/multiSelectFieldControls';
import { Page } from '@ui/layout/page';

const MultiSelect = () => {
  return (
    <Page title="MultiSelect">
      <MultiSelectFieldControls />
    </Page>
  );
};

MultiSelect.Layout = MasterDev;
export default MultiSelect;
