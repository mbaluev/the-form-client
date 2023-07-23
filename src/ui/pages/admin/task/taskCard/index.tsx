import React from 'react';
import { Page } from '@ui/layout/page';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Page204 } from '@ui/pages/errors/204';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';
import { TitleTask } from '@ui/pages/admin/task/TitleTask';
import { TagTask } from '@ui/pages/admin/task/TagTask';
import { TaskCardActions } from '@ui/pages/admin/task/taskCardActions';
import { TaskCardContent } from '@ui/pages/admin/task/taskCardContent';
import { Loader } from '@components/loader';
import { DialogTaskAdminDocument } from '@ui/dialogs/admin/dialogTaskAdminDocument';
import { ITaskAdminDocumentViewModel } from '@viewModel/modules/entities/task/adminDocument/interface';

export const TaskCard = observer(() => {
  const { data, isDataLoading, isListLoading, getData, getList } =
    useViewModel<ITaskAdminViewModel>(VIEW_MODEL.TaskAdmin);

  const { isModalOpen, modalClose, modalSubmit } =
    useViewModel<ITaskAdminDocumentViewModel>(VIEW_MODEL.TaskAdminDocument);

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
      title={<TitleTask />}
      subTitle={<TagTask />}
      quickFilter={<TaskCardActions />}
    >
      <TaskCardContent />
      <DialogTaskAdminDocument
        isOpen={isModalOpen}
        onClose={modalClose}
        onCancel={modalClose}
        onSubmit={handleSubmit}
      />
    </Page>
  );
});
