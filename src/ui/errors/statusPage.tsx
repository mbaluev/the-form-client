import { cloneElement, ReactElement } from 'react';
import { observer } from 'mobx-react';
import IconDone from '@components/svg/icons/components/done';
import IconError from '@components/svg/icons/components/error';
import Stack, { StackProps } from '@mui/material/Stack';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';

interface IProps {
  status?: 'success' | 'error';
  message?: ReactElement | string;
  buttons?: ReactElement[];
  buttonsDirection?: StackProps['direction'];
}

export const StatusPage = observer((props: IProps) => {
  const { t } = useTranslation();

  const { status = 'error', message, buttons, buttonsDirection = 'row' } = props;

  const Icon = () => {
    if (status === 'success') return <IconDone sx={{ fontSize: '6rem' }} />;
    if (status === 'error') return <IconError sx={{ fontSize: '6rem' }} />;
    return null;
  };
  const Title = () => {
    if (status === 'success')
      return (
        <Typography fontSize="1.7rem" fontWeight={600} textAlign="center">
          {t('common:error-thank-you')}
        </Typography>
      );
    if (status === 'error')
      return (
        <Typography fontSize="1.7rem" fontWeight={600} textAlign="center">
          {t('common:error-oh-no')}
        </Typography>
      );

    return null;
  };

  return (
    <Stack alignItems="center" paddingTop={20}>
      <Container maxWidth="sm">
        <Stack alignItems="center" spacing={2}>
          <Icon />
          <Title />
          {message && <Typography textAlign="center">{message}</Typography>}
          {buttons && (
            <Stack direction={buttonsDirection} spacing={3} paddingTop={2}>
              {buttons.map((button: ReactElement, index: number) =>
                cloneElement(button, { key: index })
              )}
            </Stack>
          )}
        </Stack>
      </Container>
    </Stack>
  );
});
