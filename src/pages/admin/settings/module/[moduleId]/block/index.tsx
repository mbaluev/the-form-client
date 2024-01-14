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
import { FilterText } from '@ui/filter/filterText';
import { useRouter } from 'next/router';
import { CellClickedEvent } from 'ag-grid-community';
import { ParsedUrlQuery } from 'querystring';

const Blocks = () => {
  const {
    getList: getModules,
    getData: getModule,
    clearList: clearModules,
    clearData: clearModule,
    clearModuleData,
    data: module,
  } = useViewModel<IModuleViewModel>(VIEW_MODEL.Module);
  const {
    getList: getBlocks,
    clearList: clearBlocks,
    clearData: clearBlock,
    clearBlockData,
  } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULES.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULES.path },
    },
    {
      label: module ? `${module?.title}. ${module.name}` : 'Not found',
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULE.path,
        query: { moduleId: module?.id },
      },
      disabled: !Boolean(module),
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULE_BLOCKS.label,
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULE_BLOCKS.path,
        query: { moduleId: module?.id },
      },
      disabled: !Boolean(module),
    },
  ];
  const filtersLeft: JSX.Element[] = [
    <FilterText name="search" placeholder="Search" style={{ flexBasis: '100%' }} />,
  ];
  const router = useRouter();
  const moduleId = router.query.moduleId as string;
  const onClick = (params: CellClickedEvent) => {
    const query: ParsedUrlQuery = { ...router.query, blockId: params.data.id };
    router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULE_BLOCK.path,
      query,
    });
  };
  const onDelete = async () => {
    await clearBlock();
    await clearBlockData();
    await router.push({
      pathname: ROUTER_CONST_SCHOOL.ADMIN_SETTINGS_MODULE.path,
      query: { moduleId: module?.id },
    });
  };

  useEffect(() => {
    if (moduleId) {
      getModules();
      getModule(moduleId);
      getBlocks({ moduleId });
    }
    return () => {
      clearModules();
      clearModule();
      clearModuleData();
      clearBlocks();
    };
  }, [moduleId]);

  return (
    <BlockPage
      breadCrumbs={breadCrumbs}
      filtersLeft={filtersLeft}
      onClick={onClick}
      onDelete={onDelete}
    />
  );
};

Blocks.Layout = MasterSchool;
export default observer(Blocks);
