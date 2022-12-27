import { MasterDev } from '@ui/masters/masterDev';
import { Page } from '@ui/layout/page';
import { MonthRangeFieldControls } from '@ui/pages/dev/fields/monthRangeFieldControls';

const MonthRange = () => {
  return (
    <Page title="MonthRange">
      <MonthRangeFieldControls />
    </Page>
  );
};

MonthRange.Layout = MasterDev;
export default MonthRange;
