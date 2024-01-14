import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { FormField, FormSection } from '@components/form';
import { Box, Stack } from '@mui/material';
import ReactPlayer from 'react-player';
import { NoData } from '@components/noData';
import { DocumentButton } from '@ui/components/documentButton';
import { IMaterialAdminViewModel } from '@viewModel/modules/entities/material/admin/interface';

export const MaterialCardContent = observer(() => {
  const { data, download } = useViewModel<IMaterialAdminViewModel>(VIEW_MODEL.MaterialAdmin);

  if (!data) return <NoData />;

  return (
    <Stack height="100%" spacing="20px">
      <FormSection>
        <DocumentButton doc={data.material?.document} download={download} />
        <FormField title="Document description">
          <Box style={{ lineHeight: 1.9 }}>{data.material?.document?.description}</Box>
        </FormField>
      </FormSection>
      <Stack flex="1 1 auto" borderRadius="5px" overflow="hidden">
        <ReactPlayer
          url={data.material?.document?.url}
          width="auto"
          height="100%"
          config={{
            youtube: {
              playerVars: {
                controls: 1,
              },
            },
          }}
        />
      </Stack>
    </Stack>
  );
});
