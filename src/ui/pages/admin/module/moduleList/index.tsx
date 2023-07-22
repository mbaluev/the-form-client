import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { GridWithData } from '@ui/layout/grid/gridWithData';
import { IModuleViewModel } from '@viewModel/modules/entities/module/interface';
import { DefaultRenderer } from 'ui/layout/grid/renderers/defaultRenderer';
import { CellClickedEvent } from 'ag-grid-community';
import { FilterText } from '@ui/filter/filterText';
import { useRouter } from 'next/router';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { IconButton } from '@components/iconButton';
import AddIcon from '@mui/icons-material/Add';
import { DialogModule } from 'ui/dialogs/settings/dialogModule';

interface IProps {
  onNewCallback?: (id: string) => void;
}

export const ModuleList = observer((props: IProps) => {
  const { onNewCallback } = props;

  const {
    moduleData,
    list,
    listFiltered,
    hasListFiltered,
    isModalOpen,
    modalNew,
    modalClose,
    modalSubmit,
  } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);

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
      headerName: 'Modules',
      valueGetter: (params: any) => {
        return `${params.node.rowIndex + 1}. ${params.data?.title}. ${
          params.data?.name
        }`;
      },
    },
  ];

  const itemsLeft: JSX.Element[] = [
    <FilterText
      name="search"
      placeholder="Search"
      style={{ flex: '1 1 auto' }}
    />,
  ];
  const itemsRight: JSX.Element[] = [
    <IconButton tooltip="New" onClick={modalNew}>
      <AddIcon />
    </IconButton>,
  ];

  const router = useRouter();
  const onClick = (params: CellClickedEvent) => {
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_MODULE.path,
      query: { ...router.query, moduleId: params.data.id },
    });
  };

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [isModalOpen]);

  const handleSubmit = async () => {
    const module = await modalSubmit();
    if (module && onNewCallback) {
      onNewCallback(module.id);
    }
  };

  return (
    <React.Fragment>
      <GridWithData
        propsAG={{
          rowData: listFiltered,
          columnDefs,
          defaultColDef,
          rowHeight: 40,
        }}
        propsGrid={{
          onClick,
          sizeToFit: true,
          totalItems: list?.length,
          toolbar: { itemsLeft, itemsRight },
          selectedIds: moduleData ? [moduleData.id] : undefined,
          className: 'ag-grid_no-header',
          hasRows: hasListFiltered,
          noDataMessage: 'No data found',
        }}
      />
      <DialogModule
        isOpen={isModalOpen}
        onClose={modalClose}
        onCancel={modalClose}
        onSubmit={handleSubmit}
      />
    </React.Fragment>
  );
});
