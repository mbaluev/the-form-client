import { observer } from 'mobx-react';
import { SeparatorBase } from '@ui/layout/card/separator';
import { useModuleItemStore } from '@store/modules/entities/module/item/useModuleItemStore';
import { ProgressBase } from '@ui/layout/card/progress';

export const Separator = observer(() => {
  const { isSaveLoading } = useModuleItemStore();
  if (isSaveLoading) return <ProgressBase />;
  return <SeparatorBase />;
});
