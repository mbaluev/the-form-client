import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import React from 'react';
import { IDocumentDTO } from '@model/common/document';

export const documentButtonValueGetter = (
  doc: IDocumentDTO,
  setPreventClick: React.Dispatch<React.SetStateAction<boolean>>,
  download: (id: string, name: string) => Promise<void>,
  callback?: () => Promise<void>
) => {
  const documentType = doc.documentType.name;
  const iconLink = <OpenInNewIcon />;
  const iconVideo = <OndemandVideoIcon />;
  const iconFile = <FileDownloadIcon />;
  const onClickLink = async () => {
    setPreventClick(true);
    const a = document.createElement('a');
    a.href = doc.url;
    a.target = '_blank';
    a.click();
    if (callback) await callback();
  };
  const onClickFile = async () => {
    setPreventClick(true);
    await download(doc.file?.id, doc.file?.name);
    if (callback) await callback();
  };
  if (documentType === 'link') {
    return {
      size: 'small',
      onClick: onClickLink,
      variant: 'text',
      endIcon: iconLink,
      children: doc.url,
      style: { maxWidth: 200 },
    };
  }
  if (documentType === 'video') {
    return {
      size: 'small',
      onClick: onClickLink,
      variant: 'text',
      endIcon: iconVideo,
      children: doc.url,
      style: { maxWidth: 200 },
    };
  }
  if (documentType === 'file') {
    return {
      size: 'small',
      onClick: onClickFile,
      variant: 'text',
      endIcon: iconFile,
      children: doc.file?.name,
      style: { maxWidth: 200 },
    };
  }
};
