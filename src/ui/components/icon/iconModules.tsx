import { Tooltip } from '@theme/tooltip';
import { IModuleUserDTO } from '@model/entities/module';
import { statusModules } from '@ui/components/status/statusModules';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface IProps {
  userModules?: IModuleUserDTO[] | null;
}

export const IconModules = (props: IProps) => {
  const { userModules } = props;
  const title = statusModules(userModules);
  let icon = <DoDisturbIcon color="secondary" />;
  userModules?.forEach((userModule: IModuleUserDTO) => {
    if (userModule?.enable && !userModule.complete) icon = <CircleOutlinedIcon color="primary" />;
  });
  let complete = false;
  if (userModules && userModules.length > 0) {
    complete = userModules?.reduce(
      (prev: boolean, userModule: IModuleUserDTO) => prev && userModule.complete,
      true
    );
  }
  if (complete) {
    icon = <CheckCircleIcon color="success" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
