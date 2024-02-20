import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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

  const documentType = item.document.documentType.name;
  if (documentType === 'link') {
    return (
      <Button onClick={handleLink} color="primary" endIcon={<OpenInNewIcon />}>
        Open in a new window
      </Button>
    );
  }
  if (documentType === 'video') {
    return (
      <Button onClick={handleLink} color="primary" endIcon={<OpenInNewIcon />}>
        Open Youtube
      </Button>
    );
  }
  if (documentType === 'file') {
    return (
      <Button onClick={handleFile} color="primary" endIcon={<FileDownloadIcon />}>
        Download file
      </Button>
    );
  }

  return null;
};
