import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button } from '@mui/material';
import { IMaterialDTO } from '@model/entities/material';
import { MouseEvent } from 'react';

interface IProps {
  item?: IMaterialDTO;
  download?: (id: string, name: string) => Promise<void>;
  callback?: () => Promise<void>;
}

export const Download = (props: IProps) => {
  const { item, download, callback } = props;
  if (!item?.document) return null;

  const documentType = item.document.documentType.name;
  const iconLink = <OpenInNewIcon />;
  const iconVideo = <OndemandVideoIcon />;
  const iconFile = <FileDownloadIcon />;

  const handleLink = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const a = document.createElement('a');
    a.href = item.document?.url || '';
    a.target = '_blank';
    a.click();
    if (callback) await callback();
  };
  const handleFile = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (download && item.document) await download(item.document.file?.id, item.document.file?.name);
    if (callback) await callback();
  };

  if (documentType === 'link') {
    return (
      <Button onClick={handleLink} color="primary" endIcon={iconLink}>
        Open in a new window
      </Button>
    );
  }
  if (documentType === 'video') {
    return (
      <Button onClick={handleLink} color="primary" endIcon={iconVideo}>
        Open Youtube
      </Button>
    );
  }
  if (documentType === 'file') {
    return (
      <Button onClick={handleFile} color="primary" endIcon={iconFile}>
        Download file
      </Button>
    );
  }

  return null;
};
