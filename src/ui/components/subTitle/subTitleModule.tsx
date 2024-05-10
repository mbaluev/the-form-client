import { observer } from 'mobx-react';
import { IModuleUserDTO } from '@model/entities/module';
import { Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { TagModule } from '@ui/components/tag/tagModule';

interface IProps {
  userModule?: IModuleUserDTO | null;
}

export const SubTitleModule = observer((props: IProps) => {
  const { userModule } = props;
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={2}>
      <TagModule userModule={userModule} />
      <Typography
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
        fontWeight={600}
        color={theme.palette.fGrey[100]}
      >
        {userModule?.module?.title}
      </Typography>
    </Stack>
  );
});
