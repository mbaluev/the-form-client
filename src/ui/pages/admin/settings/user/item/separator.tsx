import { observer } from 'mobx-react';
import { SeparatorBase } from '@ui/layout/card/separator';
import { ProgressBase } from '@ui/layout/card/progress';
import { useUserItemStore } from '@store/modules/entities/user/item/useUserItemStore';

export const Separator = observer(() => {
  const { isSaveLoading } = useUserItemStore();
  if (isSaveLoading) return <ProgressBase />;
  return <SeparatorBase />;
});
