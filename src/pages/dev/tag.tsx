import { MasterDev } from '@ui/masters/masterDev';
import { TagFieldControls } from '@ui/pages/dev/fields/tagFieldControls';
import { Page } from '@ui/layout/page';

const Tag = () => {
  return (
    <Page title="Tag">
      <TagFieldControls />
    </Page>
  );
};

Tag.Layout = MasterDev;
export default Tag;
