import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Tag } from '@components/tag';
import { TaskIcon } from '@ui/pages/school/block/tabs/tabTasks/taskList/taskIcon';

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
        <TaskIcon complete={params.value.complete} sent={params.value.sent} />
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {params.value.name}
        </span>
      </div>
      <Tag tag={params.value.type.name} color={params.value.type.color} />
    </div>
  );
};
