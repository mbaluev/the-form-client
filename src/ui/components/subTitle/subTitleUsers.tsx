import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { ROUTES } from '@settings/routes';

export const SubTitleUsers = observer(() => {
  return <Fragment>{ROUTES.ADMIN_PROGRESS_USERS.label}</Fragment>;
});
