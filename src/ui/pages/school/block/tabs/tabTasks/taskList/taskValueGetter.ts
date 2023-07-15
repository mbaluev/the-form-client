export const taskValueGetter = (params: any) => {
  const name = params.data?.task?.document.name;
  const type = params.data?.task?.document.documentType.name;
  return {
    index: params.node.rowIndex + 1,
    name: name,
    type: { name: type, color: 'blue' },
    complete: params.data?.complete,
    sent: params.data?.sent,
  };
};
