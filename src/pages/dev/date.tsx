import { MasterDev } from '@ui/masters/masterDev';
import { DateFieldControls } from '@ui/pages/dev/fields/dateFieldControls';
import { Page } from '@ui/layout/page';

const Date = () => {
  return (
    <Page title="Date">
      <DateFieldControls />
    </Page>
  );
};

Date.Layout = MasterDev;
export default Date;
