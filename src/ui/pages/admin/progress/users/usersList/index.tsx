import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { GridWithData } from '@ui/layout/grid/gridWithData';
import { DefaultRenderer } from '@ui/layout/grid/renderers/defaultRenderer';
import {
  CellClickedEvent,
  ICellRendererParams,
  RowClassParams,
} from 'ag-grid-community';
import { useRouter } from 'next/router';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { TextFieldControl } from '@components/fields';
import { InputAdornment, Stack } from '@mui/material';
import { IconButton } from '@components/iconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  getProgress,
  ModuleProgress,
} from '@ui/pages/school/module/index/moduleProgress';
import { IUserAdminViewModel } from '@viewModel/modules/entities/user/admin/interface';
import { IconRenderer } from '@ui/pages/admin/progress/users/usersList/iconRendrer';
import { IModuleUserDTO } from '@model/entities/module';
import { statusModules } from '@ui/components/status/statusModules';

export const UsersList = observer(() => {
  const { list, listFiltered, hasList, filter, setFilter } =
    useViewModel<IUserAdminViewModel>(VIEW_MODEL.UserAdmin);

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
      colId: 'username',
      headerName: 'UserName',
      field: 'username',
    },
    {
      colId: 'firstname',
      headerName: 'FirstName',
      field: 'firstname',
    },
    {
      colId: 'lastname',
      headerName: 'LastName',
      field: 'lastname',
    },
    {
      headerName: 'Progress',
      suppressSizeToFit: true,
      valueGetter: (params: any) => {
        const user = params.data;
        const values = user?.userModules?.reduce(
          (prevUserModules: boolean[], currUserModule: IModuleUserDTO) => {
            const currUserModuleData = currUserModule?.userBlocks?.reduce(
              (prev: boolean[], curr) =>
                prev.concat([
                  Boolean(curr.completeMaterials),
                  Boolean(curr.completeQuestions),
                  Boolean(curr.completeTasks),
                ]),
              []
            );
            return currUserModuleData
              ? prevUserModules.concat(currUserModuleData)
              : prevUserModules;
          },
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
    const title = statusModules(params.data.userModules);
    if (title === 'Complete') return 'ag-row-green';
    if (title === 'Disabled') return 'ag-row-disable';
  };

  const router = useRouter();
  const onClick = (params: CellClickedEvent) => {
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_MODULES.path,
      query: { userId: params.data.id },
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
