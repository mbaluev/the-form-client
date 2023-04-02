import React from 'react';
import { observer } from 'mobx-react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { Page } from '@ui/layout/page';
import { classNames } from '@utils/classNames';
import { ModuleContent } from '@ui/pages/module/[id]/moduleContent';
import {
  getProgress,
  ModuleProgress,
} from '@ui/pages/module/index/moduleProgress';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { ModuleSubTitle } from '@ui/pages/module/[id]/moduleSubTitle';
import { IModuleUserViewModel } from '@viewModel/modules/module/user/interface';
import './index.scss';

export const ModulePage = observer(() => {
  const { list: modules, data: module } = useViewModel<IModuleUserViewModel>(
    VIEW_MODEL.ModuleUser
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
      url: { pathname: ROUTER_CONST_SCHOOL.MODULE.path },
      neighbors: modules?.map((d) => {
        return {
          label: `${d.title}. ${d.name}`,
          url: {
            pathname: ROUTER_CONST_SCHOOL.MODULE.path,
            query: { id: d.id },
          },
          disabled: !d.enable,
          complete: d.complete,
          selected: d.id === module?.id,
        };
      }),
    },
  ];
  const cls = classNames('module-page', {
    'module-page_complete': Boolean(module && module.complete),
  });
  const progressValues = module?.blocks?.reduce((prev: boolean[], curr) => {
    return prev.concat([
      Boolean(curr.completeMaterials),
      Boolean(curr.completeQuestions),
      Boolean(curr.completeTasks),
    ]);
  }, []);
  const progress = getProgress(progressValues);
  return (
    <Page
      title={module?.name}
      subTitle={<ModuleSubTitle />}
      breadCrumbs={breadCrumbs}
      quickFilter={<ModuleProgress value={progress} />}
      className={cls}
    >
      <ModuleContent />
    </Page>
  );
});
