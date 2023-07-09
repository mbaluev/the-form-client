export const questionValueGetter = (params: any) => {
  return {
    index: params.node.rowIndex + 1,
    data: params.data,
    user: params.data?.user.username,
    block: params.data?.question.block.name,
  };
};
