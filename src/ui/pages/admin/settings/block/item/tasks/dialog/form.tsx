import { observer } from 'mobx-react';
import { FormField } from '@components/form/field';
import { Grid } from '@mui/material';
import { SelectSearch } from '@ui/fields/selectSearch';
import { useBlockListStore } from '@store/modules/entities/block/list/useBlockListStore';
import { useOptionStore } from '@store/modules/common/option/useOptionStore';
import { SelectSearchAsync } from '@ui/fields/selectSearchAsync';
import { Input } from '@ui/fields/input';

export const Form = observer(() => {
  const { dataItems: blocksItems } = useBlockListStore();
  const { getDocumentTypes } = useOptionStore();
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
        <FormField title="Material type">
          <SelectSearchAsync
            name="document.documentTypeId"
            loadItems={getDocumentTypes}
            rules={{ required }}
            highlightValue
            required
          />
        </FormField>
      </Grid>
      <Grid item xs={12}>
        <FormField title="Name">
          <Input name="document.name" rules={{ required }} required multiline minRows={5} />
        </FormField>
      </Grid>
    </Grid>
  );
});
