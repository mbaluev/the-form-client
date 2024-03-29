import { useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Panel } from '@ui/layout/page/panel';
import { SeparatorBase } from '@ui/layout/card/separator';

interface IProps {
  code: string;
  description: string;
}

export const ErrorCode = (props: IProps) => {
  const { code, description } = props;
  const theme = useTheme();
  return (
    <Panel height="100%">
      <Stack alignItems="center" spacing={4} paddingTop={20}>
        <Typography fontSize="5rem" lineHeight="5rem" color={theme.palette.error.main}>
          {code}
        </Typography>
        <SeparatorBase sx={{ width: 300, borderColor: theme.palette.error.main }} />
        <Typography fontWeight={600} lineHeight="1rem" color={theme.palette.error.main}>
          {description}
        </Typography>
      </Stack>
    </Panel>
  );
};
