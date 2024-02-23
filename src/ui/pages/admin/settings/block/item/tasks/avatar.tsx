import { Avatar as MuiAvatar, useTheme } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { ITaskDTO } from '@model/entities/task';

interface IProps {
  item?: ITaskDTO;
}

export const Avatar = (props: IProps) => {
  const { item } = props;
  const theme = useTheme();
  if (!item?.document) return null;

  const documentType = item.document.documentType.name;
  const sxAvatar = { backgroundColor: theme.palette.fGrey['10'] };
  const sxIcon = { color: theme.palette.fGrey['100'] };
  if (documentType === 'link') {
    return (
      <MuiAvatar variant="rounded" sx={sxAvatar}>
        <LinkIcon fontSize="large" sx={sxIcon} />
      </MuiAvatar>
    );
  }
  if (documentType === 'video') {
    return (
      <MuiAvatar variant="rounded" sx={sxAvatar}>
        <PlayArrowIcon fontSize="large" sx={sxIcon} />
      </MuiAvatar>
    );
  }
  if (documentType === 'file') {
    return (
      <MuiAvatar variant="rounded" sx={sxAvatar}>
        <AttachFileIcon fontSize="large" sx={sxIcon} />
      </MuiAvatar>
    );
  }

  return null;
};
