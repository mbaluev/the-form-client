import React from 'react';
import { observer } from 'mobx-react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { Page } from '@ui/layout/page';
import { classNames } from '@utils/classNames';
import { ModuleContent } from '@ui/pages/school/module/[id]/moduleContent';
import {
  getProgress,
  ModuleProgress,
} from '@ui/pages/school/module/index/moduleProgress';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { ModuleSubTitle } from '@ui/pages/school/module/[id]/moduleSubTitle';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';
import './index.scss';

export const ModulePage = observer(() => {
  const { list: userModules, data: userModule } =
    useViewModel<IModuleUserViewModel>(VIEW_MODEL.ModuleUser);
  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.SCHOOL_MODULES.label,
      url: { pathname: ROUTER_CONST_SCHOOL.SCHOOL_MODULES.path },
    },
    {
      label: userModule
        ? `${userModule.module?.title}. ${userModule.module?.name}`
        : 'loading...',
      url: { pathname: ROUTER_CONST_SCHOOL.SCHOOL_MODULE.path },
      neighbors: userModules?.map((d) => {
        return {
          label: `${d.module?.title}. ${d.module?.name}`,
          url: {
            pathname: ROUTER_CONST_SCHOOL.SCHOOL_MODULE.path,
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
    'module-page_complete': Boolean(userModule && userModule.complete),
  });
  const progressValues = userModule?.userBlocks?.reduce(
    (prev: boolean[], curr) =>
      prev.concat([
        Boolean(curr.completeMaterials),
        Boolean(curr.completeQuestions),
        Boolean(curr.completeTasks),
      ]),
    []
  );
  const progress = getProgress(progressValues);
  return (
    <Page
      title={userModule?.module?.name}
      subTitle={<ModuleSubTitle />}
      breadCrumbs={breadCrumbs}
      quickFilter={<ModuleProgress value={progress} />}
      className={cls}
    >
      <ModuleContent />
    </Page>
  );
});
