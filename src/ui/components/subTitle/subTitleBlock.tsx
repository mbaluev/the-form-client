import { observer } from 'mobx-react';
import { TagBlock } from '@ui/components/tag/tagBlock';
import { IBlockUserDTO } from '@model/entities/block';
import { Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const SubTitleBlock = observer((props: IProps) => {
  const { userBlock } = props;
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={2}>
      <TagBlock userBlock={userBlock} />
      <Typography
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
        fontWeight={600}
        color={theme.palette.fGrey[100]}
      >
        {userBlock?.block?.title}
      </Typography>
    </Stack>
  );
});
