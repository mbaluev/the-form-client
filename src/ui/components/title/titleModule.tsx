import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IModuleUserDTO } from '@model/entities/module';
import { IconModule } from '@ui/components/icon/iconModule';
import { PageIcon } from '@ui/layout/page/pageIcon';
import Typography from '@mui/material/Typography';

interface IProps {
  userModule?: IModuleUserDTO | null;
}

export const TitleModule = observer((props: IProps) => {
  const { userModule } = props;
  const name = userModule?.module?.name;
  return (
    <Stack direction="row" spacing={2}>
      <PageIcon>
        <IconModule userModule={userModule} />
      </PageIcon>
      <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '24px' }}>
        {name}
      </Typography>
    </Stack>
  );
});
