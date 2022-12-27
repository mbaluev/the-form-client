import { MasterDev } from '@ui/masters/masterDev';
import { TabVerticalControls } from '@ui/pages/dev/tab/tabVerticalControls';
import { Page } from '@ui/layout/page';

const TabVertical = () => {
  return (
    <Page title="Tab vertical">
      <TabVerticalControls />
    </Page>
  );
};

TabVertical.Layout = MasterDev;
export default TabVertical;
