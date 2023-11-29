import { Page } from '@ui/layout/page';
import { IndexContent } from '@ui/pages/index/indexContent';
import { MasterAnon } from '@ui/masters/masterAnon';

const Index = () => {
  return (
    <Page>
      <IndexContent />
    </Page>
  );
};

Index.Layout = MasterAnon;
export default Index;
