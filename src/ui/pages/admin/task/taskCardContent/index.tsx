import React from 'react';
import { observer } from 'mobx-react';
import { NoData } from '@components/noData';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { Box, Divider, Stack } from '@mui/material';
import { FormField, FormSection } from '@components/form';
import { DocumentButton } from '@ui/components/documentButton';
import { useLocale } from '@hooks/useLocale';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';

export const TaskCardContent = observer(() => {
  const { data, download } = useViewModel<ITaskAdminViewModel>(
    VIEW_MODEL.TaskAdmin
  );
  const { fDateTime } = useLocale();

  if (!data?.userTaskDocuments || data?.userTaskDocuments.length === 0) {
    return (
      <NoData
        icon={<DoNotDisturbIcon />}
        message={`Homework has not been sent yet`}
      />
    );
  }

  return (
    <Stack height="100%" spacing="20px">
      <FormSection>
        <FormField title="User name">
          <Box>{data.user.username}</Box>
        </FormField>
        <FormField title="Block name">
          <Box>{data.task.block.name}</Box>
        </FormField>
        <Divider />
        <DocumentButton
          doc={data.userTaskDocuments[0].document}
          download={download}
        />
        <FormField title="Document name">
          <Box>{data.userTaskDocuments[0].document.name}</Box>
        </FormField>
        <FormField title="Document description">
          <Box>{data.userTaskDocuments[0].document.description}</Box>
        </FormField>
        <FormField title="Updated by">
          <Box>{data.userTaskDocuments[0].user.username}</Box>
          <Box>{fDateTime(new Date(data.userTaskDocuments[0].createdAt))}</Box>
        </FormField>
      </FormSection>
    </Stack>
  );
});