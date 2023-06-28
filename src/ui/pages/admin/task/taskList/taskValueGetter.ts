export const taskValueGetter = (params: any) => {
  const type = params.data?.task.document.documentType.name;
  return {
    index: params.node.rowIndex + 1,
    type: { name: type, color: 'blue' },
    complete: params.data?.complete,
    sent: params.data?.sent,
    user: params.data?.user.username,
    block: params.data?.task.block.name,
    task: params.data?.task.document.name,
  };
};
