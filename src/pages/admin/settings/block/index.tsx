import { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { IBlockViewModel } from '@viewModel/modules/entities/block/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { BlockPage } from '@ui/pages/admin/settings/block/blockPage';
import { IModuleViewModel } from '@viewModel/modules/entities/module/interface';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { FilterSelect } from '@ui/filter/filterSelect';
import { FilterText } from '@ui/filter/filterText';
import { useRouter } from 'next/router';
import { CellClickedEvent } from 'ag-grid-community';
import { ParsedUrlQuery } from 'querystring';
import { observer } from 'mobx-react';

const Block = () => {
  const {
    getList: getBlocks,
    clearList: clearBlocks,
    clearData: clearBlock,
    clearBlockData,
  } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);
  const {
    getList: getModules,
    clearList: clearModules,
    list: modules,
  } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCKS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCKS.path },
    },
  ];
  const filtersLeft: JSX.Element[] = [
    <FilterSelect
      name="moduleId"
      placeholder="Module"
      style={{ flexBasis: '50%' }}
      items={modules?.map((item) => {
        return {
          value: item.id,
          label: item.title,
        };
      })}
    />,
    <FilterText name="search" placeholder="Search" style={{ flexBasis: '50%' }} />,
  ];
  const router = useRouter();
  const onClick = (params: CellClickedEvent) => {
    const query: ParsedUrlQuery = { ...router.query, id: params.data.id };
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCK.path,
      query,
    });
  };
  const onDelete = async () => {
    await clearBlock();
    await clearBlockData();
    await router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCKS.path,
    });
  };

  useEffect(() => {
    getBlocks(router.query);
    getModules();
    return () => {
      clearBlocks();
      clearModules();
    };
  }, [router.query]);

  return (
    <BlockPage
      breadCrumbs={breadCrumbs}
      filtersLeft={filtersLeft}
      onClick={onClick}
      onDelete={onDelete}
    />
  );
};

Block.Layout = MasterSchool;
export default observer(Block);
