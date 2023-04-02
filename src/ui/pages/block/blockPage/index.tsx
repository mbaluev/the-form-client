import React from 'react';
import { observer } from 'mobx-react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { Page } from '@ui/layout/page';
import { classNames } from '@utils/classNames';
import { BlockContent } from '@ui/pages/block/blockContent';
import {
  getProgress,
  ModuleProgress,
} from '@ui/pages/module/index/moduleProgress';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { BlockSubTitle } from '@ui/pages/block/blockSubTitle';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';
import { IModuleUserViewModel } from '@viewModel/modules/module/user/interface';
import './index.scss';

export const BlockPage = observer(() => {
  const { data: module } = useViewModel<IModuleUserViewModel>(
    VIEW_MODEL.ModuleUser
  );
  const { data: block } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.MODULES.label,
      url: { pathname: ROUTER_CONST_SCHOOL.MODULES.path },
    },
    {
      label: module ? `${module.title}. ${module.name}` : 'loading...',
      url: {
        pathname: ROUTER_CONST_SCHOOL.MODULE.path,
        query: { id: module?.id },
      },
    },
    {
      label: block ? `${block.title}. ${block.name}` : 'loading...',
      url: { pathname: ROUTER_CONST_SCHOOL.MODULE.path },
      neighbors: module?.blocks?.map((d) => {
        return {
          label: `${d.title}. ${d.name}`,
          url: {
            pathname: ROUTER_CONST_SCHOOL.BLOCK.path,
            query: { id: d.id },
          },
          disabled: !d.enable,
          complete: d.complete,
          selected: d.id === block?.id,
        };
      }),
    },
  ];
  const cls = classNames('block-page', {
    'block-page_complete': Boolean(module && module.complete),
  });
  const progress = getProgress([
    Boolean(block?.completeMaterials),
    Boolean(block?.completeQuestions),
    Boolean(block?.completeTasks),
  ]);

  return (
    <Page
      title={block?.name}
      subTitle={<BlockSubTitle />}
      breadCrumbs={breadCrumbs}
      quickFilter={<ModuleProgress value={progress} />}
      className={cls}
    >
      <BlockContent />
    </Page>
  );
});
