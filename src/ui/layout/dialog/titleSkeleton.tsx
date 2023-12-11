import { Box, Skeleton, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { BtnMore } from '@ui/layout/list/btnMore';

interface IProps {
  onClose?: () => void;
}

export const TypographyTitleName = styled(Typography)(() => ({
  fontWeight: 600,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}));
export const TypographyTitleId = styled(Typography)(({ theme }) => ({
  fontSize: '0.85rem',
  color: theme.palette.fGrey[200],
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}));

export const TitleSkeleton = (props: IProps) => {
  const { onClose } = props;
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography fontWeight={600} fontSize="1.1rem">
          <Skeleton width={200} />
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box flexGrow={0}>
          <Skeleton variant="rounded" width={40} height={40} />
        </Box>
        <Stack spacing={1} flexGrow={1}>
          <TypographyTitleName>
            <Skeleton width={200} />
          </TypographyTitleName>
          <TypographyTitleId>
            <Skeleton width={150} />
          </TypographyTitleId>
        </Stack>
        <Stack direction="row" spacing={2} flexGrow={0} alignItems="center">
          <BtnMore disabled />
        </Stack>
      </Stack>
    </Stack>
  );
};
