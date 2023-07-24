import { IBlockUserDTO } from '@model/entities/block';
import { statusBlock } from '@ui/components/status/statusBlock';
import { Tooltip } from '@components/tooltip';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatIcon from '@mui/icons-material/Chat';

interface IProps {
  userBlock?: IBlockUserDTO | null;
  style?: object;
}

export const IconBlock = (props: IProps) => {
  const { userBlock, style } = props;
  const title = statusBlock(userBlock);
  let icon = <DoDisturbIcon className="color_grey-50" style={style} />;
  if (userBlock?.enable && !userBlock.complete) {
    icon = <CircleOutlinedIcon className="color_grey-50" style={style} />;
  }
  if (userBlock?.enable && userBlock.complete) {
    icon = <CheckCircleIcon className="color_green" style={style} />;
  }
  if (userBlock?.enable && userBlock.complete && userBlock.errorQuestions) {
    icon = <CheckCircleIcon className="color_red" style={style} />;
  }
  if (
    userBlock?.enable &&
    userBlock.complete &&
    userBlock.errorQuestions &&
    userBlock.commentQuestions
  ) {
    icon = <ChatIcon className="color_red" style={style} />;
  }

  return <Tooltip title={title}>{icon}</Tooltip>;
};
