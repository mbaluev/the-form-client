import { Stack } from '@mui/material';
import { IQuestionUserDTO } from '@model/entities/question';
import { IconQuestion } from '@ui/components/icon/iconQuestion';
import { IconTest } from '@ui/components/icon/iconTest';

interface IProps {
  item?: IQuestionUserDTO;
}

export const Avatar = (props: IProps) => {
  const { item } = props;
  if (!item) return null;

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconQuestion userQuestion={item} />
      <IconTest item={item.question} />
    </Stack>
  );
};
