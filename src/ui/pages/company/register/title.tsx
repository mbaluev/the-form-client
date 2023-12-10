import { observer } from 'mobx-react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { CardAvatar } from '@ui/layout/card/avatar';
import { useFormContext, useWatch } from 'react-hook-form';
import { ICompanyViewDTO } from '@model/onboard/company';
import { Tag } from '@components/tag';

export const Title = observer(() => {
  const { t } = useTranslation('company');
  const { control } = useFormContext<ICompanyViewDTO>();
  const name = useWatch({ control, name: 'name' });
  const firstname = useWatch({ control, name: 'contactFirstName' });
  const lastname = useWatch({ control, name: 'contactLastName' });
  const email = useWatch({ control, name: 'contactEmail' });
  const phone = useWatch({ control, name: 'contactPhone' });

  return (
    <Stack direction="row" alignItems="center" spacing={3}>
      <CardAvatar name={name} />
      <Stack spacing={2}>
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
          {name || t('new-company')}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          {!firstname && !lastname && !email && !phone && '-'}
          {(firstname || lastname) && (
            <Tag
              tag={`${firstname ? firstname + ' ' : ''}${
                lastname ? lastname : ''
              }`}
            />
          )}
          {email && <Tag tag={email} />}
          {phone && <Tag tag={phone} />}
        </Stack>
      </Stack>
    </Stack>
  );
});
