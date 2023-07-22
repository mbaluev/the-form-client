import React from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IBlockUserViewModel } from '@viewModel/modules/entities/block/user/interface';
import { StatusBlock } from '@ui/components/statuses/statusBlock';

export const BlockSubTitle = observer(() => {
  const { data: userBlock } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  return (
    <React.Fragment>
      <StatusBlock userBlock={userBlock} />
      {userBlock?.block?.title}
    </React.Fragment>
  );
});
