import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { Panel } from '@ui/layout/page/panel';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';

const Block = (props: any) => {
  const router = useRouter();
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTES.HOME.label,
      url: { pathname: ROUTES.HOME.path },
    },
    {
      label: ROUTES.ADMIN_SETTINGS_BLOCKS.label,
      url: { pathname: ROUTES.ADMIN_SETTINGS_BLOCKS.path },
    },
    {
      label: ROUTES.ADMIN_SETTINGS_BLOCK.label,
      url: { pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path, query: router.query },
    },
  ];

  return (
    <MasterAuth>
      <Page {...props} breadCrumbs={breadCrumbs} right={<Panel />}>
        <Panel>block</Panel>
      </Page>
    </MasterAuth>
  );
};

export default observer(Block);
