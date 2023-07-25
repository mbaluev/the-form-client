import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { IModuleViewModel } from '@viewModel/modules/entities/module/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';

export const ModuleLabel = observer(() => {
  const { data } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);
  const label = data ? `${data.title}. ${data.name}` : undefined;
  return <React.Fragment>{label}</React.Fragment>;
});
