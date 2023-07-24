import React from 'react';
import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IModuleUserDTO } from '@model/entities/module';
import { IconModules } from '@ui/components/icon/iconModules';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';

interface IProps {
  userModules?: IModuleUserDTO[] | null;
}

export const TitleModules = observer((props: IProps) => {
  const { userModules } = props;
  const name = ROUTER_CONST_SCHOOL.SCHOOL_MODULES.label;
  return (
    <Stack direction="row" spacing="10px">
      <IconModules userModules={userModules} style={{ marginTop: '5px' }} />
      <div>{name}</div>
    </Stack>
  );
});
