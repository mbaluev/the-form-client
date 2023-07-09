import { ICellRendererParams } from 'ag-grid-community';
import { QuestionIcon } from '@ui/pages/admin/question/questionList/questionIcon';

export const QuestionRenderer = (params: ICellRendererParams) => {
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
        <QuestionIcon data={params.value.data} />
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {`${params.value.user} - ${params.value.block}`}
        </span>
      </div>
    </div>
  );
};
