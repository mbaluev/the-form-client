import { IBlockUserDTO } from '@model/entities/block';
import { statusBlock } from '@ui/components/status/statusBlock';
import { Tooltip } from '@theme/tooltip';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatIcon from '@mui/icons-material/Chat';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const IconBlock = (props: IProps) => {
  const { userBlock } = props;
  const title = statusBlock(userBlock);
  let icon = <BookmarkBorderIcon color="secondary" />;
  if (userBlock?.enable && !userBlock.complete) {
    icon = <BookmarkIcon color="primary" />;
  }
  if (userBlock?.enable && userBlock.complete) {
    icon = <BookmarkIcon color="success" />;
  }
  if (userBlock?.enable && userBlock.complete && userBlock.errorQuestions) {
    icon = <BookmarkIcon color="error" />;
  }
  if (
    userBlock?.enable &&
    userBlock.complete &&
    userBlock.errorQuestions &&
    userBlock.commentQuestions
  ) {
    icon = <ChatIcon color="success" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
