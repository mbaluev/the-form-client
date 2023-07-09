import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { GridWithData } from '@ui/layout/grid/gridWithData';
import { DefaultRenderer } from 'ui/layout/grid/renderers/defaultRenderer';
import { IconButton } from '@components/iconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { CellClickedEvent, RowSelectedEvent } from 'ag-grid-community';
import { TextFieldControl } from '@components/fields';
import { InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { DialogConfirm } from '@ui/dialogs/dialogConfirm';
import { IMaterialViewModel } from '@viewModel/modules/entities/material/interface';
import { DialogMaterial } from '@ui/dialogs/dialogMaterial';
import { ButtonRenderer } from 'ui/layout/grid/renderers/buttonRenderer';
import { documentButtonValueGetter } from '@ui/components/documentButtonValueGetter';

export const MaterialList = observer(() => {
  const {
    isListLoading,
    list,
    listFiltered,
    hasListFiltered,
    filter,
    setFilter,
    addDeleteId,
    removeDeleteId,
    isModalOpen,
    modalNew,
    modalOpen,
    modalClose,
    modalSubmit,
    isDeleteOpen,
    isDeleteLoading,
    deleteIds,
    deleteOpen,
    deleteClose,
    deleteSubmit,
    hasDelete,
    download,
  } = useViewModel<IMaterialViewModel>(VIEW_MODEL.Material);

  const [preventClick, setPreventClick] = useState(false);

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
      headerName: 'Materials',
      checkboxSelection: true,
      valueGetter: (params: any) => {
        return `${params.node.rowIndex + 1}. ${params.data?.document.name}`;
      },
    },
    {
      colId: 'actions',
      headerName: 'Download',
      suppressSizeToFit: true,
      valueGetter: (params: any) =>
        documentButtonValueGetter(params, setPreventClick, download),
      cellRenderer: ButtonRenderer,
      maxWidth: 300,
    },
  ];

  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  const searchClearHandler = () => {
    setFilter(undefined);
  };

  const onClick = async (params: CellClickedEvent) => {
    if (!preventClick) await modalOpen(params.data.id);
    setPreventClick(false);
  };
  const onRowSelected = (event: RowSelectedEvent) => {
    const selected = event.node.isSelected();
    if (selected) {
      addDeleteId(event.data.id);
    } else {
      removeDeleteId(event.data.id);
    }
  };
  const handleDelete = async () => deleteOpen();
  const handleSubmit = async () => modalSubmit();

  const itemsLeft: JSX.Element[] = [
    <TextFieldControl
      name="testSearch"
      placeholder="Search"
      value={filter}
      onChange={searchChangeHandler}
      style={{ flex: '1 1 auto' }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={searchClearHandler}>
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />,
  ];
  const itemsRight: JSX.Element[] = [
    <IconButton tooltip="Add new material" onClick={modalNew}>
      <AddIcon />
    </IconButton>,
    <IconButton
      tooltip="Delete materials"
      onClick={handleDelete}
      disabled={!hasDelete}
    >
      <DeleteIcon />
    </IconButton>,
  ];

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [
    filter,
    deleteIds,
    isDeleteOpen,
    isDeleteLoading,
    isModalOpen,
    preventClick,
  ]);

  return (
    <React.Fragment>
      <GridWithData
        propsAG={{
          rowData: listFiltered,
          columnDefs,
          defaultColDef,
          rowHeight: 40,
          onRowSelected,
        }}
        propsGrid={{
          onClick,
          sizeToFit: true,
          totalItems: list?.length,
          toolbar: { itemsLeft, itemsRight },
          className: 'ag-grid_no-header',
          isLoading: isListLoading,
          hasRows: hasListFiltered,
          selectedIds: deleteIds,
          noDataMessage: 'No data found',
          autoSizeColumns: ['actions'],
        }}
      />
      <DialogConfirm
        isOpen={isDeleteOpen}
        isLoading={isDeleteLoading}
        onClose={deleteClose}
        onCancel={deleteClose}
        onSubmit={deleteSubmit}
        title="Delete materials"
        message="Are you sure you want to delete selected materials?"
      />
      <DialogMaterial
        isOpen={isModalOpen}
        onClose={modalClose}
        onCancel={modalClose}
        onSubmit={handleSubmit}
      />
    </React.Fragment>
  );
});
