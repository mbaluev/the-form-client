import { observer } from 'mobx-react';
import { SeparatorBase } from '@ui/layout/card/separator';
import { useModuleItemStore } from '@store/modules/entities/module/item/useModuleItemStore';
import { ProgressBase } from '@ui/layout/card/progress';
import { ROUTES } from '@settings/routes';
import { useRouter } from 'next/router';

export const Separator = observer(() => {
  const { isSaveLoading } = useModuleItemStore();

  const router = useRouter();
  const isCreate = router.pathname === ROUTES.ADMIN_SETTINGS_MODULE_CREATE.path;

  if (!isCreate) return null;
  if (isSaveLoading) return <ProgressBase />;

  return <SeparatorBase />;
});
