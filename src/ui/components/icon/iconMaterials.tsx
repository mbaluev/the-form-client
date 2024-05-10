import { IBlockUserDTO } from '@model/entities/block';
import { statusMaterials } from '@ui/components/status/statusMaterials';
import { Tooltip } from '@theme/tooltip';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckIcon from '@mui/icons-material/Check';

interface IProps {
  userBlock?: IBlockUserDTO | null;
  admin?: boolean;
}

export const IconMaterials = (props: IProps) => {
  const { userBlock } = props;
  const title = statusMaterials(userBlock);
  let icon = <DoDisturbIcon color="secondary" />;
  if (userBlock?.enable && !userBlock?.completeMaterials) {
    icon = <CircleOutlinedIcon color="primary" />;
  }
  if (userBlock?.completeMaterials) {
    icon = <CheckIcon color="success" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
