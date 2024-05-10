import { IModuleUserDTO } from '@model/entities/module';
import { statusModule } from '@ui/components/status/statusModule';
import { Chip, ChipProps } from '@mui/material';

interface IProps {
  userModule?: IModuleUserDTO | null;
}

export const TagModule = (props: IProps) => {
  const { userModule } = props;
  const label = statusModule(userModule);
  let color: ChipProps['color'] = 'primary';
  if (userModule?.complete) color = 'success';
  if (!userModule?.enable) color = 'secondary';
  return <Chip label={label} color={color} size="small" sx={{ width: 'fit-content' }} />;
};
