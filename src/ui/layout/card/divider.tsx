import Divider from '@mui/material/Divider';
import { SxProps } from '@mui/system';

interface IProps {
  sx?: SxProps;
}

export const TitleDivider = (props: IProps) => {
  const { sx } = props;
  return (
    <Divider
      sx={{
        borderWidth: 1,
        width: '100vw !important',
        marginLeft: '50% !important',
        transform: 'translate(-50%, 0px) !important',
        ...sx,
      }}
    />
  );
};

export const TitleDividerShort = (props: IProps) => {
  const { sx } = props;
  return <Divider sx={{ borderWidth: 1, ...sx }} />;
};
