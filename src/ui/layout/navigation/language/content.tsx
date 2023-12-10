import Link from 'next/link';
import Stack from '@mui/material/Stack';
import { FormSection } from '@components/form/section';
import { LanguageLink } from '@ui/layout/navigation/language/styled';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { useLocaleStore } from '@store/modules/common/locale/useLocaleStore';
import { classNames } from '@utils/classNames';
import classes from './index.module.scss';
import { Title } from '@ui/layout/navigation/language/title';
import { useLanguageStore } from '@store/modules/common/language/useLanguageStore';
import { Box, Grid } from '@mui/material';

export interface IProps {
  onClose: () => void;
}

export const Content = observer((props: IProps) => {
  const { onClose } = props;
  const handleClose = () => onClose();

  const router = useRouter();
  const { pathname, query } = router;
  const { country } = useLocaleStore();
  const { languages } = useLanguageStore();

  return (
    <Stack spacing={4} sx={{ pt: 4, pb: 5 }}>
      <Title onClose={handleClose} />
      <Box>
        <Grid container spacing={5}>
          {languages?.map((region, i) => (
            <Grid key={i} item xs={2}>
              <FormSection style={{ gap: 10 }} title={region.title}>
                <Stack spacing={1}>
                  {region.items.map((item, k) => {
                    const active = country === item.code;
                    const cls = classNames(classes.field, {
                      [classes.field_active]: active,
                    });
                    return (
                      <div key={k} className={cls}>
                        <div className={classes.field_title}>{item.title}</div>
                        <Stack direction="row" spacing={2}>
                          {item.languages.map((lang) => {
                            const langLocale = `${lang.code}-${item.code}`;
                            return (
                              <Link
                                key={lang.code}
                                href={{ pathname, query }}
                                locale={langLocale}
                                onClick={handleClose}
                              >
                                <LanguageLink>{lang.title}</LanguageLink>
                              </Link>
                            );
                          })}
                        </Stack>
                      </div>
                    );
                  })}
                </Stack>
              </FormSection>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
});
