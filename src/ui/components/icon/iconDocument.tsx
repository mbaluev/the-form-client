import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PublicIcon from '@mui/icons-material/Public';
import { IDocumentDTO } from '@model/common/document';

interface IProps {
  document?: IDocumentDTO;
}

export const IconDocument = (props: IProps) => {
  const { document } = props;
  if (!document) return null;

  const documentType = document.documentType.name;
  if (documentType === 'link') {
    return <PublicIcon color="primary" />;
  }
  if (documentType === 'video') {
    return <PlayArrowIcon color="primary" />;
  }
  if (documentType === 'file') {
    return <AttachFileIcon color="primary" />;
  }

  return null;
};
