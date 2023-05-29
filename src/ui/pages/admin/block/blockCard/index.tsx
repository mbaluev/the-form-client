import React from 'react';
import { Page } from '@ui/layout/page';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Page204 } from '@ui/pages/errors/204';
import { BlockTabs } from '@ui/pages/admin/block/blockTabs';
import { BlockCardActions } from '@ui/pages/admin/block/blockCardActions';
import { BlockLabel } from '@ui/pages/admin/block/blockLabel';
import { IBlockViewModel } from '@viewModel/modules/entities/block/interface';
import { Loader } from '@components/loader';

interface IProps {
  onClose?: () => void;
  onDelete?: () => Promise<void>;
}
export const BlockCard = observer((props: IProps) => {
  const { onClose, onDelete } = props;
  const { blockData, isDataLoading } = useViewModel<IBlockViewModel>(
    VIEW_MODEL.Block
  );
  if (!blockData) return <Page204 />;
  return (
    <Page
      title={<BlockLabel />}
      quickFilter={<BlockCardActions onClose={onClose} onDelete={onDelete} />}
    >
      <Loader loading={isDataLoading} />
      <BlockTabs />
    </Page>
  );
});
