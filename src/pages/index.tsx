import { CustomHead } from '@ui/layout/customHead';
import { Page } from '@ui/layout/page';
import { TBreadCrumb } from '@ui/layout/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { observer } from 'mobx-react';
import { MasterAuth } from '@ui/masters/masterAuth';

const Index = (props: any) => {
  const breadCrumbs: TBreadCrumb[] = [
    {
      url: ROUTES.HOME.path,
      label: ROUTES.HOME.label,
    },
  ];
  return (
    <MasterAuth>
      <Page breadCrumbs={breadCrumbs} {...props}>
        <CustomHead />
        ...
      </Page>
    </MasterAuth>
  );
};

export default observer(Index);
