import React, { useRef, useMemo, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { ILocaleViewModel } from '@viewModel/modules/common/locale/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { DefaultRenderer } from '@ui/layout/grid/renderers/defaultRenderer';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { CellClickedEvent, GridReadyEvent, RowNode } from 'ag-grid-community';
import { classNames } from '@utils/classNames';
import { IToolbarProps, Toolbar } from '@components/toolbar';
import { useRouter } from 'next/router';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../renderers/index.scss';
import { Loader } from '@components/loader';
import { NoData } from '@components/noData';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

interface IProps {
  propsAG: AgGridReactProps;
  propsGrid: {
    className?: string;
    onClick?: (params: CellClickedEvent) => void;
    sizeToFit?: boolean;
    border?: boolean;
    onGridReadyCallback?: (event: GridReadyEvent) => void;
    totalItems?: number;
    toolbar?: IToolbarProps;
    selectedIds?: string[];
    isLoading?: boolean;
    hasRows?: boolean;
    noDataMessage?: string;
    autoSizeColumns?: string[];
  };
}

export const GridWithData = observer((props: IProps) => {
  const { propsAG, propsGrid } = props;
  const {
    className,
    onClick,
    sizeToFit,
    border,
    onGridReadyCallback,
    totalItems,
    toolbar,
    selectedIds,
    isLoading,
    hasRows,
    noDataMessage = 'No data found',
    autoSizeColumns = [],
  } = propsGrid;
  const router = useRouter();
  const { isRtl } = useViewModel<ILocaleViewModel>(VIEW_MODEL.Locale);

  const gridRef = useRef<any>(null);
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      suppressMenu: true,
      cellRenderer: DefaultRenderer,
      width: 100,
      minWidth: 100,
    }),
    []
  );
  const sizeToFitFn = useCallback(() => {
    if (
      sizeToFit &&
      gridRef.current &&
      gridRef.current.columnApi &&
      gridRef.current.api
    ) {
      gridRef.current.columnApi.autoSizeColumns(autoSizeColumns);
      gridRef.current.api.sizeColumnsToFit();
    }
  }, [router]);
  const onGridReady = useCallback((event: GridReadyEvent) => {
    if (onGridReadyCallback) onGridReadyCallback(event);
    gridRef.current.api = event.api;
    gridRef.current.columnApi = event.columnApi;
    sizeToFitFn();
  }, []);
  const onFirstDataRendered = useCallback(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.forEachNode((node: RowNode) => {
        if (selectedIds) {
          node.setSelected(!!node.data && selectedIds.includes(node.data.id));
        } else {
          node.setSelected(false);
        }
      });
    }
  }, [selectedIds]);

  useEffect(() => {
    window.addEventListener('resize', sizeToFitFn);
    return () => window.removeEventListener('resize', sizeToFitFn);
  }, []);
  useEffect(() => {
    setTimeout(sizeToFitFn);
  }, [router]);
  useEffect(onFirstDataRendered, [selectedIds]);
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }, [propsAG.rowData]);

  const cls = classNames('ag-grid', 'ag-theme-material', className, {
    'ag-grid_no-border': !Boolean(border),
  });
  const clsFooter = classNames('ag-grid-footer');
  const clsToolbar = classNames('ag-grid-toolbar', toolbar?.className);
  const clsContent = classNames('ag-grid-content');

  return (
    <div className={cls}>
      {toolbar && <Toolbar {...toolbar} className={clsToolbar} />}
      <div className={clsContent}>
        {isLoading && <Loader loading={isLoading} relative />}
        {!isLoading && hasRows && (
          <AgGridReact
            overlayNoRowsTemplate="No data found"
            ref={gridRef} // Ref for accessing Grid's API
            defaultColDef={defaultColDef} // Default Column Properties
            animateRows={false} // Optional - set to 'true' to have rows animate when sorted
            onGridReady={onGridReady}
            rowHeight={40}
            headerHeight={40}
            enableRtl={isRtl}
            rowSelection="multiple" // Options - allows click selection of rows
            suppressCellFocus={true}
            onCellClicked={onClick}
            suppressRowClickSelection={true}
            onFirstDataRendered={onFirstDataRendered}
            {...propsAG}
          />
        )}
        {!isLoading && !hasRows && (
          <NoData icon={<DoNotDisturbIcon />} message={noDataMessage} />
        )}
      </div>
      {totalItems !== undefined && (
        <div className={clsFooter}>
          <div className="ag-grid-footer__label">Items:</div>
          <div className="ag-grid-footer__filtered">
            {propsAG.rowData?.length}
          </div>
          <div className="ag-grid-footer__total">{totalItems}</div>
        </div>
      )}
    </div>
  );
});
