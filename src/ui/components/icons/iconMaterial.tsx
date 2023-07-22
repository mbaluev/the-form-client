import { IMaterialUserDTO } from '@model/entities/material';
import { titleMaterial } from '@ui/components/icons/titleMaterial';
import { Tooltip } from '@components/tooltip';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface IProps {
  userMaterial?: IMaterialUserDTO | null;
  style?: object;
}

export const IconMaterial = (props: IProps) => {
  const { userMaterial, style } = props;
  const title = titleMaterial(userMaterial);
  let icon = <CircleOutlinedIcon className="color_grey-50" style={style} />;
  if (userMaterial?.complete) {
    icon = <CheckCircleIcon className="color_green" style={style} />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
