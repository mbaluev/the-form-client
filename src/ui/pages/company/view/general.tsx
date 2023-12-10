import { FormSection } from '@components/form/section';
import { Grid } from '@mui/material';
import { FormField } from '@components/form/field';
import { useTranslation } from 'next-i18next';
import { observer } from 'mobx-react';
import { useCompanyViewStore } from '@store/modules/onboard/company/view/useCompanyViewStore';
import { TabSkeleton } from '@ui/layout/card/tabSkeleton';

export const General = observer(() => {
  const { t } = useTranslation('company');
  const { isLoading, company } = useCompanyViewStore();
  const spacing = 4;

  if (isLoading) return <TabSkeleton />;
  if (!company) return null;

  return (
    <FormSection title={t('title-general')}>
      <Grid container spacing={spacing}>
        <Grid item xs={6}>
          <FormField title={t('field-name')}>{company.name}</FormField>
        </Grid>
        <Grid item xs={6}>
          <FormField title={t('field-domain')}>{company.domain}</FormField>
        </Grid>
        <Grid item xs={6}>
          <FormField title={t('field-address-line-1')}>
            {company.addressLine1}
          </FormField>
        </Grid>
        <Grid item xs={6}>
          <FormField title={t('field-address-line-2')}>
            {company.addressLine2}
          </FormField>
        </Grid>
      </Grid>
    </FormSection>
  );
});
