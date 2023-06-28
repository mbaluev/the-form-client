import React from 'react';
import { Page } from '@ui/layout/page';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Page204 } from '@ui/pages/errors/204';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';
import { TaskTitle } from '@ui/pages/admin/task/taskTitle';
import { TaskSubTitle } from '@ui/pages/admin/task/taskSubTitle';
import { TaskCardActions } from '@ui/pages/admin/task/taskCardActions';
import { TaskCardContent } from '@ui/pages/admin/task/taskCardContent';
import { DialogTaskUserDocument } from '@ui/dialogs/dialogTaskUserDocument';
import { ITaskUserDocumentViewModel } from '@viewModel/modules/entities/task/userDocument/interface';
import { Loader } from '@components/loader';

export const TaskCard = observer(() => {
  const { data, isDataLoading, isListLoading, getData, getList } =
    useViewModel<ITaskAdminViewModel>(VIEW_MODEL.TaskAdmin);

  const { isModalOpen, modalClose, modalSubmit } =
    useViewModel<ITaskUserDocumentViewModel>(VIEW_MODEL.TaskUserDocument);

  const handleSubmit = async () => {
    await modalSubmit();
    if (data?.id) await getData(data.id);
    await getList();
  };

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
