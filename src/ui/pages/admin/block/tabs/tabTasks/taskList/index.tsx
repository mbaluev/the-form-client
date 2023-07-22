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
import { DialogConfirm } from 'ui/dialogs/common/dialogConfirm';
import { ITaskViewModel } from '@viewModel/modules/entities/task/interface';
import { DialogTask } from 'ui/dialogs/settings/dialogTask';
import { taskValueGetter } from '@ui/pages/admin/block/tabs/tabTasks/taskList/taskValueGetter';
import { TaskRenderer } from '@ui/pages/admin/block/tabs/tabTasks/taskList/taskRendrer';

export const TaskList = observer(() => {
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
  } = useViewModel<ITaskViewModel>(VIEW_MODEL.Task);

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
      checkboxSelection: true,
      valueGetter: taskValueGetter,
      cellRenderer: TaskRenderer,
      cellClass: 'ag-first-cell ag-last-cell',
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
    <IconButton tooltip="Add new task" onClick={modalNew}>
      <AddIcon />
    </IconButton>,
    <IconButton
      tooltip="Delete tasks"
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
        title="Delete tasks"
        message="Are you sure you want to delete selected tasks?"
      />
      <DialogTask
        isOpen={isModalOpen}
        onClose={modalClose}
        onCancel={modalClose}
        onSubmit={handleSubmit}
      />
    </React.Fragment>
  );
});
