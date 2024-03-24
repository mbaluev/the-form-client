import { Avatar as MuiAvatar, useTheme } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PublicIcon from '@mui/icons-material/Public';
import { IDocumentDTO } from '@model/common/document';

interface IProps {
  document?: IDocumentDTO;
}

export const IconDocument = (props: IProps) => {
  const { document } = props;
  const theme = useTheme();
  if (!document) return null;

  const documentType = document.documentType.name;
  const sxAvatar = { backgroundColor: theme.palette.fGrey['10'] };
  const sxIcon = { color: theme.palette.fGrey['100'] };
  if (documentType === 'link') {
    return (
      <MuiAvatar variant="rounded" sx={sxAvatar}>
        <PublicIcon fontSize="large" sx={sxIcon} />
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
