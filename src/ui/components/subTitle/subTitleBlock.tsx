import React from 'react';
import { observer } from 'mobx-react';
import { TagBlock } from '@ui/components/tag/tagBlock';
import { IBlockUserDTO } from '@model/entities/block';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const SubTitleBlock = observer((props: IProps) => {
  const { userBlock } = props;
  return (
    <React.Fragment>
      <TagBlock userBlock={userBlock} />
      {userBlock?.block?.title}
    </React.Fragment>
  );
});
