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
import { ButtonRenderer } from '@ui/layout/grid/renderers/buttonRenderer';
import { MaterialRenderer } from '@ui/pages/school/block/[id]/tabs/tabMaterials/materialList/materialRendrer';
import { IMaterialUserViewModel } from '@viewModel/modules/entities/material/user/interface';
import { IBlockUserViewModel } from '@viewModel/modules/entities/block/user/interface';
import { CellClickedEvent } from 'ag-grid-community';
import { documentButtonValueGetter } from '@ui/components/documentButton/valueGetter';
import { AlertMaterials } from '@ui/components/alert/alertMaterials';

export const MaterialList = observer(() => {
  const { data: userBlock } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  const {
    isListLoading,
    listFiltered: materials,
    hasListFiltered: hasList,
    filter,
    setFilter,
    download,
    getData,
    update,
    data: materialData,
  } = useViewModel<IMaterialUserViewModel>(VIEW_MODEL.MaterialUser);

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
      cellRenderer: MaterialRenderer,
      cellClass: 'ag-first-cell',
    },
    {
      colId: 'actions',
      headerName: 'Download',
      suppressSizeToFit: true,
      valueGetter: (params: any) => {
        const callback = async () => {
          await update(params.data.id, params.data.complete);
        };
        return documentButtonValueGetter(
          params.data.material?.document,
          setPreventClick,
          download,
          callback
        );
      },
      cellRenderer: ButtonRenderer,
      cellClass: 'ag-last-cell',
    },
  ];

  const onClick = async (params: CellClickedEvent) => {
    if (!preventClick) {
      await update(params.data.id, params.data.complete);
      await getData(params.data.id);
    }
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
  }, [filter, preventClick, materialData]);

  return (
    <React.Fragment>
      <AlertMaterials userBlock={userBlock} />
      <GridWithData
        propsAG={{
          rowData: materials,
          columnDefs,
          defaultColDef,
          rowHeight: 40,
        }}
        propsGrid={{
          onClick,
          sizeToFit: true,
          totalItems: materials?.length,
          toolbar: { itemsLeft },
          className: 'ag-grid_no-header',
          isLoading: isListLoading,
          hasRows: hasList,
          noDataMessage: 'No data found',
          autoSizeColumns: ['actions'],
          selectedIds: materialData ? [materialData.id] : undefined,
        }}
      />
    </React.Fragment>
  );
});
