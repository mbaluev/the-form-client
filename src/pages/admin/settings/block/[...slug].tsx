import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { PageBlocks } from '@ui/pages/admin/settings/block/index/page';
import { PageBlock } from '@ui/pages/admin/settings/block/item/page';
import { useEffect } from 'react';
import { useBlockItemStore } from '@store/modules/entities/block/item/useBlockItemStore';
import { useModuleListStore } from '@store/modules/entities/module/list/useModuleListStore';

const Block = (props: any) => {
  const router = useRouter();
  const id = router.query.slug?.[0] as string;

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
      url: { pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path, query: { slug: [id] } },
    },
  ];

  const { getData: getBlock, setData: setBlock } = useBlockItemStore();
  const { getData: getModules, setData: setModules } = useModuleListStore();
  useEffect(() => {
    if (id) {
      getBlock(id);
      getModules();
    }
    return () => {
      setBlock();
      setModules();
    };
  }, [id]);

  return (
    <MasterAuth>
      <Page {...props} breadCrumbs={breadCrumbs} right={<PageBlock />}>
        <PageBlocks />
      </Page>
    </MasterAuth>
  );
};

export default observer(Block);
