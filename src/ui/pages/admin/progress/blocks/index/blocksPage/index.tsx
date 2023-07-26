import React from 'react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { Page } from '@ui/layout/page';
import { observer } from 'mobx-react';
import { BlocksList } from '@ui/pages/admin/progress/blocks/index/blocksList';
import { TitleModule } from '@ui/components/title/titleModule';
import { SubTitleModule } from '@ui/components/subTitle/subTitleModule';
import {
  getProgress,
  ModuleProgress,
} from '@ui/pages/school/module/index/moduleProgress';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IModuleAdminViewModel } from '@viewModel/modules/entities/module/admin/interface';

interface IProps {
  breadCrumbs: TBreadCrumb[];
}

export const BlocksPage = observer((props: IProps) => {
  const { data: userModule } = useViewModel<IModuleAdminViewModel>(
    VIEW_MODEL.ModuleAdmin
  );
  const { breadCrumbs } = props;
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
      quickFilter={<ModuleProgress value={progress} width="150px" />}
      breadCrumbs={breadCrumbs}
      padding={false}
    >
      <BlocksList />
    </Page>
  );
});
