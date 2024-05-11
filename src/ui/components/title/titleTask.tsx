import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IconTask } from '@ui/components/icon/iconTask';
import { ITaskUserDTO } from '@model/entities/task';
import { PageIcon } from '@ui/layout/page/pageIcon';
import { IconDocument } from '@ui/components/icon/iconDocument';
import Typography from '@mui/material/Typography';

interface IProps {
  userTask?: ITaskUserDTO | null;
  admin?: boolean;
}

export const TitleTask = observer((props: IProps) => {
  const { userTask, admin } = props;
  const name = userTask?.task?.document?.name;
  return (
    <Stack direction="row" spacing={2}>
      <PageIcon>
        <IconTask userTask={userTask} admin={admin} />
      </PageIcon>
      <PageIcon>
        <IconDocument document={userTask?.task?.document} />
      </PageIcon>
      <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '24px' }}>
        {name}
      </Typography>
    </Stack>
  );
});
