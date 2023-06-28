import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { MaterialIcon } from '@ui/pages/school/block/tabs/tabMaterials/materialList/materialIcon';

export const MaterialRenderer = (props: ICellRendererParams) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
      }}
    >
      <span>{props.value.index}.</span>
      <MaterialIcon complete={props.value.complete} />
      <span>{props.value.name}</span>
    </div>
  );
};
