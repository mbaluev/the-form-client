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
import { ButtonRenderer } from 'ui/layout/grid/renderers/buttonRenderer';
import { MaterialRenderer } from '@ui/pages/block/tabs/tabMaterials/materialList/materialRendrer';
import { IMaterialUserViewModel } from '@viewModel/modules/material/user/interface';
import { Alert } from '@components/alert';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';

export const MaterialList = observer(() => {
  const { data: block } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  const {
    isListLoading,
    listFiltered: materials,
    hasListFiltered: hasList,
    filter,
    setFilter,
    download,
  } = useViewModel<IMaterialUserViewModel>(VIEW_MODEL.MaterialUser);

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
      headerName: 'Description',
      valueGetter: (params: any) => {
        return `${params.data?.document.description}`;
      },
    },
    {
      colId: 'actions',
      headerName: 'Download',
      suppressSizeToFit: true,
      valueGetter: (params: any) => {
        const onClick = async () => {
          await download(
            params.data.document.file.id,
            params.data.document.file.name,
            params.data.id,
            params.data.blockId
          );
        };
        return {
          size: 'small',
          onClick: onClick,
          variant: 'text',
          children: params.data.document.file.name,
        };
      },
      cellRenderer: ButtonRenderer,
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
  }, [filter]);

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
          noDataMessage: 'No materials found',
          autoSizeColumns: ['actions'],
        }}
      />
    </React.Fragment>
  );
});
