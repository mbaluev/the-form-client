export const isAccess = (claimRoles?: string[], roles?: string[]) => {
  if (!roles || roles.length === 0) return true;
  if (!claimRoles || claimRoles.length === 0) return false;
  return claimRoles.filter((value) => roles.includes(value)).length > 0;
};
