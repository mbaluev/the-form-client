import * as React from 'react';
import { observer } from 'mobx-react';
import { useAuth } from '@hooks/useAuth';
import { Tag, Tags } from '@components/tag';
import { ROLES } from '@app/settings/roles';

export const AccountRoles = observer(() => {
  const { roles } = useAuth();
  return (
    <Tags>
      {roles?.includes(ROLES.USER) && <Tag tag={ROLES.USER} color="blue" />}
      {roles?.includes(ROLES.STUDENT) && (
        <Tag tag={ROLES.STUDENT} color="green" />
      )}
      {roles?.includes(ROLES.ADMIN) && <Tag tag={ROLES.ADMIN} color="red" />}
    </Tags>
  );
});
