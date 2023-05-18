import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Form, FormField, FormSection } from '@components/form';
import { TextFieldControl } from '@components/fields';
import { Button, TButtonColorTypes } from '@components/button';
import { ITaskUserViewModel } from '@viewModel/modules/task/user/interface';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useLocale } from '@hooks/useLocale';
import { useAuth } from '@hooks/useAuth';
import { NoData } from '@components/noData';

export const TabDetails = observer(() => {
  const { id } = useAuth();
  const { fDateTime } = useLocale();
  const { data, download } = useViewModel<ITaskUserViewModel>(
    VIEW_MODEL.TaskUser
  );

  if (!data || !data.documentLatest) return <NoData />;

  const latestUser = data.documentLatest.user;
  const latestDate = data.documentLatest.date;
  const latestDocument = data.documentLatest.document;
  let latestColor = 'blue' as TButtonColorTypes;
  if (latestUser) latestColor = latestUser.id !== id ? 'green' : 'blue';

  const userName = `${latestUser?.firstname} ${latestUser?.lastname}`;
  const date = latestDate ? fDateTime(new Date(latestDate)) : undefined;
  const title = Boolean(latestUser) ? `${userName}, ${date}` : undefined;

  const handleDownload = async () => {
    await download(latestDocument.file.id, latestDocument.file.name);
  };

  return (
    <Form cols={1}>
      <FormSection>
        {title && <FormField title="Updated By">{title}</FormField>}
        <FormField>
          <Button
            size="medium"
            onClick={handleDownload}
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            sx={{ width: 'fit-content !important' }}
            color={latestColor}
          >
            {latestDocument.file.name}
          </Button>
        </FormField>
        <FormField title="Description">
          <TextFieldControl
            name="document.description"
            multiline
            minRows={5}
            value={latestDocument.description}
            isEdit={false}
            heightAuto
          />
        </FormField>
      </FormSection>
    </Form>
  );
});
