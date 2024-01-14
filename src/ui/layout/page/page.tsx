import { ReactElement, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { BreadCrumbs, TBreadCrumb } from '@ui/layout/page/breadCrumbs';
import Stack from '@mui/material/Stack';
import { Box, useTheme } from '@mui/material';

interface IProps {
  children?: ReactNode;
  breadCrumbs?: TBreadCrumb[];
  right?: ReactElement;
}

export const Page = observer((props: IProps) => {
  const { children, breadCrumbs, right } = props;
  const theme = useTheme();
  return (
    <Stack id="__page" spacing={2} height="100%" flexGrow={1}>
      {breadCrumbs && <BreadCrumbs breadCrumbs={breadCrumbs} />}
      <Box
        id="__page_wrapper"
        flexGrow={1}
        width="100%"
        display="grid"
        gridTemplateColumns={right ? '1fr 1fr' : '1fr'}
        gap={2}
      >
        {children}
        <Box position="sticky" top={theme.spacing(13)} height="fit-content">
          {right}
        </Box>
      </Box>
    </Stack>
  );
});
