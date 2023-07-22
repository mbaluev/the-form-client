import React, { useEffect, useMemo } from 'react';
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
import { IQuestionViewModel } from '@viewModel/modules/entities/question/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { DialogConfirm } from 'ui/dialogs/common/dialogConfirm';
import { DialogQuestion } from 'ui/dialogs/settings/dialogQuestion';

export const QuestionList = observer(() => {
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
  } = useViewModel<IQuestionViewModel>(VIEW_MODEL.Question);

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
      headerName: 'Tests',
      checkboxSelection: true,
      valueGetter: (params: any) => {
        return `${params.node.rowIndex + 1}. ${params.data?.title}`;
      },
      cellClass: 'ag-first-cell ag-last-cell',
    },
  ];

  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  const searchClearHandler = () => {
    setFilter(undefined);
  };

  const onClick = (params: CellClickedEvent) => modalOpen(params.data.id);
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
    <IconButton tooltip="Add new question" onClick={modalNew}>
      <AddIcon />
    </IconButton>,
    <IconButton
      tooltip="Delete questions"
      onClick={handleDelete}
      disabled={!hasDelete}
    >
      <DeleteIcon />
    </IconButton>,
  ];

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [filter, deleteIds, isDeleteOpen, isDeleteLoading, isModalOpen]);

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
        }}
      />
      <DialogConfirm
        isOpen={isDeleteOpen}
        isLoading={isDeleteLoading}
        onClose={deleteClose}
        onCancel={deleteClose}
        onSubmit={deleteSubmit}
        title="Delete questions"
        message="Are you sure you want to delete selected questions?"
      />
      <DialogQuestion
        isOpen={isModalOpen}
        onClose={modalClose}
        onCancel={modalClose}
        onSubmit={handleSubmit}
      />
    </React.Fragment>
  );
});
