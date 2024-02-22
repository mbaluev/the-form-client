import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button } from '@mui/material';
import { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { useFileStore } from '@store/modules/common/file/useFileStore';
import { IDocumentDTO } from '@model/common/document';

interface IProps {
  doc?: IDocumentDTO;
}

export const Download = observer((props: IProps) => {
  const { doc } = props;
  const { download } = useFileStore();
  if (!doc) return null;

  const handleLink = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const a = document.createElement('a');
    a.href = doc.url || '';
    a.target = '_blank';
    a.click();
  };
  const handleFile = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await download(doc.file);
  };

  const documentType = doc.documentType.name;
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
});
