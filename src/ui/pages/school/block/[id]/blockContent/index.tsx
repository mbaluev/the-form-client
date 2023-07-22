import React from 'react';
import { classNames } from '@utils/classNames';
import { BlockTabs } from '@ui/pages/school/block/[id]/blockTabs';
import { Page403 } from '@ui/pages/errors/403';
import { observer } from 'mobx-react';
import { Loader } from '@components/loader';
import { IBlockUserDTO } from '@model/entities/block';
import './index.scss';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const BlockContent = observer((props: IProps) => {
  const { userBlock } = props;
  const cls = classNames('block-content');
  if (!userBlock) return <Loader loading relative />;
  return userBlock.enable ? (
    <div className={cls}>
      <BlockTabs />
    </div>
  ) : (
    <Page403 />
  );
});
