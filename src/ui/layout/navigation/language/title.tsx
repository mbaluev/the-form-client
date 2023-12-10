import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { LanguageText } from '@ui/layout/navigation/language/styled';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { observer } from 'mobx-react';
import { useLocaleStore } from '@store/modules/common/locale/useLocaleStore';
import { useTranslation } from 'next-i18next';

interface IProps {
  onClose: () => void;
}

export const Title = observer((props: IProps) => {
  const { onClose } = props;
  const { countryName, languageName } = useLocaleStore();
  const { t } = useTranslation();
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <Stack spacing={1}>
        <Typography fontWeight={600} fontSize="1.2rem">
          {t('menu:lang-change-language')}
        </Typography>
        <LanguageText>{`${countryName} - ${languageName}`}</LanguageText>
      </Stack>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
});
