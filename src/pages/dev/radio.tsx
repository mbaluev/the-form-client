import { MasterDev } from '@ui/masters/masterDev';
import { RadioGroupFieldControls } from '@ui/pages/dev/fields/radioGroupFieldControls';
import { Page } from '@ui/layout/page';

const Radio = () => {
  return (
    <Page title="Radio">
      <RadioGroupFieldControls />
    </Page>
  );
};

Radio.Layout = MasterDev;
export default Radio;
