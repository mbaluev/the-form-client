import { MasterDev } from '@ui/masters/masterDev';
import { AccordionControls } from '@ui/pages/dev/accordion/accordionControls';
import { Page } from '@ui/layout/page';

const Accordion = () => {
  return (
    <Page title="Accordion">
      <AccordionControls />
    </Page>
  );
};

Accordion.Layout = MasterDev;
export default Accordion;
