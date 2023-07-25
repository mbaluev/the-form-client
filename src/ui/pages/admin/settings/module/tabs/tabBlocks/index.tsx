import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { BlockList } from '@ui/pages/admin/settings/block/blockList';
import { useRouter } from 'next/router';
import { CellClickedEvent } from 'ag-grid-community';
import { ParsedUrlQuery } from 'querystring';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { useViewModel } from '@hooks/useViewModel';
import { IModuleViewModel } from '@viewModel/modules/entities/module/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { TextFieldControl } from '@components/fields';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@components/iconButton';
import CloseIcon from '@mui/icons-material/Close';
import { IBlockViewModel } from '@viewModel/modules/entities/block/interface';

export const TabBlocks = observer(() => {
  const { data } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);
  const { filter, setFilter } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);
  const router = useRouter();

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

  const onClick = (params: CellClickedEvent) => {
    const query: ParsedUrlQuery = {
      moduleId: data?.id,
      blockId: params.data.id,
    };
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULE_BLOCK.path,
      query,
    });
  };
  const onNewCallback = (id: string) => {
    const query: ParsedUrlQuery = { moduleId: data?.id, blockId: id };
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULE_BLOCK.path,
      query,
    });
  };

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [filter]);

  return (
    <BlockList
      onClick={onClick}
      // onNewCallback={onNewCallback}
      filtersLeft={itemsLeft}
    />
  );
});
