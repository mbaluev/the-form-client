import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { SeparatorBase } from '@ui/layout/card/separator';
import { ProgressBase } from '@ui/layout/card/progress';
import { useBlockItemStore } from '@store/modules/entities/block/item/useBlockItemStore';

export const Separator = observer(() => {
  const { isSaveLoading } = useBlockItemStore();
  const router = useRouter();
  const id = router.query.slug?.[0];
  const isCreate = id === 'create';
  if (!isCreate) return null;
  if (isSaveLoading) return <ProgressBase />;
  return <SeparatorBase />;
});
