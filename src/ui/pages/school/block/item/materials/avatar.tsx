import { Stack } from '@mui/material';
import { observer } from 'mobx-react';
import { IMaterialUserDTO } from '@model/entities/material';
import { IconDocument } from '@ui/components/icon/iconDocument';
import { IconMaterial } from '@ui/components/icon/iconMaterial';

interface IProps {
  item: IMaterialUserDTO;
}

export const Avatar = observer((props: IProps) => {
  const { item } = props;
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconMaterial userMaterial={item} />
      <IconDocument document={item.material?.document} />
    </Stack>
  );
});
