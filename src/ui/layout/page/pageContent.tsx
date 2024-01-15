import { Fragment, ReactNode } from 'react';
import { Panel } from '@ui/layout/page/panel';
import { Box, BoxProps, Stack } from '@mui/material';

interface IProps {
  children?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  quick?: ReactNode;
  separator?: ReactNode;
  boxProps?: BoxProps;
}

export const PageContent = (props: IProps) => {
  const { children, title, subtitle, quick, separator, boxProps } = props;
  return (
    <Panel className="__page_content" height="100%" overflow="hidden" {...boxProps}>
      <Stack spacing={3} height="100%">
        {(title || subtitle || quick) && (
          <Fragment>
            <Stack direction="row" spacing={2}>
              <Stack spacing={2} height="100%" padding={3} paddingBottom={0} flexGrow={1}>
                {title && <Box>{title}</Box>}
                {subtitle && <Box>{subtitle}</Box>}
              </Stack>
              {quick && (
                <Box padding={2} paddingBottom={0}>
                  {quick}
                </Box>
              )}
            </Stack>
            {separator}
          </Fragment>
        )}
        <Stack flexGrow={1} overflow="hidden">
          {children}
        </Stack>
      </Stack>
    </Panel>
  );
};
