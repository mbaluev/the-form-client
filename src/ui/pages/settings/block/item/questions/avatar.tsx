import { Avatar as MuiAvatar, useTheme } from '@mui/material';
import { IQuestionDTO } from '@model/entities/question';
import Typography from '@mui/material/Typography';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

interface IProps {
  item?: IQuestionDTO;
}

export const Avatar = (props: IProps) => {
  const theme = useTheme();
  const { item } = props;
  if (!item) return null;

  return (
    <MuiAvatar variant="rounded" sx={{ backgroundColor: theme.palette.fGrey['10'] }}>
      {item ? (
        <Typography color={theme.palette.fGrey['100']} fontWeight={600}>
          {item.position}
        </Typography>
      ) : (
        <DoDisturbIcon sx={{ color: theme.palette.fGrey['100'] }} fontSize="large" />
      )}
    </MuiAvatar>
  );
};
