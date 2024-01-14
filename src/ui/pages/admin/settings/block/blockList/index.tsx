import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { GridWithData } from '@ui/layout/grid/gridWithData';
import { DefaultRenderer } from '@ui/layout/grid/renderers/defaultRenderer';
import { CellClickedEvent } from 'ag-grid-community';
import { IBlockViewModel } from '@viewModel/modules/entities/block/interface';
import { IconButton } from '@components/iconButton';
import AddIcon from '@mui/icons-material/Add';
import { DialogBlock } from '@ui/dialogs/settings/dialogBlock';

interface IProps {
  filtersLeft?: JSX.Element[];
  onClick: (params: CellClickedEvent) => void;
  onNewCallback?: (id: string) => void;
}
export const BlockList = observer((props: IProps) => {
  const { filtersLeft, onClick, onNewCallback } = props;
  const {
    blockData,
    list,
    listFiltered,
    hasListFiltered,
    isModalOpen,
    modalNew,
    modalClose,
    modalSubmit,
  } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);

  const defaultColDef = useMemo(
    () => ({
      sortable: false,
      resizable: false,
      suppressMenu: true,
      cellRenderer: DefaultRenderer,
    }),
    []
  );
  const columnDefs = [
    {
      headerName: 'Blocks',
      valueGetter: (params: any) => {
        return `${params.node.rowIndex + 1}. ${params.data?.title}. ${params.data?.name}`;
      },
      cellClass: 'ag-first-cell ag-last-cell',
    },
  ];

  const filtersRight: JSX.Element[] = [
    <IconButton tooltip="New" onClick={modalNew}>
      <AddIcon />
    </IconButton>,
  ];

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [isModalOpen]);

  const handleSubmit = async () => {
    const block = await modalSubmit();
    if (block && onNewCallback) {
      onNewCallback(block.id);
    }
  };

  return (
    <React.Fragment>
      <GridWithData
        propsAG={{
          rowData: listFiltered,
          columnDefs,
          defaultColDef,
          rowHeight: 40,
        }}
        propsGrid={{
          onClick,
          sizeToFit: true,
          totalItems: list?.length,
          toolbar: { itemsLeft: filtersLeft, itemsRight: filtersRight },
          selectedIds: blockData ? [blockData.id] : undefined,
          className: 'ag-grid_no-header',
          hasRows: hasListFiltered,
          noDataMessage: 'No data found',
        }}
      />
      <DialogBlock
        isOpen={isModalOpen}
        onClose={modalClose}
        onCancel={modalClose}
        onSubmit={handleSubmit}
      />
    </React.Fragment>
  );
});
