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
import { SubTitleModule } from '@ui/components/subTitle/subTitleModule';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';
import './index.scss';
import { TitleModule } from '@ui/components/title/titleModule';

export const ModulePage = observer(() => {
  const { data: userModule } = useViewModel<IModuleUserViewModel>(
    VIEW_MODEL.ModuleUser
  );
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
      url: {
        pathname: ROUTER_CONST_SCHOOL.SCHOOL_MODULE.path,
        query: { id: userModule?.id },
      },
      // neighbors: userModules?.map((d) => {
      //   return {
      //     label: `${d.module?.title}. ${d.module?.name}`,
      //     url: {
      //       pathname: ROUTER_CONST_SCHOOL.SCHOOL_MODULE.path,
      //       query: { id: d.id },
      //     },
      //     disabled: !d.enable,
      //     complete: d.complete,
      //     selected: d.id === module?.id,
      //   };
      // }),
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
      title={<TitleModule userModule={userModule} />}
      subTitle={<SubTitleModule userModule={userModule} />}
      breadCrumbs={breadCrumbs}
      quickFilter={<ModuleProgress value={progress} width="150px" />}
      className={cls}
    >
      <ModuleContent />
    </Page>
  );
});
