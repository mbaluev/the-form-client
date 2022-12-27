import { MasterDev } from '@ui/masters/masterDev';
import { SliderFieldControls } from '@ui/pages/dev/fields/sliderFieldControls';
import { Page } from '@ui/layout/page';

const Slider = () => {
  return (
    <Page title="Slider">
      <SliderFieldControls />
    </Page>
  );
};

Slider.Layout = MasterDev;
export default Slider;
