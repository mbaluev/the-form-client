import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Form, FormField, FormSection } from '@components/form';
import { TextFieldControl } from '@components/fields';
import { Button } from '@components/button';
import { ITaskUserViewModel } from '@viewModel/modules/task/user/interface';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export const TaskCardContent = observer(() => {
  const { data, download } = useViewModel<ITaskUserViewModel>(
    VIEW_MODEL.TaskUser
  );

  const handleDownload = async () => {
    if (data && data.document)
      await download(data.document.file.id, data.document.file.name);
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
            {data?.document?.file.name}
          </Button>
        </FormField>
        <FormField title="Description">
          <TextFieldControl
            name="document.description"
            multiline
            minRows={5}
            value={data?.document?.description}
            isEdit={false}
            heightAuto
          />
        </FormField>
      </FormSection>
    </Form>
  );
});
