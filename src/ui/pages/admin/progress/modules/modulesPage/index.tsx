import React from 'react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { Page } from '@ui/layout/page';
import { observer } from 'mobx-react';
import { ModulesList } from '@ui/pages/admin/progress/modules/modulesList';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IModuleAdminViewModel } from '@viewModel/modules/entities/module/admin/interface';
import { getProgress, ModuleProgress } from '@ui/pages/school/module/index/moduleProgress';
import { TitleModules } from '@ui/components/title/titleModules';
import { SubTitleModules } from '@ui/components/subTitle/subTitleModules';
import { IUserAdminViewModel } from '@viewModel/modules/entities/user/admin/interface';

interface IProps {
  breadCrumbs: TBreadCrumb[];
}

export const ModulesPage = observer((props: IProps) => {
  const { list: userModules } = useViewModel<IModuleAdminViewModel>(VIEW_MODEL.ModuleAdmin);
  const { data: user } = useViewModel<IUserAdminViewModel>(VIEW_MODEL.UserAdmin);
  const { breadCrumbs } = props;
  const progressValues = userModules?.reduce((prevUserModules: boolean[], currUserModule) => {
    const currUserModuleData = currUserModule?.userBlocks?.reduce(
      (prev: boolean[], curr) =>
        prev.concat([
          Boolean(curr.completeMaterials),
          Boolean(curr.completeQuestions),
          Boolean(curr.completeTasks),
        ]),
      []
    );
    return currUserModuleData ? prevUserModules.concat(currUserModuleData) : prevUserModules;
  }, []);
  const progress = getProgress(progressValues);
  return (
    <Page
      title={<TitleModules userModules={userModules} user={user} admin />}
      subTitle={<SubTitleModules userModules={userModules} user={user} admin />}
      quickFilter={<ModuleProgress value={progress} width="150px" />}
      breadCrumbs={breadCrumbs}
      padding={false}
    >
      <ModulesList />
    </Page>
  );
});
