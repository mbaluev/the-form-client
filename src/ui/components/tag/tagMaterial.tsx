import { observer } from 'mobx-react';
import { statusMaterial } from '@ui/components/status/statusMaterial';
import { IMaterialUserDTO } from '@model/entities/material';
import { Chip, ChipProps } from '@mui/material';

interface IProps {
  userMaterial?: IMaterialUserDTO | null;
}

export const TagMaterial = observer((props: IProps) => {
  const { userMaterial } = props;
  const label = statusMaterial(userMaterial);
  let color: ChipProps['color'] = 'secondary';
  if (userMaterial?.complete) color = 'success';
  return <Chip label={label} color={color} size="small" />;
});
