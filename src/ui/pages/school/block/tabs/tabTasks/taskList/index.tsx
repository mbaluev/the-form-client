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
import { IBlockUserViewModel } from '@viewModel/modules/entities/block/user/interface';
import { ITaskUserViewModel } from '@viewModel/modules/entities/task/user/interface';
import { CellClickedEvent, RowClassParams } from 'ag-grid-community';
import { TaskRenderer } from '@ui/pages/school/block/tabs/tabTasks/taskList/taskRendrer';
import { AlertTasks } from '@ui/components/statuses/alertTasks';

export const TaskList = observer(() => {
  const { data: userBlock } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  const {
    isListLoading,
    listFiltered: tasks,
    hasListFiltered: hasTasks,
    filter,
    setFilter,
    isModalOpen,
    getData,
    data: taskData,
  } = useViewModel<ITaskUserViewModel>(VIEW_MODEL.TaskUser);

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
    },
  ];

  const getRowClass = (params: RowClassParams) => {
    if (!params.data.complete && params.data.sent === false)
      return 'ag-row-red';
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
