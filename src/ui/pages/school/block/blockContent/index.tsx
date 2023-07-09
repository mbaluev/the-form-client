import React from 'react';
import { classNames } from '@utils/classNames';
import { BlockTabs } from '@ui/pages/school/block/blockTabs';
import { Page403 } from '@ui/pages/errors/403';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Loader } from '@components/loader';
import { IBlockUserViewModel } from '@viewModel/modules/entities/block/user/interface';
import './index.scss';

export const BlockContent = observer(() => {
  const { data: userBlock } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
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
