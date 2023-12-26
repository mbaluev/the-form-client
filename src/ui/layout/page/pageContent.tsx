import { Fragment, ReactNode } from 'react';
import { Panel } from '@ui/layout/page/panel';
import { Box, Stack } from '@mui/material';

interface IProps {
  children?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  quick?: ReactNode;
  separator?: ReactNode;
}

export const PageContent = (props: IProps) => {
  const { children, title, subtitle, quick, separator } = props;
  return (
    <Panel className="__page_content" height="100%">
      <Stack spacing={3} height="100%">
        {(title || subtitle || quick) && (
          <Fragment>
            <Stack direction="row" spacing={2}>
              <Stack spacing={2} height="100%" padding={3} paddingBottom={0} flexGrow={1}>
                <Box>{title}</Box>
                <Box>{subtitle}</Box>
              </Stack>
              <Box padding={2} paddingBottom={0}>
                {quick}
              </Box>
            </Stack>
            {separator}
          </Fragment>
        )}
        <Box flexGrow={1}>{children}</Box>
      </Stack>
    </Panel>
  );
};
