import { Button, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useDropzone } from 'react-dropzone';
import Typography from '@mui/material/Typography';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useMemo } from 'react';
import { observer } from 'mobx-react';
import { filesize } from 'filesize';
import { Root } from '@ui/components/file/root';
import { IFileDTO } from '@model/common/file';
import { useFileStore } from '@store/modules/common/file/useFileStore';
import DownloadIcon from '@mui/icons-material/Download';

interface IProps {
  file?: IFileDTO;
  onSuccess?: (file: IFileDTO) => void;
}

export const File = observer((props: IProps) => {
  const { file, onSuccess } = props;
  const theme = useTheme();
  const { isLoading, upload, download } = useFileStore();

  const onDrop = async (acceptedFiles: Array<File>) => {
    const newFile = await upload(acceptedFiles[0]);
    if (newFile && onSuccess) onSuccess(newFile);
  };
  const { getRootProps, getInputProps, isDragAccept, isDragReject, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    disabled: isLoading,
  });

  const activeStyle = { borderColor: theme.palette.primary.main };
  const style = useMemo(
    () => ({ ...(isDragActive ? activeStyle : {}) }),
    [isDragAccept, isDragReject]
  );

  const handleDownload = async () => {
    if (file) await download(file);
  };

  return (
    <Stack spacing={2}>
      <Root {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack alignItems="center" justifyContent="center" width={20} height={20}>
            <AttachFileIcon sx={{ color: theme.palette.fGrey['100'] }} />
          </Stack>
          <Typography color={theme.palette.fGrey['100']} fontWeight={600}>
            Drag 'n' drop or click to select a file
          </Typography>
        </Stack>
      </Root>
      {file && (
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Button onClick={handleDownload} startIcon={<DownloadIcon />}>
            {file.name}
          </Button>
          <Typography color={theme.palette.fGrey['100']}>{filesize(file.size)}</Typography>
        </Stack>
      )}
    </Stack>
  );
});
