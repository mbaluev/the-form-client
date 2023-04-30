import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { GridWithData } from '@ui/layout/grid/gridWithData';
import { DefaultRenderer } from 'ui/layout/grid/renderers/defaultRenderer';
import { IconButton } from '@components/iconButton';
import { TextFieldControl } from '@components/fields';
import { Box, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { MaterialRenderer } from '@ui/pages/block/tabs/tabMaterials/materialList/materialRendrer';
import { Alert } from '@components/alert';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';
import { ITaskUserViewModel } from '@viewModel/modules/task/user/interface';

export const TaskList = observer(() => {
  const { data: block } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  const {
    isListLoading,
    listFiltered: materials,
    hasListFiltered: hasList,
    filter,
    setFilter,
    isModalOpen,
    deleteIds,
  } = useViewModel<ITaskUserViewModel>(VIEW_MODEL.TaskUser);

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
      suppressSizeToFit: true,
      valueGetter: (params: any) => {
        return {
          index: params.node.rowIndex + 1,
          name: params.data?.document.name,
          complete: params.data?.complete,
        };
      },
      cellRenderer: MaterialRenderer,
    },
    {
      valueGetter: (params: any) => {
        return `${params.data?.document.description}`;
      },
    },
  ];

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
  }, [filter, isModalOpen]);

  return (
    <React.Fragment>
      {block?.completeMaterials && (
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
          rowData: materials,
          columnDefs,
          defaultColDef,
          rowHeight: 40,
        }}
        propsGrid={{
          sizeToFit: true,
          totalItems: materials?.length,
          toolbar: { itemsLeft },
          className: 'ag-grid_no-header',
          isLoading: isListLoading,
          hasRows: hasList,
          selectedIds: deleteIds,
          noDataMessage: 'No materials found',
          autoSizeColumns: ['actions'],
        }}
      />
    </React.Fragment>
  );
});
