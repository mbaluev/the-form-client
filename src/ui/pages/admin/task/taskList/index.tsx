import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { GridWithData } from '@ui/layout/grid/gridWithData';
import { DefaultRenderer } from '@ui/layout/grid/renderers/defaultRenderer';
import { CellClickedEvent, RowClassParams } from 'ag-grid-community';
import { FilterText } from '@ui/filter/filterText';
import { useRouter } from 'next/router';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';
import { taskValueGetter } from '@ui/pages/admin/task/taskList/taskValueGetter';
import { TaskRenderer } from '@ui/pages/admin/task/taskList/taskRendrer';

export const TaskList = observer(() => {
  const { data, list, hasList, isModalOpen } =
    useViewModel<ITaskAdminViewModel>(VIEW_MODEL.TaskAdmin);

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
      valueGetter: taskValueGetter,
      cellRenderer: TaskRenderer,
      cellClass: 'ag-first-cell ag-last-cell',
    },
  ];

  const getRowClass = (params: RowClassParams) => {
    if (!params.data.complete && params.data.sent === true) return 'ag-row-red';
  };

  const itemsLeft: JSX.Element[] = [
    <FilterText
      name="search"
      placeholder="Search"
      style={{ flex: '1 1 auto' }}
    />,
  ];

  const router = useRouter();
  const onClick = (params: CellClickedEvent) => {
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_TASK.path,
      query: { ...router.query, id: params.data.id },
    });
  };

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [isModalOpen]);

  return (
    <React.Fragment>
      <GridWithData
        propsAG={{
          rowData: list,
          columnDefs,
          defaultColDef,
          rowHeight: 40,
          getRowClass,
        }}
        propsGrid={{
          onClick,
          sizeToFit: true,
          totalItems: list?.length,
          toolbar: { itemsLeft },
          selectedIds: data ? [data.id] : undefined,
          className: 'ag-grid_no-header',
          hasRows: hasList,
          noDataMessage: 'No data found',
        }}
      />
    </React.Fragment>
  );
});
