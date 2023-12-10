import { FormSection } from '@components/form/section';
import { Grid, InputAdornment } from '@mui/material';
import { FormField } from '@components/form/field';
import { useTranslation } from 'next-i18next';
import { Input } from '@ui/layout/fields/input';
import { useFormContext } from 'react-hook-form';
import { ICompanyRegisterDTO } from '@model/onboard/company';
import Loader from '@components/loader';
import { useCompanyRegisterStore } from '@store/modules/onboard/company/register/useCompanyRegisterStore';
import { observer } from 'mobx-react';

const required = 'common:validation-required';

export const General = observer(() => {
  const { t } = useTranslation('company');
  const spacing = 4;
  const { validateDomain } = useCompanyRegisterStore();
  const {
    formState: { isValidating },
  } = useFormContext<ICompanyRegisterDTO>();

  const handleValidateDomain = async (value: string) => {
    const res = await validateDomain(value);
    return res?.isDomainAvailable || res?.errorMessage;
  };

  return (
    <FormSection title={t('title-general')}>
      <Grid container spacing={spacing}>
        <Grid item xs={6}>
          <FormField title={t('field-name')} required>
            <Input name="name" rules={{ required: t(required) }} required />
          </FormField>
        </Grid>
        <Grid item xs={6}>
          <FormField title={t('field-domain')} required>
            <Input
              name="domain"
              rules={{ required: t(required), validate: handleValidateDomain }}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Loader relative loading={isValidating} size={20} />
                  </InputAdornment>
                ),
              }}
            />
          </FormField>
        </Grid>
        <Grid item xs={6}>
          <FormField title={t('field-address-line-1')} required>
            <Input
              name="addressLine1"
              rules={{ required: t(required) }}
              required
            />
          </FormField>
        </Grid>
        <Grid item xs={6}>
          <FormField title={t('field-address-line-2')}>
            <Input name="addressLine2" />
          </FormField>
        </Grid>
      </Grid>
    </FormSection>
  );
});
