import { observer } from 'mobx-react';
import { SeparatorBase } from '@ui/layout/card/separator';
import { useModuleSettingsItemStore } from '@store/modules/settings/module/item/hook';
import { ProgressBase } from '@ui/layout/card/progress';
import { ROUTES } from '@settings/routes';
import { useRouter } from 'next/router';

export const Separator = observer(() => {
  const { isSaveLoading } = useModuleSettingsItemStore();

  const router = useRouter();
  const isCreate = router.pathname === ROUTES.ADMIN_SETTINGS_MODULE_CREATE.path;

  if (!isCreate) return null;
  if (isSaveLoading) return <ProgressBase />;

  return <SeparatorBase />;
});
