import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { IMaterialUserViewModel } from '@viewModel/modules/material/user/interface';
import { Form, FormField, FormSection } from '@components/form';
import { TextFieldControl } from '@components/fields';
import { Button } from '@components/button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export const MaterialTabs = observer(() => {
  const { data: material, download } = useViewModel<IMaterialUserViewModel>(
    VIEW_MODEL.MaterialUser
  );

  const handleDownload = async () => {
    if (material)
      await download(
        material.document.file.id,
        material.document.file.name,
        material.id,
        material.blockId
      );
  };

  return (
    <Form cols={1}>
      <FormSection>
        <FormField>
          <Button
            size="medium"
            onClick={handleDownload}
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            sx={{ width: 'fit-content !important' }}
          >
            {material?.document.file.name}
          </Button>
        </FormField>
        <FormField title="Description">
          <TextFieldControl
            name="document.description"
            multiline
            minRows={5}
            value={material?.document?.description}
            isEdit={false}
            heightAuto
          />
        </FormField>
      </FormSection>
    </Form>
  );
});
