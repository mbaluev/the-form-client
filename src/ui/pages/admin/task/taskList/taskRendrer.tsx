import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Tag } from '@components/tag';
import { TaskIcon } from '@ui/pages/admin/task/taskList/taskIcon';

export const TaskRenderer = (params: ICellRendererParams) => {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <div
        style={{
          flex: '1 1 auto',
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <span>{params.value.index}.</span>
        <TaskIcon complete={params.value.complete} sent={params.value.sent} />
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {`${params.value.user} - ${params.value.block}`}
        </span>
      </div>
      <Tag tag={params.value.type.name} color={params.value.type.color} />
    </div>
  );
};
