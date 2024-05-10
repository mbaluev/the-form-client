import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { FormProvider, useForm } from 'react-hook-form';
import { IBlockDTO } from '@model/entities/block';
import { DEFAULT_BLOCK } from '@model/entities/block/default';
import { PageBlocks } from '@ui/pages/settings/block/index/page';
import { PageBlock } from '@ui/pages/settings/block/item/page';
import { useModuleSettingsListStore } from '@store/modules/settings/module/list/hook';
import { useEffect } from 'react';

const Blocks = (props: any) => {
  const { getData: getModules, setData: setModules } = useModuleSettingsListStore();

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTES.HOME.label,
      url: { pathname: ROUTES.HOME.path },
    },
    {
      label: ROUTES.SETTINGS_BLOCKS.label,
      url: { pathname: ROUTES.SETTINGS_BLOCKS.path },
    },
  ];

  useEffect(() => {
    getModules();
    return () => setModules();
  }, []);

  const methods = useForm<IBlockDTO>({ mode: 'all', defaultValues: DEFAULT_BLOCK });

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

export default Blocks;
