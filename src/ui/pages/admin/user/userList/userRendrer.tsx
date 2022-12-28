import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Tag } from '@components/tag';

export const UserRenderer = (params: ICellRendererParams) => {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <div style={{ flex: '1 1 auto' }}>{params.value.title}</div>
      {params.value.paid && (
        <Tag tag={params.value.paid.status} color={params.value.paid.color} />
      )}
      {params.value.active && (
        <Tag
          tag={params.value.active.status}
          color={params.value.active.color}
        />
      )}
      {params.value.admin && (
        <Tag tag={params.value.admin.status} color={params.value.admin.color} />
      )}
    </div>
  );
};
