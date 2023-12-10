import { observer } from 'mobx-react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { TitleSkeleton } from '@ui/layout/card/titleSkeleton';
import { useTranslation } from 'next-i18next';
import { CardAvatar } from '@ui/layout/card/avatar';
import { useCompanyViewStore } from '@store/modules/onboard/company/view/useCompanyViewStore';
import { Tag } from '@components/tag';

export const Title = observer(() => {
  const { t } = useTranslation('company');
  const { isLoading, company } = useCompanyViewStore();

  if (isLoading) return <TitleSkeleton />;
  if (!company) return null;

  return (
    <Stack direction="row" alignItems="center" spacing={3}>
      <CardAvatar name={company.name} />
      <Stack spacing={2}>
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
          {company.name || t('common:filter-not-found')}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <Tag tag={`${company.contactFirstName} ${company.contactLastName}`} />
          <Tag tag={company.contactEmail} />
          <Tag tag={company.contactPhone} />
        </Stack>
      </Stack>
    </Stack>
  );
});
