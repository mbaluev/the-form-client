import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IQuestionUserDTO } from '@model/entities/question';
import { TagQuestion } from '@ui/components/tag/tagQuestion';

interface IProps {
  userQuestion?: IQuestionUserDTO | null;
}

export const SubTitleQuestion = observer((props: IProps) => {
  const { userQuestion } = props;
  return (
    <Stack direction="row" spacing={2}>
      <TagQuestion userQuestion={userQuestion} />
    </Stack>
  );
});
