import { IModuleUserDTO } from '@model/entities/module';
import { statusModules } from '@ui/components/status/statusModules';
import { Chip, ChipProps } from '@mui/material';

interface IProps {
  userModules?: IModuleUserDTO[] | null;
}

export const TagModules = (props: IProps) => {
  const { userModules } = props;
  const label = statusModules(userModules);
  let color: ChipProps['color'] = 'secondary';
  userModules?.forEach((userModule) => {
    if (userModule?.enable && !userModule.complete) color = 'primary';
  });
  let complete = false;
  if (userModules && userModules.length > 0) {
    complete = userModules?.reduce(
      (prev: boolean, userModule: IModuleUserDTO) => prev && userModule.complete,
      true
    );
  }
  if (complete) {
    color = 'success';
  }
  return <Chip label={label} color={color} size="small" />;
};
