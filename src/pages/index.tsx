import { CustomHead } from 'ui/layout/head';
import { Page } from '@ui/layout/page';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Intro } from '@ui/pages/index/intro';

const Index = (props: any) => {
  return (
    <MasterAuth>
      <Page {...props}>
        <CustomHead />
        <Intro />
      </Page>
    </MasterAuth>
  );
};

export default Index;
