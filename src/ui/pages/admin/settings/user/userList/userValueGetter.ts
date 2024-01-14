export const userValueGetter = (params: any) => {
  return {
    title: `${params.node.rowIndex + 1}. ${params.data?.username}`,
    paid: Boolean(params.data.paid) ? { status: 'paid', color: 'green' } : undefined,
    active: Boolean(params.data.active) ? { status: 'active', color: 'blue' } : undefined,
    admin: Boolean(params.data.admin) ? { status: 'admin', color: 'red' } : undefined,
  };
};
