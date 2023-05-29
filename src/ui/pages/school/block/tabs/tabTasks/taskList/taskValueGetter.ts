export const taskValueGetter = (params: any) => {
  const type = params.data?.document.documentType.name;
  return {
    index: params.node.rowIndex + 1,
    name: params.data?.document.name,
    type: { name: type, color: 'blue' },
    complete: params.data?.complete,
    sent: params.data?.sent,
  };
};
