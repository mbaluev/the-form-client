import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { IUserViewModel } from '@viewModel/modules/user/interface';

export const UserLabel = observer(() => {
  const { data } = useViewModel<IUserViewModel>(VIEW_MODEL.User);
  const label = data ? `${data.name}` : undefined;
  return <React.Fragment>{label}</React.Fragment>;
});
