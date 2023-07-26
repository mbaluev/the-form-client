import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';

export const SubTitleUsers = observer(() => {
  return <Fragment>{ROUTER_CONST_SCHOOL.ADMIN_PROGRESS_USERS.label}</Fragment>;
});
