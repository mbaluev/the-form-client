import React from 'react';
import { observer } from 'mobx-react';
import { StatusBlock } from '@ui/components/statuses/statusBlock';
import { IBlockUserDTO } from '@model/entities/block';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const BlockSubTitle = observer((props: IProps) => {
  const { userBlock } = props;
  return (
    <React.Fragment>
      <StatusBlock userBlock={userBlock} />
      {userBlock?.block?.title}
    </React.Fragment>
  );
});
