import { CustomHead } from '@ui/layout/customHead';
import { Page } from '@ui/layout/page';
import { observer } from 'mobx-react';
import { MasterAuth } from '@ui/masters/masterAuth';

const Index = (props: any) => {
  return (
    <MasterAuth>
      <Page {...props}>
        <CustomHead />
      </Page>
    </MasterAuth>
  );
};

export default observer(Index);
