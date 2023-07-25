import React from 'react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { Page } from '@ui/layout/page';
import { observer } from 'mobx-react';
import { BlockCard } from '@ui/pages/admin/settings/block/blockCard';
import { BlockList } from '@ui/pages/admin/settings/block/blockList';
import { CellClickedEvent } from 'ag-grid-community';

interface IProps {
  breadCrumbs: TBreadCrumb[];
  filtersLeft?: JSX.Element[];
  onClick: (params: CellClickedEvent) => void;
  onClose?: () => void;
  onNewCallback?: (id: string) => void;
  onDelete?: () => Promise<void>;
}

export const BlockPage = observer((props: IProps) => {
  const { breadCrumbs, onClose, onDelete, ...other } = props;
  return (
    <Page
      title="Blocks"
      breadCrumbs={breadCrumbs}
      padding={false}
      pageRight={<BlockCard onClose={onClose} onDelete={onDelete} />}
    >
      <BlockList {...other} />
    </Page>
  );
});
