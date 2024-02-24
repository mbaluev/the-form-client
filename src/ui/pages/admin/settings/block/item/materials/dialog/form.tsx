import { useMemo } from 'react';
import { observer } from 'mobx-react';
import { FormField } from '@components/form/field';
import { Grid } from '@mui/material';
import { SelectSearch } from '@ui/fields/selectSearch';
import { useBlockSettingsListStore } from '@store/modules/settings/block/settings/list/hook';
import { useOptionStore } from '@store/modules/common/option/useOptionStore';
import { SelectSearchAsync } from '@ui/fields/selectSearchAsync';
import { useFormContext, useWatch } from 'react-hook-form';
import { IMaterialDTO } from '@model/entities/material';
import { Input } from '@ui/fields/input';
import { File } from '@ui/components/file';
import { IFileDTO } from '@model/common/file';

export const Form = observer(() => {
  const { dataItems: blocksItems } = useBlockSettingsListStore();
  const { documentTypes, getDocumentTypes } = useOptionStore();
  const required = 'required';
  const spacing = 3;

  const { control, setValue } = useFormContext<IMaterialDTO>();
  const documentTypeId = useWatch({ control, name: 'document.documentTypeId' });
  const documentTypeName = useMemo(
    () => documentTypes?.find((d) => d.value === documentTypeId)?.label,
    [documentTypeId, documentTypes]
  );

  const file = useWatch({ control, name: 'document.file' });
  const handleSuccess = (newFile: IFileDTO) => {
    setValue('document.file', newFile, { shouldDirty: true });
    setValue('document.fileId', newFile.id, { shouldDirty: true });
  };

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
            <File onSuccess={handleSuccess} file={file} />
          </FormField>
        )}
      </Grid>
    </Grid>
  );
});
