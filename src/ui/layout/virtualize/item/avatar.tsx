import Typography from '@mui/material/Typography';
import { FirstLetters } from '@utils/ui/firstLetters';
import { Avatar as MuiAvatar, useTheme } from '@mui/material';

interface IProps {
  name?: string | null;
  img?: string | null;
}

export const VirtualizeAvatar = (props: IProps) => {
  const theme = useTheme();
  const { name, img } = props;

  if (!img) {
    return (
      <MuiAvatar
        variant="rounded"
        sx={{ backgroundColor: theme.palette.t1Grey['20'] }}
      >
        <Typography
          fontSize="0.9rem"
          fontWeight={600}
          color={theme.palette.t1Grey['130']}
        >
          <FirstLetters name={name} />
        </Typography>
      </MuiAvatar>
    );
  }

  return (
    <MuiAvatar
      variant="rounded"
      sx={{ backgroundColor: theme.palette.t1Grey['20'] }}
      src={img}
    />
  );
};
