import React, { FC, useCallback } from 'react';
import { classNames } from '@utils/classNames';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Tooltip } from '@components/tooltip';
import DoneIcon from '@mui/icons-material/Done';
import fileSize from 'filesize';
import { FormControl, FormHelperText } from '@mui/material';
import { IFileDTO } from '@model/file';
import { Button } from '@components/button';
import { observer } from 'mobx-react';
import './index.scss';

interface IAttachmentFileProps {
  name: string;
  size: number;
  onDownload?: () => void;
}
const AttachmentFile = observer((props: IAttachmentFileProps) => {
  const { name, size, onDownload } = props;
  return (
    <div className="attachment-file">
      <div className="attachment-file__icon">
        <DoneIcon className="color_green-dark" />
      </div>
      <div className="attachment-file__name">
        <Button size="small" variant="text" onClick={onDownload}>
          {name}
        </Button>
      </div>
      {size && <div className="attachment-file__size">{fileSize(size)}</div>}
    </div>
  );
});

interface IProps {
  name?: string;
  className?: string;
  loading?: boolean;
  onUpload?: (files: File[], name?: string) => void;
  onDownload?: (id: string, filename: string) => void;
  options?: DropzoneOptions;
  tooltip?: string;
  text?: string;
  error?: boolean;
  helperText?: string;
  files?: IFileDTO[];
}
export const Attachment: FC<IProps> = (props) => {
  const {
    name,
    className,
    loading,
    onUpload,
    onDownload,
    options,
    tooltip,
    text = "Drag 'n' drop some files here, or click to select files",
    error,
    helperText,
    files,
  } = props;

  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      if (onUpload) {
        onUpload(acceptedFiles, name);
      }
    },
    [onUpload]
  );
  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      onDrop,
      disabled: loading,
      ...options,
    });

  const cls = classNames('attachment', className, {
    attachment_error: Boolean(error),
  });
  const clsZone = classNames('attachment-zone', {
    'attachment-zone_active': isDragActive,
    'attachment-zone_disabled': Boolean(loading),
  });
  const clsZoneText = classNames('attachment-zone__text');
  const clsFiles = classNames('attachment-files');

  const AcceptedFiles = () => {
    return (
      <div className={clsFiles}>
        {acceptedFiles?.map((file, index) => (
          <AttachmentFile key={index} name={file.name} size={file.size} />
        ))}
      </div>
    );
  };
  const Files = () => {
    if (!files) return null;
    return (
      <div className={clsFiles}>
        {files?.map((file, index) => {
          const downloadHandler = () => {
            if (onDownload) onDownload(file.id, file.name);
          };
          return (
            <AttachmentFile
              key={index}
              name={file.name}
              size={file.size}
              onDownload={downloadHandler}
            />
          );
        })}
      </div>
    );
  };

  return (
    <FormControl variant="outlined" className="field-control">
      <div className={cls}>
        {tooltip ? (
          <Tooltip title={tooltip}>
            <div className={clsZone} {...getRootProps()}>
              <AttachFileIcon />
              <div className={clsZoneText}>{text}</div>
              <input {...getInputProps()} />
            </div>
          </Tooltip>
        ) : (
          <div className={clsZone} {...getRootProps()}>
            <AttachFileIcon />
            <div className={clsZoneText}>{text}</div>
            <input {...getInputProps()} />
          </div>
        )}
        <Files />
      </div>
      {helperText && (
        <FormHelperText error={!!error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
