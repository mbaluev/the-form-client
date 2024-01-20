import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { PageModule } from '@ui/pages/admin/settings/module/item/page';
import { PageModules } from '@ui/pages/admin/settings/module/index/page';
import { useModuleItemStore } from '@store/modules/entities/module/item/useModuleItemStore';
import { useEffect } from 'react';

const Module = (props: any) => {
  const router = useRouter();
  const id = router.query.slug?.[0] as string;

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTES.HOME.label,
      url: { pathname: ROUTES.HOME.path },
    },
    {
      label: ROUTES.ADMIN_SETTINGS_MODULES.label,
      url: { pathname: ROUTES.ADMIN_SETTINGS_MODULES.path },
    },
    {
      label: ROUTES.ADMIN_SETTINGS_MODULE.label,
      url: { pathname: ROUTES.ADMIN_SETTINGS_MODULE.path, query: { slug: [id] } },
    },
  ];

  const { getData, setData } = useModuleItemStore();
  useEffect(() => {
    if (id) getData(id);
    return () => setData();
  }, [id]);

  return (
    <MasterAuth>
      <Page {...props} breadCrumbs={breadCrumbs} right={<PageModule />}>
        <PageModules />
      </Page>
    </MasterAuth>
  );
};

export default observer(Module);
