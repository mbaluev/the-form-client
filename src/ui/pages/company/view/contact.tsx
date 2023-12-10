import { FormSection } from '@components/form/section';
import { Grid } from '@mui/material';
import { FormField } from '@components/form/field';
import { useTranslation } from 'next-i18next';
import { observer } from 'mobx-react';
import { useCompanyViewStore } from '@store/modules/onboard/company/view/useCompanyViewStore';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';

export const Contact = observer(() => {
  const { t } = useTranslation('company');
  const { isLoading, company } = useCompanyViewStore();
  const spacing = 4;

  if (isLoading) return <TabSkeleton />;
  if (!company) return null;

  return (
    <FormSection title={t('title-contact')}>
      <Grid container spacing={spacing}>
        <Grid item xs={6}>
          <FormField title={t('field-firstname')}>
            {company.contactFirstName}
          </FormField>
        </Grid>
        <Grid item xs={6}>
          <FormField title={t('field-lastname')}>
            {company.contactLastName}
          </FormField>
        </Grid>
        <Grid item xs={6}>
          <FormField title={t('field-email')}>{company.contactEmail}</FormField>
        </Grid>
        <Grid item xs={6}>
          <FormField title={t('field-phone')}>{company.contactPhone}</FormField>
        </Grid>
      </Grid>
    </FormSection>
  );
});
