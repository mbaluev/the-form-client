import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const LanguageText = styled(Typography)(({ theme }) => ({
  fontSize: '0.85rem',
  fontWeight: 600,
  color: theme.palette.t1Grey['150'],
  textTransform: 'capitalize',
}));

export const LanguageLink = styled(LanguageText)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.accent.main,
  },
}));
