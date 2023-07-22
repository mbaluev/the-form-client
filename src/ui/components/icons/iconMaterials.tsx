import { IBlockUserDTO } from '@model/entities/block';
import { titleMaterials } from '@ui/components/icons/titleMaterials';
import { Tooltip } from '@components/tooltip';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const IconMaterials = (props: IProps) => {
  const { userBlock } = props;
  const title = titleMaterials(userBlock);
  let icon = <DoDisturbIcon className="color_grey-50" />;
  if (userBlock?.enable && !userBlock?.completeMaterials) {
    icon = <CircleOutlinedIcon className="color_grey-50" />;
  }
  if (userBlock?.completeMaterials) {
    icon = <CheckCircleIcon className="color_green" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
