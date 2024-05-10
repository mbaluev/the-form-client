import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IconQuestion } from '@ui/components/icon/iconQuestion';
import { IQuestionUserDTO } from '@model/entities/question';

interface IProps {
  userQuestion?: IQuestionUserDTO | null;
}

export const TitleQuestion = observer((props: IProps) => {
  const { userQuestion } = props;
  const position = userQuestion?.question?.position;
  return (
    <Stack direction="row" spacing={2}>
      <IconQuestion userQuestion={userQuestion} />
      {position ? <div>{`Question #${position}`}</div> : undefined}
    </Stack>
  );
});
