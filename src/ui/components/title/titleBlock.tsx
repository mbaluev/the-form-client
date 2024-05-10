import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IBlockUserDTO } from '@model/entities/block';
import { IconBlock } from '@ui/components/icon/iconBlock';
import { PageIcon } from '@ui/layout/page/pageIcon';
import Typography from '@mui/material/Typography';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const TitleBlock = observer((props: IProps) => {
  const { userBlock } = props;
  const name = userBlock?.block?.name;
  return (
    <Stack direction="row" spacing={2}>
      <PageIcon>
        <IconBlock userBlock={userBlock} />
      </PageIcon>
      <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '24px' }}>
        {name}
      </Typography>
    </Stack>
  );
});
