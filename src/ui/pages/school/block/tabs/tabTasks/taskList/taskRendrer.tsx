import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Tag } from '@components/tag';
import { TaskCompleteIcon } from '@ui/pages/school/block/tabs/tabTasks/taskList/taskCompleteIcon';
import { TaskStatusIcon } from '@ui/pages/school/block/tabs/tabTasks/taskList/taskStatusIcon';

export const TaskRenderer = (params: ICellRendererParams) => {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <div
        style={{
          flex: '1 1 auto',
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <span>{params.value.index}.</span>
        <TaskCompleteIcon complete={params.value.complete} />
        <TaskStatusIcon sent={params.value.sent} />
        <span>{params.value.name}</span>
      </div>
      <Tag tag={params.value.type.name} color={params.value.type.color} />
    </div>
  );
};
