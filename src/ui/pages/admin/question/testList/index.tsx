import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { GridWithData } from '@ui/layout/grid/gridWithData';
import { DefaultRenderer } from 'ui/layout/grid/renderers/defaultRenderer';
import { CellClickedEvent, RowClassParams } from 'ag-grid-community';
import { FilterText } from '@ui/filter/filterText';
import { useRouter } from 'next/router';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';
import { testValueGetter } from '@ui/pages/admin/question/testList/testValueGetter';
import { TestRenderer } from '@ui/pages/admin/question/testList/testRendrer';

export const TestList = observer(() => {
  const { data, list, hasList, isModalOpen } =
    useViewModel<IQuestionAdminViewModel>(VIEW_MODEL.QuestionAdmin);

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
      valueGetter: testValueGetter,
      cellRenderer: TestRenderer,
    },
  ];

  const getRowClass = (params: RowClassParams) => {
    if (params.data.complete && params.data.comment === null)
      return 'ag-row-red';
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
      pathname: ROUTER_CONST_SCHOOL.ADMIN_QUESTION.path,
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
