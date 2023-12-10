import { Tag, TTagColor } from '@components/tag/index';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface IProps {
  status?: string | null;
}

export const TagStatus = (props: IProps) => {
  const { status } = props;
  if (!status) return null;
  let color: TTagColor | undefined = undefined;
  let icon = undefined;
  if (status.toLowerCase() === 'new') {
    color = 'blue';
    icon = <StarBorderIcon />;
  }
  if (status.toLowerCase() === 'active') {
    color = 'green';
    icon = <CheckCircleOutlineIcon />;
  }
  if (status.toLowerCase() === 'approved') {
    color = 'green';
    icon = <CheckCircleOutlineIcon />;
  }
  if (status.toLowerCase() === 'suspended') {
    color = 'grey';
  }
  if (status.toLowerCase() === 'cancelled') {
    color = 'red';
    icon = <CancelOutlinedIcon />;
  }
  if (status.toLowerCase() === 'waiting for approval') {
    color = 'orange';
    icon = <AccessTimeOutlinedIcon />;
  }
  if (status.toLowerCase() === 'rejected') {
    color = 'red';
    icon = <CancelOutlinedIcon />;
  }
  return <Tag tag={status} color={color} icon={icon} />;
};
