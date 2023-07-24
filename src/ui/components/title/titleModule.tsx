import React from 'react';
import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IModuleUserDTO } from '@model/entities/module';
import { IconModule } from '@ui/components/icon/iconModule';

interface IProps {
  userModule?: IModuleUserDTO | null;
}

export const TitleModule = observer((props: IProps) => {
  const { userModule } = props;
  const name = userModule?.module?.name;
  return (
    <Stack direction="row" spacing="10px">
      <IconModule userModule={userModule} style={{ marginTop: '5px' }} />
      {name && <div>{name}</div>}
    </Stack>
  );
});
