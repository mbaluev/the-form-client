import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IModuleUserDTO } from '@model/entities/module';
import { IconModules } from '@ui/components/icon/iconModules';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { IUserDTO } from '@model/entities/user';

interface IProps {
  userModules?: IModuleUserDTO[] | null;
  user?: IUserDTO | null;
  admin?: boolean;
}

export const TitleModules = observer((props: IProps) => {
  const { userModules, user, admin } = props;
  return (
    <Stack direction="row" spacing={2}>
      <IconModules userModules={userModules} style={{ marginTop: '5px' }} />
      {admin && user ? (
        <Fragment>
          <div>{user.firstname}</div>
          <div>{user.lastname}</div>
        </Fragment>
      ) : (
        <div>{ROUTER_CONST_SCHOOL.SCHOOL_MODULES.label}</div>
      )}
    </Stack>
  );
});
