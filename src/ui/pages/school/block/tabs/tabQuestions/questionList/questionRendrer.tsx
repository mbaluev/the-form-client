import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { QuestionIcon } from '@ui/pages/school/block/tabs/tabQuestions/questionList/questionIcon';

export const QuestionRenderer = (params: ICellRendererParams) => {
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
        <span>{params.data.position}.</span>
        <QuestionIcon data={params.data} />
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {params.data.title}
        </span>
      </div>
    </div>
  );
};
