import { CustomHead } from '@ui/layout/customHead';
import { Page } from '@ui/layout/page';
import { observer } from 'mobx-react';
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

export default observer(Index);
