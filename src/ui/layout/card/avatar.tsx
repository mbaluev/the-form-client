import Typography from '@mui/material/Typography';
import { FirstLetters } from '@utils/ui/firstLetters';
import { Avatar as MuiAvatar, useTheme } from '@mui/material';

interface IProps {
  name?: string | null;
  img?: string | null;
}

export const CardAvatar = (props: IProps) => {
  const theme = useTheme();
  const { name, img } = props;

  if (!img) {
    return (
      <MuiAvatar
        variant="rounded"
        sx={{
          width: 60,
          height: 60,
          backgroundColor: theme.palette.fGrey['20'],
        }}
      >
        <Typography
          fontSize="1.2rem"
          fontWeight={600}
          color={theme.palette.fGrey['130']}
        >
          <FirstLetters name={name} />
        </Typography>
      </MuiAvatar>
    );
  }

  return (
    <MuiAvatar
      variant="rounded"
      sx={{ backgroundColor: theme.palette.fGrey['20'] }}
      src={img}
    />
  );
};
