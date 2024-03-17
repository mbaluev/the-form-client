import { Tooltip } from '@theme/tooltip';
import { IModuleUserDTO } from '@model/entities/module';
import { statusModule } from '@ui/components/status/statusModule';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface IProps {
  userModule?: IModuleUserDTO | null;
}

export const IconModule = (props: IProps) => {
  const { userModule } = props;
  const title = statusModule(userModule);
  let icon = <DoDisturbIcon color="secondary" />;
  if (userModule?.enable && !userModule.complete) {
    icon = <CircleOutlinedIcon color="primary" />;
  }
  if (userModule?.enable && userModule.complete) {
    icon = <CheckCircleIcon color="success" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
