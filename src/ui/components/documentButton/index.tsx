import React from 'react';
import { observer } from 'mobx-react';
import { Button, IButtonProps } from '@components/button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { IDocumentDTO } from '@model/common/document';
import { FormField } from '@components/form';

interface IProps {
  doc?: IDocumentDTO;
  download: (id: string, filename: string) => Promise<void>;
}

export const DocumentButton = observer((props: IProps) => {
  const { doc, download } = props;

  if (!doc) return null;

  const documentType = doc.documentType.name;

  const iconLink = <OpenInNewIcon />;
  const iconVideo = <OndemandVideoIcon />;
  const iconFile = <FileDownloadIcon />;

  const handleOpenLink = async () => {
    if (doc) {
      const a = document.createElement('a');
      a.href = doc.url;
      a.target = '_blank';
      a.click();
    }
  };
  const handleDownload = async () => {
    if (doc) await download(doc.file.id, doc.file.name);
  };

  const buttonProps: IButtonProps = {
    size: 'medium',
    variant: 'outlined',
  };
  const titleOpenLink = 'Open link in new tab';
  const titleDownload = 'download file';

  if (documentType === 'link') {
    return (
      <FormField title={titleOpenLink}>
        <Button {...buttonProps} onClick={handleOpenLink} startIcon={iconLink}>
          {doc.url}
        </Button>
      </FormField>
    );
  }
  if (documentType === 'video') {
    if (doc.file) {
      return (
        <FormField title={titleDownload}>
          <Button
            {...buttonProps}
            onClick={handleDownload}
            startIcon={iconFile}
          >
            {doc.file.name}
          </Button>
        </FormField>
      );
    } else {
      return (
        <FormField title={titleOpenLink}>
          <Button
            {...buttonProps}
            onClick={handleOpenLink}
            startIcon={iconVideo}
          >
            {doc.url}
          </Button>
        </FormField>
      );
    }
  }
  if (documentType === 'file' && doc.file) {
    return (
      <FormField title={titleDownload}>
        <Button {...buttonProps} onClick={handleDownload} startIcon={iconFile}>
          {doc.file.name}
        </Button>
      </FormField>
    );
  }

  return null;
});
