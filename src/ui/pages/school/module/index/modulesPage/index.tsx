import React from 'react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { Page } from '@ui/layout/page';
import { ModuleGrid } from '@ui/pages/school/module/index/moduleGrid';
import { observer } from 'mobx-react';
import {
  getProgress,
  ModuleProgress,
} from '@ui/pages/school/module/index/moduleProgress';
import { useViewModel } from '@hooks/useViewModel';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { classNames } from '@utils/classNames';
import './index.scss';
import { ModulesStatus } from '@ui/pages/school/module/index/modulesStatus';

export const ModulesPage = observer(() => {
  const { list: userModules } = useViewModel<IModuleUserViewModel>(
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
  ];
  const cls = classNames('modules-page');
  const progressValues = userModules?.reduce(
    (prevUserModules: boolean[], currUserModule) => {
      const currUserModuleData = currUserModule?.userBlocks?.reduce(
        (prev: boolean[], curr) =>
          prev.concat([
            Boolean(curr.completeMaterials),
            Boolean(curr.completeQuestions),
            Boolean(curr.completeTasks),
          ]),
        []
      );
      return currUserModuleData
        ? prevUserModules.concat(currUserModuleData)
        : prevUserModules;
    },
    []
  );
  const progress = getProgress(progressValues);
  return (
    <Page
      title={ROUTER_CONST_SCHOOL.SCHOOL_MODULES.label}
      subTitle={<ModulesStatus />}
      breadCrumbs={breadCrumbs}
      quickFilter={<ModuleProgress value={progress} />}
      className={cls}
    >
      <ModuleGrid />
    </Page>
  );
});
