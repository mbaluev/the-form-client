import { MasterDev } from '@ui/masters/masterDev';
import { MultiSelectExtFieldControls } from '@ui/pages/dev/fields/multiSelectExtFieldControls';
import { Page } from '@ui/layout/page';

const MultiSelectExt = () => {
  return (
    <Page title="MultiSelectExt">
      <MultiSelectExtFieldControls />
    </Page>
  );
};

MultiSelectExt.Layout = MasterDev;
export default MultiSelectExt;
