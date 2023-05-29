import React from 'react';
import { Page } from '@ui/layout/page';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Page204 } from '@ui/pages/errors/204';
import { Loader } from '@components/loader';
import { ITaskUserViewModel } from '@viewModel/modules/entities/task/user/interface';
import { TaskCardActions } from '@ui/pages/school/block/tabs/tabTasks/taskCardActions';
import { TaskTitle } from 'ui/pages/school/block/tabs/tabTasks/taskTitle';
import { TaskSubTitle } from '@ui/pages/school/block/tabs/tabTasks/taskSubTitle';
import { TaskCardContent } from 'ui/pages/school/block/tabs/tabTasks/taskCardContent';
import { DialogTaskUserDocument } from '@ui/dialogs/dialogTaskUserDocument';
import { ITaskUserDocumentViewModel } from '@viewModel/modules/entities/task/userDocument/interface';

export const TaskCard = observer(() => {
  const { data, isDataLoading, isListLoading } =
    useViewModel<ITaskUserViewModel>(VIEW_MODEL.TaskUser);

  const { isModalOpen, modalClose, modalSubmit } =
    useViewModel<ITaskUserDocumentViewModel>(VIEW_MODEL.TaskUserDocument);

  const handleSubmit = async () => modalSubmit();

  if (isListLoading || isDataLoading) {
    return (
      <Page>
        <Loader loading />
      </Page>
    );
  }

  if (!data) {
    return <Page204 />;
  }

  return (
    <Page
      title={<TaskTitle />}
      subTitle={<TaskSubTitle />}
      quickFilter={<TaskCardActions />}
    >
      <TaskCardContent />
      <DialogTaskUserDocument
        isOpen={isModalOpen}
        onClose={modalClose}
        onCancel={modalClose}
        onSubmit={handleSubmit}
      />
    </Page>
  );
});
