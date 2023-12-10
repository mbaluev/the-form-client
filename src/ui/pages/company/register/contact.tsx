import { FormSection } from '@components/form/section';
import { Grid } from '@mui/material';
import { FormField } from '@components/form/field';
import { useTranslation } from 'next-i18next';
import { Input } from '@ui/layout/fields/input';

const required = 'common:validation-required';

export const Contact = () => {
  const { t } = useTranslation('company');
  const spacing = 4;
  return (
    <FormSection title={t('title-contact')}>
      <Grid container spacing={spacing}>
        <Grid item xs={6}>
          <FormField title={t('field-firstname')} required>
            <Input
              name="contactFirstName"
              rules={{ required: t(required) }}
              required
            />
          </FormField>
        </Grid>
        <Grid item xs={6}>
          <FormField title={t('field-lastname')} required>
            <Input
              name="contactLastName"
              rules={{ required: t(required) }}
              required
            />
          </FormField>
        </Grid>
        <Grid item xs={6}>
          <FormField title={t('field-email')} required>
            <Input
              name="contactEmail"
              rules={{ required: t(required) }}
              required
            />
          </FormField>
        </Grid>
        <Grid item xs={6}>
          <FormField title={t('field-phone')} required>
            <Input
              name="contactPhone"
              rules={{ required: t(required) }}
              required
            />
          </FormField>
        </Grid>
      </Grid>
    </FormSection>
  );
};
