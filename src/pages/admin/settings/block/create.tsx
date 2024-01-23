import { TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import { ROUTES } from '@settings/routes';
import { MasterAuth } from '@ui/masters/masterAuth';
import { Page } from '@ui/layout/page/page';
import { observer } from 'mobx-react';
import { FormProvider, useForm } from 'react-hook-form';
import { IBlockDTO } from '@model/entities/block';
import { DEFAULT_BLOCK } from '@model/entities/block/default';
import { PageBlock } from '@ui/pages/admin/settings/block/item/page';
import { PageBlocks } from '@ui/pages/admin/settings/block/index/page';

const BlockCreate = (props: any) => {
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTES.HOME.label,
      url: { pathname: ROUTES.HOME.path },
    },
    {
      label: ROUTES.ADMIN_SETTINGS_BLOCK.label,
      url: { pathname: ROUTES.ADMIN_SETTINGS_BLOCK.path },
    },
    {
      label: ROUTES.ADMIN_SETTINGS_BLOCK_CREATE.label,
      url: { pathname: ROUTES.ADMIN_SETTINGS_BLOCK_CREATE.path },
    },
  ];
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

export default observer(BlockCreate);
