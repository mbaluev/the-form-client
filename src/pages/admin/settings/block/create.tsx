import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { FormProvider, useForm } from 'react-hook-form';
import { IBlockDTO } from '@model/entities/block';
import { DEFAULT_BLOCK } from '@model/entities/block/default';
import { PageBlocks } from '@ui/pages/admin/settings/block/index/page';
import { PageBlock } from '@ui/pages/admin/settings/block/item/page';
import { useModuleSettingsListStore } from '@store/modules/settings/module/list/hook';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const BlockCreate = (props: any) => {
  const { getData: getModules, setData: setModules } = useModuleSettingsListStore();
  const router = useRouter();
  const moduleId = router.query.moduleId as string;

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
      label: ROUTES.ADMIN_SETTINGS_BLOCK_CREATE.label,
      url: { pathname: ROUTES.ADMIN_SETTINGS_BLOCK_CREATE.path },
    },
  ];

  useEffect(() => {
    getModules();
    return () => setModules();
  }, []);

  const methods = useForm<IBlockDTO>({ mode: 'all', defaultValues: DEFAULT_BLOCK });
  useEffect(() => {
    methods.reset({ ...DEFAULT_BLOCK, moduleId });
  }, [moduleId]);

  return (
    <MasterAuth>
      <FormProvider {...methods}>
        <Page {...props} breadCrumbs={breadCrumbs} right={<PageBlock />}>
          <PageBlocks />
        </Page>
      </FormProvider>
    </MasterAuth>
  );
};

export default BlockCreate;
