import { Tooltip } from '@components/tooltip';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IModuleUserDTO } from '@model/entities/module';
import { statusModule } from '@ui/components/status/statusModule';

interface IProps {
  userModule?: IModuleUserDTO | null;
  style?: object;
}

export const IconModule = (props: IProps) => {
  const { userModule, style } = props;
  const title = statusModule(userModule);
  let icon = <DoDisturbIcon className="color_grey-50" style={style} />;
  if (userModule?.enable && !userModule.complete) {
    icon = <CircleOutlinedIcon className="color_grey-50" style={style} />;
  }
  if (userModule?.enable && userModule.complete) {
    icon = <CheckCircleIcon className="color_green" style={style} />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
