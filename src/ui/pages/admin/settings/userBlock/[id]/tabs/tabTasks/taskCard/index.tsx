import React from 'react';
import { Page } from '@ui/layout/page';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Page204 } from '@ui/pages/errors/204';
import { Loader } from '@components/loader';
import { TitleTask } from '@ui/components/title/titleTask';
import { TagTask } from '@ui/components/tag/tagTask';
import { TaskCardActions } from '@ui/pages/admin/settings/userBlock/[id]/tabs/tabTasks/taskCardActions';
import { TaskCardContent } from '@ui/pages/admin/settings/userBlock/[id]/tabs/tabTasks/taskCardContent';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';
import { ITaskAdminDocumentViewModel } from '@viewModel/modules/entities/task/adminDocument/interface';
import { DialogTaskAdminDocument } from '@ui/dialogs/admin/dialogTaskAdminDocument';

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
      title={<TitleTask userTask={data} admin />}
      subTitle={<TagTask userTask={data} admin />}
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