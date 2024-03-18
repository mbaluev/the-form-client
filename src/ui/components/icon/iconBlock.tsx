import { IBlockUserDTO } from '@model/entities/block';
import { statusBlock } from '@ui/components/status/statusBlock';
import { Tooltip } from '@theme/tooltip';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const IconBlock = (props: IProps) => {
  const { userBlock } = props;
  const title = statusBlock(userBlock);
  let icon = <BookmarkBorderIcon color="secondary" />;
  if (userBlock?.enable && !userBlock.complete) {
    icon = <BookmarkBorderIcon color="primary" />;
  }
  if (userBlock?.enable && userBlock.complete) {
    icon = <BookmarkIcon color="success" />;
  }
  if (userBlock?.enable && userBlock.complete && userBlock.errorQuestions) {
    icon = <BookmarkBorderIcon color="error" />;
  }
  if (
    userBlock?.enable &&
    userBlock.complete &&
    userBlock.errorQuestions &&
    userBlock.commentQuestions
  ) {
    icon = <BookmarkBorderIcon color="success" />;
  }
  return <Tooltip title={title}>{icon}</Tooltip>;
};
