import { Grid, Stack } from '@mui/material';
import { FieldName } from '@ui/layout/card/fieldName';
import { observer } from 'mobx-react';
import { Tag } from '@components/tag';
import { ITenantItemDTO } from '@model/onboard/tenant';

interface IProps {
  item: ITenantItemDTO;
}

export const Item = observer((props: IProps) => {
  const { item } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <FieldName title={item.displayName}>{item.id}</FieldName>
      </Grid>
      <Grid
        item
        xs={4}
        container
        justifyContent="flex-end"
        alignItems="flex-start"
      >
        <Stack direction="row" spacing={2}>
          <Tag tag={item.tenantStatus} />
        </Stack>
      </Grid>
    </Grid>
  );
});
