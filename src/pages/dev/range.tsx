import { MasterDev } from '@ui/masters/masterDev';
import { RangeFieldControls } from '@ui/pages/dev/fields/rangeFieldControls';
import { Page } from '@ui/layout/page';

const Range = () => {
  return (
    <Page title="Range">
      <RangeFieldControls />
    </Page>
  );
};

Range.Layout = MasterDev;
export default Range;
