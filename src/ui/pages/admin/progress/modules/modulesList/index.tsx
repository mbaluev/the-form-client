import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { GridWithData } from '@ui/layout/grid/gridWithData';
import { DefaultRenderer } from '@ui/layout/grid/renderers/defaultRenderer';
import { CellClickedEvent, ICellRendererParams, RowClassParams } from 'ag-grid-community';
import { useRouter } from 'next/router';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { TextFieldControl } from '@components/fields';
import { InputAdornment, Stack } from '@mui/material';
import { IconButton } from '@components/iconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getProgress, ModuleProgress } from '@ui/pages/school/module/index/moduleProgress';
import { IModuleAdminViewModel } from '@viewModel/modules/entities/module/admin/interface';
import { IconRenderer } from '@ui/pages/admin/progress/modules/modulesList/iconRendrer';
import { IBlockUserDTO } from '@model/entities/block';
import { statusModule } from '@ui/components/status/statusModule';

export const ModulesList = observer(() => {
  const { list, listFiltered, hasList, filter, setFilter } = useViewModel<IModuleAdminViewModel>(
    VIEW_MODEL.ModuleAdmin
  );

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
      colId: 'actions',
      headerName: 'Statuses',
      cellRenderer: IconRenderer,
      suppressSizeToFit: true,
      cellClass: 'ag-first-cell',
    },
    {
      colId: 'title',
      headerName: 'Title',
      field: 'module.title',
    },
    {
      colId: 'name',
      headerName: 'Name',
      field: 'module.name',
    },
    {
      headerName: 'Progress',
      suppressSizeToFit: true,
      valueGetter: (params: any) => {
        const userModule = params.data;
        const values = userModule?.userBlocks?.reduce(
          (prev: boolean[], curr: IBlockUserDTO) =>
            prev.concat([
              Boolean(curr.completeMaterials),
              Boolean(curr.completeQuestions),
              Boolean(curr.completeTasks),
            ]),
          []
        );
        return getProgress(values);
      },
      cellRenderer: (props: ICellRendererParams) => {
        return (
          <Stack direction="row" justifyContent="flex-end">
            <ModuleProgress value={props.value} width="150px" />
          </Stack>
        );
      },
    },
  ];

  const getRowClass = (params: RowClassParams) => {
    const title = statusModule(params.data);
    if (title === 'Complete') return 'ag-row-green';
    if (title === 'Disabled') return 'ag-row-disable';
  };

  const router = useRouter();
  const onClick = (params: CellClickedEvent) => {
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_BLOCKS.path,
      query: { userModuleId: params.data.id },
    });
  };
  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  const searchClearHandler = () => {
    setFilter(undefined);
  };

  const itemsLeft: JSX.Element[] = [
    <TextFieldControl
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
      <GridWithData
        propsAG={{
          rowData: listFiltered,
          columnDefs,
          defaultColDef,
          getRowClass,
          rowHeight: 40,
        }}
        propsGrid={{
          onClick,
          sizeToFit: true,
          totalItems: list?.length,
          toolbar: { itemsLeft },
          hasRows: hasList,
          noDataMessage: 'No data found',
          autoSizeColumns: ['actions', 'user'],
          className: 'ag-grid_no-header',
        }}
      />
    </React.Fragment>
  );
});
