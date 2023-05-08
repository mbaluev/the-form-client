import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { GridWithData } from '@ui/layout/grid/gridWithData';
import { DefaultRenderer } from '@ui/layout/grid/renderers/defaultRenderer';
import { IconButton } from '@components/iconButton';
import { TextFieldControl } from '@components/fields';
import { Box, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { Alert } from '@components/alert';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';
import { ITaskUserViewModel } from '@viewModel/modules/task/user/interface';
import { TaskRenderer } from '@ui/pages/school/block/tabs/tabTasks/taskList/taskRendrer';
import { CellClickedEvent, RowClassParams } from 'ag-grid-community';
import { ButtonRenderer } from '@ui/layout/grid/renderers/buttonRenderer';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export const TaskList = observer(() => {
  const { data: block } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  const {
    isListLoading,
    listFiltered: tasks,
    hasListFiltered: hasTasks,
    filter,
    setFilter,
    isModalOpen,
    download,
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
      headerName: 'Tasks',
      valueGetter: (params: any) => {
        return {
          index: params.node.rowIndex + 1,
          name: params.data?.document?.name,
          complete: params.data?.complete,
          status: params.data?.status,
        };
      },
      cellRenderer: TaskRenderer,
    },
    // {
    //   headerName: 'Description',
    //   valueGetter: (params: any) => {
    //     return `${params.data?.document.description}`;
    //   },
    // },
    {
      headerName: 'Download',
      colId: 'actions',
      suppressSizeToFit: true,
      valueGetter: (params: any) => {
        const onClick = async () => {
          setPreventClick(true);
          await download(
            params.data.document.file.id,
            params.data.document.file.name
          );
        };
        let color = 'blue';
        if (params.data.status === 'income') color = 'green';
        return {
          size: 'small',
          onClick: onClick,
          variant: 'text',
          endIcon: <FileDownloadIcon />,
          children: params.data.document.file.name,
          color,
        };
      },
      cellRenderer: ButtonRenderer,
    },
  ];
  const getRowClass = (params: RowClassParams) => {
    if (params.node.data.status === 'income') {
      return 'ag-row-green';
    }
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
      {block?.completeTasks && (
        <Box style={{ padding: '0 20px 20px' }}>
          <Alert
            type="success"
            title="All materials have been dowloaded"
            variant="outlined"
            shadow={false}
            border={false}
          />
        </Box>
      )}
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
          noDataMessage: 'No materials found',
          autoSizeColumns: ['actions'],
          selectedIds: taskData ? [taskData.id] : undefined,
        }}
      />
    </React.Fragment>
  );
});
