import { Tooltip } from '@theme/tooltip';
import { IModuleUserDTO } from '@model/entities/module';
import { statusModules } from '@ui/components/status/statusModules';
import SchoolIcon from '@mui/icons-material/School';

interface IProps {
  userModules?: IModuleUserDTO[] | null;
}

export const IconModules = (props: IProps) => {
  const { userModules } = props;
  const title = statusModules(userModules);
  let icon = <SchoolIcon color="secondary" />;
  userModules?.forEach((userModule: IModuleUserDTO) => {
    if (userModule?.enable && !userModule.complete) icon = <SchoolIcon color="primary" />;
  });
  let complete = false;
  if (userModules && userModules.length > 0) {
    complete = userModules?.reduce(
      (prev: boolean, userModule: IModuleUserDTO) => prev && userModule.complete,
      true
    );
  }
  if (complete) {
    icon = <SchoolIcon color="success" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
