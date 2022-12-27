import { MasterDev } from '@ui/masters/masterDev';
import { Page } from '@ui/layout/page';
import { AttachmentControls } from '@ui/pages/dev/attachment/attachmentControls';

const Accordion = () => {
  return (
    <Page title="Attachment">
      <AttachmentControls />
    </Page>
  );
};

Accordion.Layout = MasterDev;
export default Accordion;
