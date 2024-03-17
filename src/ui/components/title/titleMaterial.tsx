import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IconMaterial } from '@ui/components/icon/iconMaterial';
import { IMaterialUserDTO } from '@model/entities/material';

interface IProps {
  userMaterial?: IMaterialUserDTO | null;
}

export const TitleMaterial = observer((props: IProps) => {
  const { userMaterial } = props;
  const name = userMaterial?.material?.document?.name;
  return (
    <Stack direction="row" spacing="10px">
      <IconMaterial userMaterial={userMaterial} />
      {name && <div>{name}</div>}
    </Stack>
  );
});
