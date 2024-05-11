import { observer } from 'mobx-react';
import { Stack, Typography } from '@mui/material';
import { IconQuestion } from '@ui/components/icon/iconQuestion';
import { IQuestionUserDTO } from '@model/entities/question';
import { PageIcon } from '@ui/layout/page/pageIcon';
import { IconTest } from '@ui/components/icon/iconTest';

interface IProps {
  userQuestion?: IQuestionUserDTO | null;
}

export const TitleQuestion = observer((props: IProps) => {
  const { userQuestion } = props;
  const title = userQuestion?.question?.title;
  if (!userQuestion) return null;
  return (
    <Stack direction="row" spacing={2}>
      <PageIcon>
        <IconQuestion userQuestion={userQuestion} />
      </PageIcon>
      <PageIcon>
        <IconTest item={userQuestion.question} />
      </PageIcon>
      <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '24px' }}>
        {title}
      </Typography>
    </Stack>
  );
});
