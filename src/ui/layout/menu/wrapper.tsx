import { Fragment, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import { isAccess } from '@ui/layout/menu/isAccess';

interface IProps {
  roles?: string[];
  children?: ReactNode;
}

export const Wrapper = observer((props: IProps) => {
  const { roles, children } = props;
  const { roles: claimRoles } = useAuthStore();
  return <Fragment>{isAccess(claimRoles, roles) ? children : null}</Fragment>;
});
