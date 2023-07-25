import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { GridWithData } from '@ui/layout/grid/gridWithData';
import { DefaultRenderer } from '@ui/layout/grid/renderers/defaultRenderer';
import { CellClickedEvent } from 'ag-grid-community';
import { FilterText } from '@ui/filter/filterText';
import { useRouter } from 'next/router';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { IconButton } from '@components/iconButton';
import AddIcon from '@mui/icons-material/Add';
import { IUserViewModel } from '@viewModel/modules/entities/user/interface';
import { DialogUser } from '@ui/dialogs/settings/dialogUser';
import { UserRenderer } from '@ui/pages/admin/settings/user/userList/userRendrer';
import { userValueGetter } from '@ui/pages/admin/settings/user/userList/userValueGetter';

interface IProps {
  onNewCallback?: (id: string) => void;
}

export const UserList = observer((props: IProps) => {
  const { onNewCallback } = props;

  const {
    userData,
    list,
    hasList,
    isModalOpen,
    modalNew,
    modalClose,
    modalSubmit,
  } = useViewModel<IUserViewModel>(VIEW_MODEL.User);

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
      valueGetter: userValueGetter,
      cellRenderer: UserRenderer,
      cellClass: 'ag-first-cell ag-last-cell',
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
      pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_USER.path,
      query: { ...router.query, id: params.data.id },
    });
  };

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [isModalOpen]);

  const handleSubmit = async () => {
    const user = await modalSubmit();
    if (user && onNewCallback) {
      onNewCallback(user.id);
    }
  };

  return (
    <React.Fragment>
      <GridWithData
        propsAG={{
          rowData: list,
          columnDefs,
          defaultColDef,
          rowHeight: 40,
        }}
        propsGrid={{
          onClick,
          sizeToFit: true,
          totalItems: list?.length,
          toolbar: { itemsLeft, itemsRight },
          selectedIds: userData ? [userData.id] : undefined,
          className: 'ag-grid_no-header',
          hasRows: hasList,
          noDataMessage: 'No data found',
        }}
      />
      <DialogUser
        isOpen={isModalOpen}
        onClose={modalClose}
        onCancel={modalClose}
        onSubmit={handleSubmit}
      />
    </React.Fragment>
  );
});
