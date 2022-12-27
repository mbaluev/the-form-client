import { MasterDev } from '@ui/masters/masterDev';
import { IconButtonControls } from '@ui/pages/dev/button/iconButtonControls';
import { Page } from '@ui/layout/page';

const IconButton = () => {
  return (
    <Page title="IconButton">
      <IconButtonControls />
    </Page>
  );
};

IconButton.Layout = MasterDev;
export default IconButton;
