import { Container, Divider, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface IProps {
  code: string;
  description: string;
}

export const ErrorPage = (props: IProps) => {
  const { code, description } = props;
  const theme = useTheme();
  return (
    <Stack alignItems="center" marginTop={30}>
      <Container maxWidth="sm">
        <Stack flex="1 1 auto" alignItems="center" spacing={3}>
          <Typography fontSize="5rem" lineHeight="5rem" color={theme.palette.error.main}>
            {code}
          </Typography>
          <Divider sx={{ width: '100%', borderColor: theme.palette.error.main }} />
          <Typography fontWeight={600} lineHeight="1rem" color={theme.palette.error.main}>
            {description}
          </Typography>
        </Stack>
      </Container>
    </Stack>
  );
};
