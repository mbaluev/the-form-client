import { Avatar as MuiAvatar, useTheme } from '@mui/material';
import { IMaterialUserDTO } from '@model/entities/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PublicIcon from '@mui/icons-material/Public';

interface IProps {
  item?: IMaterialUserDTO;
}

export const Icon = (props: IProps) => {
  const { item } = props;
  const theme = useTheme();
  if (!item?.material?.document) return null;

  const documentType = item.material.document.documentType.name;
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
