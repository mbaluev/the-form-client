import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { SeparatorBase } from '@ui/layout/card/separator';
import { useModuleItemStore } from '@store/modules/entities/module/item/useModuleItemStore';
import { ProgressBase } from '@ui/layout/card/progress';

export const Separator = observer(() => {
  const { isSaveLoading } = useModuleItemStore();
  const router = useRouter();
  const id = router.query.slug?.[0];
  const isCreate = id === 'create';
  if (!isCreate) return null;
  if (isSaveLoading) return <ProgressBase />;
  return <SeparatorBase />;
});
