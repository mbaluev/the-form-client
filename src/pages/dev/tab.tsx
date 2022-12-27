import { MasterDev } from '@ui/masters/masterDev';
import { TabControls } from '@ui/pages/dev/tab/tabControls';
import { Page } from '@ui/layout/page';

const Tab = () => {
  return (
    <Page title="Tab">
      <TabControls />
    </Page>
  );
};

Tab.Layout = MasterDev;
export default Tab;
