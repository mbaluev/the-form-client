import { observer } from 'mobx-react';
import { SeparatorBase } from '@ui/layout/card/separator';
import { ProgressBase } from '@ui/layout/card/progress';
import { useUserSettingsItemStore } from '@store/modules/settings/user/settings/item/hook';

export const Separator = observer(() => {
  const { isSaveLoading } = useUserSettingsItemStore();
  if (isSaveLoading) return <ProgressBase />;
  return <SeparatorBase />;
});
