import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useAuth } from '@hooks/useAuth';
import _ from 'lodash';

interface IProps {
  roles?: string[];
}

export const isAccess = (claimRoles?: string[], roles?: string[]) => {
  if (!roles || roles.length === 0) return true;
  if (!claimRoles || claimRoles.length === 0) return false;
  return _.intersection(claimRoles, roles).length > 0;
};

export const PermissionWrapper: FC<IProps> = observer((props) => {
  const { roles, children } = props;
  const { roles: claimRoles } = useAuth();
  return (
    <React.Fragment>
      {isAccess(claimRoles, roles) ? children : null}
    </React.Fragment>
  );
});
