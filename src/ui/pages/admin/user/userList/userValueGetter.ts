export const userValueGetter = (params: any) => {
  return {
    title: `${params.node.rowIndex + 1}. ${params.data?.name}`,
    paid: Boolean(params.data.paid)
      ? { status: 'Paid', color: 'green' }
      : undefined,
    active: Boolean(params.data.active)
      ? { status: 'Active', color: 'blue' }
      : undefined,
  };
};
