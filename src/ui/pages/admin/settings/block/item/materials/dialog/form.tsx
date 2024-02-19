import { observer } from 'mobx-react';
import { FormField } from '@components/form/field';
import { Grid } from '@mui/material';
import { SelectSearch } from '@ui/fields/selectSearch';
import { useBlockListStore } from '@store/modules/entities/block/list/useBlockListStore';
import { useOptionStore } from '@store/modules/common/option/useOptionStore';
import { SelectSearchAsync } from '@ui/fields/selectSearchAsync';
import { useFormContext, useWatch } from 'react-hook-form';
import { IMaterialDTO } from '@model/entities/material';
import { Input } from '@ui/fields/input';
import { useMemo } from 'react';

export const Form = observer(() => {
  const { data: blocks } = useBlockListStore();
  const { documentTypes, getDocumentTypes } = useOptionStore();
  const required = { required: 'required' };
  const spacing = 3;

  const { control } = useFormContext<IMaterialDTO>();
  const documentTypeId = useWatch({ control, name: 'document.documentTypeId' });
  const documentTypeName = useMemo(
    () => documentTypes?.find((d) => d.value === documentTypeId)?.label,
    [documentTypeId, documentTypes]
  );

  return (
    <Grid container spacing={spacing} alignItems="flex-start">
      <Grid item xs={12}>
        <FormField title="Block">
          <SelectSearch
            name="blockId"
            items={blocks?.map((d) => {
              return {
                value: d.id,
                label: d.title,
              };
            })}
            disabled
          />
        </FormField>
      </Grid>
      <Grid item xs={12}>
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
          <Input name="document.name" rules={{ required }} required />
        </FormField>
      </Grid>
      <Grid item xs={12}>
        <FormField title="Description">
          <Input name="document.description" rules={{ required }} required multiline minRows={5} />
        </FormField>
      </Grid>
      <Grid item xs={12}>
        {(documentTypeName === 'link' || documentTypeName === 'video') && (
          <FormField title="Link">
            <Input name="document.url" rules={{ required }} required />
          </FormField>
        )}
        {documentTypeName === 'file' && (
          <FormField title="Attachment">
            <Input name="document.fileId" rules={{ required }} required disabled />
          </FormField>
        )}
      </Grid>
    </Grid>
  );
});
