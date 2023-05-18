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
import { RowClassParams } from 'ag-grid-community';
import { ButtonRenderer } from '@ui/layout/grid/renderers/buttonRenderer';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useAuth } from '@hooks/useAuth';
import { ITaskHistoryViewModel } from '@viewModel/modules/task/history/interface';
import { useLocale } from '@hooks/useLocale';

export const TabHistoryList = observer(() => {
  const { id } = useAuth();
  const { fDateTime } = useLocale();
  const {
    isListLoading,
    listFiltered: tasks,
    hasListFiltered: hasTasks,
    filter,
    setFilter,
    download,
  } = useViewModel<ITaskHistoryViewModel>(VIEW_MODEL.TaskHistory);

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
      headerName: 'User',
      valueGetter: (params: any) => {
        const latestUser = params.data.user;
        return `${latestUser?.firstname} ${latestUser?.lastname}`;
      },
    },
    {
      headerName: 'Date',
      valueGetter: (params: any) => {
        const latestDate = params.data.date;
        const date = latestDate ? new Date(latestDate) : undefined;
        return fDateTime(date);
      },
    },
    {
      headerName: 'Download',
      colId: 'actions',
      suppressSizeToFit: true,
      valueGetter: (params: any) => {
        const latestUser = params.data.user;
        const latestDocument = params.data.documentLatest.document;
        let latestColor = 'blue';
        if (latestUser.id !== id) latestColor = 'green';
        const handleDownload = async () => {
          setPreventClick(true);
          await download(latestDocument.file.id, latestDocument.file.name);
        };
        return {
          size: 'small',
          onClick: handleDownload,
          variant: 'text',
          endIcon: <FileDownloadIcon />,
          children: latestDocument.file.name,
          color: latestColor,
        };
      },
      cellRenderer: ButtonRenderer,
    },
  ];
  const getRowClass = (params: RowClassParams) => {
    if (params.data.user.id !== id) {
      return 'ag-row-green';
    }
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
  }, [filter, preventClick]);

  return (
    <GridWithData
      propsAG={{
        rowData: tasks,
        rowHeight: 40,
        columnDefs,
        defaultColDef,
        getRowClass,
      }}
      propsGrid={{
        sizeToFit: true,
        totalItems: tasks?.length,
        toolbar: { itemsLeft },
        className: 'ag-grid_no-header',
        isLoading: isListLoading,
        hasRows: hasTasks,
        noDataMessage: 'No history found',
        autoSizeColumns: ['actions'],
      }}
    />
  );
});
