import { IMaterialUserDTO } from '@model/entities/material';
import { statusMaterial } from '@ui/components/status/statusMaterial';
import { Tooltip } from '@theme/tooltip';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckIcon from '@mui/icons-material/Check';

interface IProps {
  userMaterial?: IMaterialUserDTO | null;
}

export const IconMaterial = (props: IProps) => {
  const { userMaterial } = props;
  const title = statusMaterial(userMaterial);
  let icon = <CircleOutlinedIcon color="secondary" />;
  if (userMaterial?.complete) {
    icon = <CheckIcon color="success" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
