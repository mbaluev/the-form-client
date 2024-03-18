import { Tooltip } from '@theme/tooltip';
import { IModuleUserDTO } from '@model/entities/module';
import { statusModule } from '@ui/components/status/statusModule';
import SchoolIcon from '@mui/icons-material/School';

interface IProps {
  userModule?: IModuleUserDTO | null;
}

export const IconModule = (props: IProps) => {
  const { userModule } = props;
  const title = statusModule(userModule);
  let icon = <SchoolIcon color="secondary" />;
  if (userModule?.enable && !userModule.complete) {
    icon = <SchoolIcon color="primary" />;
  }
  if (userModule?.enable && userModule.complete) {
    icon = <SchoolIcon color="success" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
