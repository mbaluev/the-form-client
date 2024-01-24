import { observer } from 'mobx-react';
import { SeparatorBase } from '@ui/layout/card/separator';
import { ProgressBase } from '@ui/layout/card/progress';
import { useBlockItemStore } from '@store/modules/entities/block/item/useBlockItemStore';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';

export const Separator = observer(() => {
  const { isSaveLoading } = useBlockItemStore();

  const router = useRouter();
  const isCreate =
    router.pathname === ROUTES.ADMIN_SETTINGS_BLOCK_CREATE.path ||
    router.pathname === ROUTES.ADMIN_SETTINGS_MODULE_BLOCK_CREATE.path;

  if (!isCreate) return null;
  if (isSaveLoading) return <ProgressBase />;

  return <SeparatorBase />;
});
