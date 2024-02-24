import { Grid } from '@mui/material';
import { observer } from 'mobx-react';
import { FormField } from '@components/form/field';
import { SelectSearch } from '@ui/fields/selectSearch';
import { useBlockListStore } from '@store/modules/entities/block/list/useBlockListStore';
import { Options } from '@ui/pages/admin/settings/block/item/questions/dialog/options';
import { Input } from '@ui/fields/input';
import { Count } from '@ui/fields/counter';

export const Form = observer(() => {
  const { dataItems: blocksItems } = useBlockListStore();
  const required = 'required';
  const spacing = 3;

  return (
    <Grid container spacing={spacing} alignItems="flex-start">
      <Grid item xs={6}>
        <FormField title="Block">
          <SelectSearch name="blockId" items={blocksItems} disabled />
        </FormField>
      </Grid>
      <Grid item xs={6}>
        <FormField title="Position">
          <Count name="position" rules={{ required }} />
        </FormField>
      </Grid>
      <Grid item xs={12}>
        <FormField title="Title">
          <Input name="title" rules={{ required }} required multiline minRows={5} />
        </FormField>
      </Grid>
      <Grid item xs={12}>
        <FormField title="Question options">
          <Options />
        </FormField>
      </Grid>
    </Grid>
  );
});
