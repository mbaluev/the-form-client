import { observer } from 'mobx-react';
import { TagBlock } from '@ui/components/tag/tagBlock';
import { IBlockUserDTO } from '@model/entities/block';
import { Fragment } from 'react';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const SubTitleBlock = observer((props: IProps) => {
  const { userBlock } = props;
  return (
    <Fragment>
      <TagBlock userBlock={userBlock} />
      {userBlock?.block?.title}
    </Fragment>
  );
});
