import { Tooltip } from '@theme/tooltip';
import { IModuleUserDTO } from '@model/entities/module';
import { statusModules } from '@ui/components/status/statusModules';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface IProps {
  userModules?: IModuleUserDTO[] | null;
  style?: object;
}

export const IconModules = (props: IProps) => {
  const { userModules, style } = props;
  const title = statusModules(userModules);
  let icon = <DoDisturbIcon className="color_grey-50" style={style} />;
  userModules?.forEach((userModule: IModuleUserDTO) => {
    if (userModule?.enable && !userModule.complete)
      icon = <CircleOutlinedIcon className="color_grey-50" style={style} />;
  });
  let complete = false;
  if (userModules && userModules.length > 0) {
    complete = userModules?.reduce(
      (prev: boolean, userModule: IModuleUserDTO) => prev && userModule.complete,
      true
    );
  }
  if (complete) {
    icon = <CheckCircleIcon className="color_green" style={style} />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
