import { observer } from 'mobx-react';
import { SeparatorBase } from '@ui/layout/card/separator';
import { ProgressBase } from '@ui/layout/card/progress';
import { useBlockSettingsItemStore } from '@store/modules/settings/block/settings/item/hook';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';

export const Separator = observer(() => {
  const { isSaveLoading } = useBlockSettingsItemStore();

  const router = useRouter();
  const isCreate = router.pathname === ROUTES.ADMIN_SETTINGS_BLOCK_CREATE.path;

  if (!isCreate) return null;
  if (isSaveLoading) return <ProgressBase />;

  return <SeparatorBase />;
});
