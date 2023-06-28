import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import React from 'react';

export const documentButtonValueGetter = (
  params: any,
  setPreventClick: React.Dispatch<React.SetStateAction<boolean>>,
  download: (id: string, name: string) => Promise<void>,
  callback?: () => Promise<void>
) => {
  const documentType = params.data.document.documentType.name;
  const iconLink = <OpenInNewIcon />;
  const iconVideo = <OndemandVideoIcon />;
  const iconFile = <FileDownloadIcon />;
  const onClickLink = async () => {
    setPreventClick(true);
    const a = document.createElement('a');
    a.href = params.data.document.url;
    a.target = '_blank';
    a.click();
    if (callback) await callback();
  };
  const onClickFile = async () => {
    setPreventClick(true);
    await download(
      params.data.document.file?.id,
      params.data.document.file?.name
    );
    if (callback) await callback();
  };
  if (documentType === 'link') {
    return {
      size: 'small',
      onClick: onClickLink,
      variant: 'text',
      endIcon: iconLink,
      children: params.data.document.url,
      style: { maxWidth: 200 },
    };
  }
  if (documentType === 'video') {
    return {
      size: 'small',
      onClick: onClickLink,
      variant: 'text',
      endIcon: iconVideo,
      children: params.data.document.url,
      style: { maxWidth: 200 },
    };
  }
  if (documentType === 'file') {
    return {
      size: 'small',
      onClick: onClickFile,
      variant: 'text',
      endIcon: iconFile,
      children: params.data.document.file?.name,
      style: { maxWidth: 200 },
    };
  }
};
