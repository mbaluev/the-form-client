import { observer } from 'mobx-react';
import { SeparatorBase } from '@ui/layout/card/separator';
import { ProgressBase } from '@ui/layout/card/progress';
import { useBlockItemStore } from '@store/modules/entities/block/item/useBlockItemStore';

export const Separator = observer(() => {
  const { isSaveLoading } = useBlockItemStore();
  if (isSaveLoading) return <ProgressBase />;
  return <SeparatorBase />;
});
