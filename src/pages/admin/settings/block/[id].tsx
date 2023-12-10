import { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { IBlockViewModel } from '@viewModel/modules/entities/block/interface';
import { BlockPage } from '@ui/pages/admin/settings/block/blockPage';
import { IModuleViewModel } from '@viewModel/modules/entities/module/interface';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { FilterSelect } from '@ui/filter/filterSelect';
import { FilterText } from '@ui/filter/filterText';
import { useRouter } from 'next/router';
import { CellClickedEvent } from 'ag-grid-community';
import { ParsedUrlQuery } from 'querystring';

const Block = () => {
  const {
    getList: getBlocks,
    getData: getBlock,
    clearList: clearBlocks,
    clearData: clearBlock,
    clearBlockData,
    data: block,
  } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);
  const {
    getList: getModules,
    clearList: clearModules,
    list: modules,
  } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);

  const router = useRouter();
  const id = router.query.id as string;
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCKS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCKS.path },
    },
    {
      label: block ? `${block?.title}. ${block.name}` : 'Not found',
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCK.path,
        query: { id: block?.id },
      },
      disabled: !Boolean(block),
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
    <FilterText
      name="search"
      placeholder="Search"
      style={{ flexBasis: '50%' }}
    />,
  ];
  const onClick = (params: CellClickedEvent) => {
    const query: ParsedUrlQuery = { ...router.query, id: params.data.id };
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCK.path,
      query,
    });
  };
  const onClose = async () => {
    await router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_BLOCKS.path,
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
    if (id) {
      getBlocks(router.query);
      getBlock(id);
      getModules();
    }
    return () => {
      clearBlocks();
      clearBlock();
      clearBlockData();
      clearModules();
    };
  }, [id]);

  return (
    <BlockPage
      breadCrumbs={breadCrumbs}
      filtersLeft={filtersLeft}
      onClick={onClick}
      onClose={onClose}
      onDelete={onDelete}
    />
  );
};

Block.Layout = MasterSchool;
export default observer(Block);
