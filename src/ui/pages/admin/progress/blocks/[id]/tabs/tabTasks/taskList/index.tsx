import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { GridWithData } from '@ui/layout/grid/gridWithData';
import { DefaultRenderer } from '@ui/layout/grid/renderers/defaultRenderer';
import { IconButton } from '@components/iconButton';
import { TextFieldControl } from '@components/fields';
import { InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { CellClickedEvent, RowClassParams } from 'ag-grid-community';
import { TaskRenderer } from '@ui/pages/admin/progress/blocks/[id]/tabs/tabTasks/taskList/taskRendrer';
import { AlertTasks } from '@ui/components/alert/alertTasks';
import { IBlockAdminViewModel } from '@viewModel/modules/entities/block/admin/interface';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';
import RefreshIcon from '@mui/icons-material/Refresh';

export const TaskList = observer(() => {
  const { data: userBlock } = useViewModel<IBlockAdminViewModel>(VIEW_MODEL.BlockAdmin);
  const {
    isListLoading,
    listFiltered: tasks,
    hasListFiltered: hasTasks,
    filter,
    setFilter,
    isModalOpen,
    getData,
    data: taskData,
    getList,
  } = useViewModel<ITaskAdminViewModel>(VIEW_MODEL.TaskAdmin);

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
      cellRenderer: TaskRenderer,
      cellClass: 'ag-first-cell ag-last-cell',
    },
  ];

  const getRowClass = (params: RowClassParams) => {
    if (!params.data.complete && params.data.sent === true) return 'ag-row-red';
  };

  const onClick = async (params: CellClickedEvent) => {
    if (!preventClick) await getData(params.data.id);
    setPreventClick(false);
  };
  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  const searchClearHandler = () => {
    setFilter(undefined);
  };

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
    <IconButton onClick={() => getList()}>
      <RefreshIcon />
    </IconButton>,
  ];

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [filter, isModalOpen, preventClick, taskData]);

  return (
    <React.Fragment>
      <AlertTasks userBlock={userBlock} />
      <GridWithData
        propsAG={{
          rowData: tasks,
          rowHeight: 40,
          columnDefs,
          defaultColDef,
          getRowClass,
        }}
        propsGrid={{
          onClick,
          sizeToFit: true,
          totalItems: tasks?.length,
          toolbar: { itemsLeft },
          className: 'ag-grid_no-header',
          isLoading: isListLoading,
          hasRows: hasTasks,
          noDataMessage: 'No data found',
          autoSizeColumns: ['actions'],
          selectedIds: taskData ? [taskData.id] : undefined,
        }}
      />
    </React.Fragment>
  );
});
