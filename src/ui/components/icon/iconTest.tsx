import { Avatar as MuiAvatar, useTheme } from '@mui/material';
import { IQuestionDTO } from '@model/entities/question';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';

interface IProps {
  item?: IQuestionDTO;
}

export const IconTest = (props: IProps) => {
  const { item } = props;
  const theme = useTheme();
  if (!item) return null;

  const sxAvatar = { backgroundColor: theme.palette.fGrey['10'] };
  const sxIcon = { color: theme.palette.fGrey['100'] };
  return (
    <MuiAvatar variant="rounded" sx={sxAvatar}>
      <QuizOutlinedIcon fontSize="large" sx={sxIcon} />
    </MuiAvatar>
  );
};
